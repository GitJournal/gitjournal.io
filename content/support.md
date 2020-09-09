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

* [Notable](https://notable.app/)
* [Zettlr](zettlr.com)
* [Foam](https://foambubble.github.io/foam/)
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

## Pro Mode

Sustaining an Open Source Project can be challenging in the long term. The idea with GitJournal is to be a 100% Open Source Project - No Open Core model. Currently we are experimenting by having a subscription based Pro mode, which can be activated by paying the amount you feel appropriate.

No matter what you pay, all pro features will be accessible to you.

We didn't feel comfortable charging a standard 5-10$/month as that can be a significant amount in some countries. Depending on your country the lowest amount might be 1-2$ / month. If this amount is too high, please contact me, and I can accordingly lower it for that country.

Additionally, if you really like GitJournal, but cannot afford it, please [email me](mailto:vhanda@gitjournal.io). I'll be happy to give you Pro access for free. Money isn't the primary motivator for this project - It's more important that people have control over their data.

## What about Encryption?

GitJournal does not store any of your notes. They are stored by your Git Host such as GitHub or Gitlab. We do [plan](https://github.com/GitJournal/GitJournal/issues/182) to eventually offer encrypted Git Hosting, but for now the main focus is improving the mobile app experience.

## Can I use GitJournal with my own server?

Yes. GitJournal uses ssh, so any server accessible via ssh should be usable. If you're running your own server, perhaps you should think about [hardening it](https://www.sshaudit.com/hardening_guides.html).

Also if you're using a non standard ssh port you will need to type the full url. Eg - `ssh://user@host.com:PORT/path/to/repo/journal.git`
