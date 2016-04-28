---
layout: post
title:  "Initialize Current Directory as Git Repository"
date:   2016-01-22 11:43:18 -0500
categories: howto git
---

This is how to link the current directory to an existing github repository. A good time to use this would be if you started a project before creating the repo. Note: you must create a repository on [GitHub](https://github.com) before using it.


git init
git remote add origin master [link to repo]
git pull origin master
git add -A
git commit -m 'initial upload'
git push origin master


This Does the Following:
1) Creates a .git folder in the current directory with some git control files
2) Links this new .git configuration with the repo you made on the website
3) Copies the files already in the repo (usually a readme, license, etc)
4-6) Add your other files that were already in the directory before we started