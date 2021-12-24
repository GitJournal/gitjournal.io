---
title: Support
---

Please email me at [support@gitjournal.io](mailto:support@gitjournal.io) for any questions.

# FAQ

## General

### Why create another Note Taking App?

There are many Note taking apps on the desktop, but the mobile space is lacking good note taking apps which give you control over your data and operate with open protocols.

### What is Git and why should I care?

We all have many different devices. Our notes need to be accessible on all these devices. Synchronization is an essential feature of any note taking application. Most apps use DropBox or Google Drive. The problem is these synchronization mechanisms are not open and are controlled by single corporations.

The aim with GitJournal was to allow anyone to manage their notes across different devices without relying on a specific corporation. Git is a well tested protocol that has many advantages - there are many commercial providers of Git (GitHub / GitLab), most corporations already have their own git servers, and as an individual running your own Git server has a much lower barrier to entry than any other custom program.

You should get to decide who you trust with your data. GitJournal is just a way of accessing that data.

## Desktop App

GitJournal's [desktop app](https://github.com/GitJournal/GitJournal/issues/137) is still in its early stages. However, GitJournal is built with the idea of customizability. No one note taking app works for everyone, and GitJournal tries to be compatible with most desktop notes applications.

Here are some of our recommendations -

* [Foam](https://foambubble.github.io/foam/)
* [Zettlr](https://zettlr.com)
* [Notable](https://notable.app/) [Not Open Source]
* [Obsidian](https://obsidian.md/) [Not Open Source]

Each of these Note taking applications is built around simple markdown files, which can then be synced via Git.

## Auto syncing from the Desktop

With Git every change needs to be committed and pushed in order to sync. None of the desktop apps mentioned do this automatically, and therefore you need to know a bit about Git.

One alternative is to run a script to do this automatically -

```
#!/usr/bin/env bash

cd NOTES_FOLDER
gstatus=`git status --porcelain`

if [ ${#gstatus} -ne 0 ]
then
    git add --all
    git commit -m "$gstatus"

    git pull --rebase
    git push
else
    git pull
fi
```

Change `NOTES_FOLDER` to where your notes are present.

## What about Encryption?

GitJournal does not store any of your notes. They are stored by your Git Host such as GitHub or Gitlab. We do [plan](https://github.com/GitJournal/GitJournal/issues/182) to eventually offer encrypted Git Hosting, but for now the main focus is improving the mobile app experience.

## Can I use GitJournal with my own server?

Yes. GitJournal uses ssh, so any server accessible via ssh should be usable.

Also if you're using a non standard ssh port you will need to type the full url. Eg - `ssh://user@host.com:PORT/path/to/repo/journal.git`

## What Markdown Syntax does GitJournal support

GitJournal support GitHub Flavoured Markdown without the HTML. For more info please see [this.](https://www.markdownguide.org/tools/gitjournal/)
