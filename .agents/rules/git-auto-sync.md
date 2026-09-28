# Git Auto-Sync Workflow

Every time you modify, add, or update any files in this repository, you MUST automatically stage, commit, and push the changes to GitHub so that GitHub Pages immediately updates:

```powershell
& "C:\Users\krishna.gupta\AppData\Local\Programs\Git\cmd\git.exe" add .
& "C:\Users\krishna.gupta\AppData\Local\Programs\Git\cmd\git.exe" commit -m "<brief description of the changes>"
& "C:\Users\krishna.gupta\AppData\Local\Programs\Git\cmd\git.exe" push
```

Always execute this command sequence after completing code modifications.
