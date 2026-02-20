import { 
    SecretsManagerClient, 
    GetSecretValueCommand, 
    PutSecretValueCommand, 
    UpdateSecretVersionStageCommand 
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({});

export const handler = async (event) => {
    const { Step, SecretId, ClientRequestToken } = event;

    // Validate the event parameters
    if (!Step || !SecretId || !ClientRequestToken) {
        throw new Error("Missing required parameters.");
    }

    console.log(`Starting ${Step} for secret: ${SecretId}`);

    // Switch between the 4 lifecycle steps
    switch (Step) {
        case "createSecret":
            await createSecret(SecretId, ClientRequestToken);
            break;
        case "setSecret":
            await setSecret(SecretId, ClientRequestToken);
            break;
        case "testSecret":
            await testSecret(SecretId, ClientRequestToken);
            break;
        case "finishSecret":
            await finishSecret(SecretId, ClientRequestToken);
            break;
        default:
            throw new Error(`Invalid Step: ${Step}`);
    }
};

// --- 1. Create Secret ---
async function createSecret(secretId, token) {
    // Check if this token already exists (idempotency check)
    try {
        await client.send(new GetSecretValueCommand({ SecretId: secretId, VersionId: token, VersionStage: "AWSPENDING" }));
        console.log("Secret version already exists. Doing nothing.");
        return;
    } catch (err) {
        if (err.name !== 'ResourceNotFoundException') throw err;
    }

    // MULTIPLE SECRETS LOGIC: Determine how to generate the new secret based on SecretId
    let newSecretString;
    if (secretId.includes("DatabaseSecret")) {
        newSecretString = JSON.stringify({ password: generateRandomPassword() });
    } else if (secretId.includes("ApiSecret")) {
        newSecretString = JSON.stringify({ apiKey: generateNewApiKey() });
    } else {
        throw new Error(`Unknown secret family: ${secretId}`);
    }

    // Save the new secret as AWSPENDING
    await client.send(new PutSecretValueCommand({
        SecretId: secretId,
        ClientRequestToken: token,
        SecretString: newSecretString,
        VersionStages: ["AWSPENDING"]
    }));
}

// --- 2. Set Secret ---
async function setSecret(secretId, token) {
    // Fetch the pending secret
    const pendingSecret = await client.send(new GetSecretValueCommand({ 
        SecretId: secretId, VersionId: token, VersionStage: "AWSPENDING" 
    }));

    const newCredentials = JSON.parse(pendingSecret.SecretString);

    // MULTIPLE SECRETS LOGIC: Update the external service
    if (secretId.includes("DatabaseSecret")) {
        // e.g., Connect to the DB and execute 'ALTER USER ... IDENTIFIED BY ...'
        await updateDatabasePassword(newCredentials.password);
    } else if (secretId.includes("ApiSecret")) {
        // e.g., Make a REST call to a third-party provider to update the API Key
        await updateThirdPartyApiKey(newCredentials.apiKey);
    }
}

// --- 3. Test Secret ---
async function testSecret(secretId, token) {
    const pendingSecret = await client.send(new GetSecretValueCommand({ 
        SecretId: secretId, VersionId: token, VersionStage: "AWSPENDING" 
    }));

    const newCredentials = JSON.parse(pendingSecret.SecretString);

    // MULTIPLE SECRETS LOGIC: Verify the new credentials actually work
    if (secretId.includes("DatabaseSecret")) {
        await testDatabaseConnection(newCredentials.password);
    } else if (secretId.includes("ApiSecret")) {
        await testApiAuthentication(newCredentials.apiKey);
    }
}

// --- 4. Finish Secret ---
async function finishSecret(secretId, token) {
    // Get the metadata to find what version is currently AWSCURRENT
    const metadata = await client.send(new GetSecretValueCommand({ 
        SecretId: secretId, VersionStage: "AWSCURRENT" 
    }));

    if (metadata.VersionId === token) {
        console.log("Version is already AWSCURRENT. Doing nothing.");
        return;
    }

    // Move AWSCURRENT label to the new token version
    await client.send(new UpdateSecretVersionStageCommand({
        SecretId: secretId,
        VersionStage: "AWSCURRENT",
        MoveToVersionId: token,
        RemoveFromVersionId: metadata.VersionId
    }));
}

// --- Mock Helpers ---
function generateRandomPassword() { return Math.random().toString(36).slice(-10); }
function generateNewApiKey() { return "key_" + Math.random().toString(36).slice(-15); }
async function updateDatabasePassword(pwd) { /* DB logic */ }
async function updateThirdPartyApiKey(key) { /* API logic */ }
async function testDatabaseConnection(pwd) { /* Test logic */ }
async function testApiAuthentication(key) { /* Test logic */ }