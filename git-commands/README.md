
### Method 2: The "Keep the History" Approach

Use this method if you want to retain all the past commits, authors, and timestamps that were made on that specific branch in the first repository.

1. **Clone the specific branch** from your first repository:
```bash
git clone -b <branch-name> <url-of-repo-1> my-new-project

```


2. **Navigate into the folder**:
```bash
cd my-new-project

```


3. **Remove the connection to the first repository**:
```bash
git remote remove origin

```


4. **Add the connection to your second (empty) repository**:
```bash
git remote add origin <url-of-repo-2>

```


5. **Push the branch and its history to the new repository**:
```bash
git push -u origin <branch-name>

```


> **Pro Tip:** If you want this branch to become the `main` branch in your new repository rather than keeping its old name, use this command instead: `git push -u origin <branch-name>:main`



---

Would you like me to walk you through how to set up branch permissions or access controls for this new independent environment in Bitbucket?


## Check the remote origin 

```bash
git remote -v
```

## Branch Info

```bash
git remote show origin
```