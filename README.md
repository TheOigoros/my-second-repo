# my-second-repo
This is my second repo on github on 5th,jan,2026
Using Git Locally
Pushing a Project from Local to Online Repository


This repo will demonstrate uploading files using Git commands from your computer.

Steps

Go to GitHub → click + → New repository.

Name it: git-upload-project.

Description: Example project showing file upload using Git commands.

Public → ✅

Do NOT initialize with README (we’ll do this locally).

Click Create repository.

Set Up Locally

On your computer, create a folder: git-upload-project.

Copy your index.html into this folder.

Open terminal in this folder and run:

git init
git remote add origin https://github.com/username/git-upload-project.git


Create a README.md locally:

echo "# Git Upload Project" >> README.md
echo "This project demonstrates uploading files using Git commands." >> README.md

Stage, commit, and push:

git add .  //all files in teh folder 
OR
git add README.md //just the readme
git commit -m "Initial commit with index.html and README"
git push -u origin main

✅ Done! Now your second repo shows how to upload using Git.


//
3️⃣ Optional: Rename Branch to Main

GitHub prefers main as the default branc
git branch -M main
//


# Git Upload Project

This project demonstrates **how to upload files to GitHub using Git commands**.

## Features
- Basic HTML page (`index.html`)
- File upload form example
- Shows initializing a Git repo, committing, and pushing

## Steps I Used
1. Created a local folder and added files
2. Ran `git init` to initialize
3. Added remote repo with `git remote add origin`
4. Added files (`git add .`)
5. Committed (`git commit -m "Initial commit"`)
6. Pushed to GitHub (`git push -u origin main`)
