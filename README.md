Since you can't install new plugins, **Generic Git SCM Polling** is the most "native" way to handle this. It relies on the built-in Git plugin that almost every Jenkins instance has by default.

### Step 1: Prepare your Jenkins User API Token

To allow Bitbucket to "poke" Jenkins without being blocked by security (CSRF), you need an API Token.

1. Log into Jenkins.
2. Click on your **Username** in the top-right corner.
3. Click **Configure** on the left sidebar.
4. Find the **API Token** section.
5. Click **Add new Token** > Generate.
6. **Copy this token immediately.** You will not be able to see it again.

### Step 2: Configure the Jenkins Job
You need to tell the job to "listen" for a notification rather than checking on a timer.
1. Go to your Jenkins Job and click **Configure**.
2. Scroll down to the **Source Code Management** section.
3. Ensure **Git** is selected.
4. **Copy the Repository URL** exactly as it appears here (e.g., `https://bitbucket.org/workspace/repo.git`). You will need this for the webhook.
5. Scroll down to **Build Triggers**.
6. Check the box for **Poll SCM**.
7. **IMPORTANT:** Leave the **Schedule** text box **completely empty**.
* *By leaving it empty, you disable periodic polling but keep the "listener" active for webhooks.*

### Step 3: Configure the Bitbucket Webhook
Now you must tell Bitbucket where to send the "Push" signal.
1. Go to your repository in **Bitbucket**.
2. Go to **Repository Settings** > **Webhooks**.
3. Click **Add webhook**.
4. **Title:** "Jenkins Trigger"
5. **URL:** Use the following format carefully:
`http://<USER_ID>:<API_TOKEN>@<JENKINS_URL>/git/notifyCommit?url=<REPO_URL>`
* **USER_ID:** Your Jenkins username.
* **API_TOKEN:** The token you copied in Step 1.
* **JENKINS_URL:** Your Jenkins base URL (e.g., `jenkins.company.com`).
* **REPO_URL:** The **exact** URL you copied from Step 2, point 4.

6. **Triggers:** Keep "Repository push" selected.
7. Click **Save**.

### Step 4: Verification (The "Why is it 200 OK but no build?" check)
If you see a **200 OK** in Bitbucket but no build starts, it usually means the `url=` parameter in the webhook does not **perfectly match** the "Repository URL" in the Jenkins job.
**Common Mismatches:**
* One has `.git` at the end, the other doesn't.
* One uses `https://`, the other uses `git@`.
* One has a trailing slash `/`, the other doesn't.

> [!TIP]
> **To verify manually:** Open a browser or use `curl` to visit your webhook URL directly. If Jenkins responds with something like *"Scheduled polling for [Job Name]"*, you know it's working. If it says *"No scheduled jobs found"*, your URLs don't match.

### Step 5: Check the Polling Log

If a push happens and nothing starts:

1. Go to your Jenkins Job.
2. On the left sidebar, click **Git Polling Log**.
3. It will show you exactly why it didn't start (e.g., "Done. No changes" or "URL did not match any jobs").

---

#### Webhook Url 
```
http://<USERNAME>:<API_TOKEN>@<JENKINS_IP_OR_DOMAIN>/git/notifyCommit?url=<REPO_URL>
```
USERNAME: Your actual Jenkins login name.
API_TOKEN: Not your password. It must be the token from User > Configure > API Token.
REPO_URL: The URL from Step 1 above.
