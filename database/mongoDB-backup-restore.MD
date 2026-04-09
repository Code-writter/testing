Using the connection string (URI) makes the commands much cleaner! It bundles the host, port, authentication, and target database into a single string. 

Here are the updated commands using the `--uri` flag for both dumping and restoring.

### ⚠️ A Quick Security Warning for Connection Strings
Because connection strings usually contain your password in plain text (e.g., `mongodb://user:password@host...`), running these commands will save your production password in your Linux bash history. 

**Pro-tip to prevent this:** If your EC2 instance is configured with `HISTCONTROL=ignorespace` (which most are by default), simply **type a space** before the command. The terminal will run it but won't save it to your history file.

---

### Step 1: Dump using the Connection String

Add a space before `mongodump` and wrap your connection string in quotes to prevent bash from misinterpreting special characters (like `&` or `?`).

```bash
 mongodump --uri="mongodb://<admin_user>:<password>@<prod-ec2-ip>:27017/<prod_db_name>?authSource=admin" \
           --gzip \
           --out /path/to/safe/backup/directory
```

**Key detail here:** Make sure your connection string points specifically to the `<prod_db_name>` you want to dump so you don't accidentally pull down the entire server.

---

### Step 2: Restore to a New Database using the Connection String

For the restore, your connection string should point to the **cluster level** (omit the specific database name in the URI). We will rely on `--nsFrom` and `--nsTo` to handle the routing into the new revamp database.

```bash
 mongorestore --uri="mongodb://<admin_user>:<password>@<target-ec2-ip>:27017/?authSource=admin" \
              --nsFrom="<prod_db_name>.*" \
              --nsTo="<new_revamp_db_name>.*" \
              --gzip \
              /path/to/safe/backup/directory/<prod_db_name>
```

**How this works:**
* The `--uri` connects you to the target EC2 database server as the admin.
* The `--nsFrom` grabs the documents from your dumped BSON files (which are tagged with the old prod name).
* The `--nsTo` intercepts those documents and cleanly writes them into `<new_revamp_db_name>`. If the new database doesn't exist yet, MongoDB will create it automatically during the restore.
