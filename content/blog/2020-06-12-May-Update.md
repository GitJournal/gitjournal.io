---
title: GitJournal May Update
date: 2020-06-12
---

GitJournal is a mobile first note taking application integrated with Git. It’s based on the idea that you should have control over your data, and that we all have multiple devices in our daily lives, and therefore need to be in control of the mechanism to synchronize our notes across these devices.

Git was chosen as the method to do so, as there are already many [commercial provides of Git](https://github.com/GitJournal/GitJournal/blob/master/docs/git_hosts.md), and setting up your own Git Server has a much lower barrier to entry than any other setup.

GitJournal is [open source](https://github.com/GitJournal/GitJournal) and available on both Android and iOS. Here are some screenshots to get your started -

![](https://cdn-images-1.medium.com/max/5120/1*zS57XsyO9XNgyZJIMjyYSg.jpeg)

---

Here are some of the big changes done in May -

# Tag Support

One of GitJournal’s goals is to be compatible with other Note Taking and Markdown Editing apps. As GitJournal is currently targeting a bit more technical users, each of them have their own preferences on how to edit notes on the desktop.

In an effort to be more compatible with [Notable](https://notable.md/), you can now assign tags to your notes.

![](https://cdn-images-1.medium.com/max/1434/1*UrcDEA8QIofrK8S3OUOi-A.jpeg)

![](https://cdn-images-1.medium.com/max/1434/1*HOb5u3rJuDAkr7OK4g1G5Q.jpeg)

Inline tags are something I’m still working on, if you think it’s important, please vote on [the issue](https://github.com/GitJournal/GitJournal/issues/44). GitHub issues are the primary mechanism for prioritizing tasks.

# Image Support

One of the top voted [issues](https://github.com/GitJournal/GitJournal/issues/10) was to allow images to be added to Notes. This was finally done this month.

Images are stored in same directory as the image or you can change it to store them in a specific folder.

{{< img src="https://cdn-images-1.medium.com/max/576/1*vxBLtHVgIvI6N31eBAQNEA.gif" >}}

# Number of Pending Changes

GitJournal makes a new commit after every change performed. These changes, by default, are pushed to the git remote automatically. However, one can make this setting to control when the changes are synchronized.

The synchronize button now shows a helpful number to indicate the number of changes.

{{< img src="https://cdn-images-1.medium.com/max/1440/1*8147f9DNEbiklrV3mLIA5A.jpeg" >}}

# Note Modification State

A small usability feature was added to clearly convey when a note has been modified -

{{< img src="https://cdn-images-1.medium.com/max/2160/1*7bEuacW1MWsybR7aGBk80A.gif" alt="Indicate via ✗ or ✓ when the Note has been modified" >}}

# Custom Repo during Setup Process

GitJournal can be used with any repo that supports SSH access. However, setting up a repo can be a bit cumbersome when you need to deal with SSH keys and enter the clone url.

Here is what the process for a custom repo -

{{< img src="https://cdn-images-1.medium.com/max/576/1*CJ3jTwAau1Mr9BA4BACDkQ.gif" alt="GitJournal works with any Git Repo over SSH" >}}

In order to make this process simpler, GitJournal integrates with GitHub and GitLab and lets us handle all of this seamlessly. This comes at a price, though, it requires giving GitJournal access to all your public and private repositories. Even though GitJournal doesn’t have any server side component and the OAuth token is only temporarily held by the app, it can make people uncomfortable. Which is why we offer, both an automatic mode and manual mode, where we guide you through the steps of adding the SSH keys.

{{< img src="https://cdn-images-1.medium.com/max/576/1*LaAw5PQd76xc9mnI4njpcw.gif" alt="GitJournal’s Quick Repo Setup" >}}

Earlier the setup would only automatically create a repo called **“journal”, **from now on you can choose any repo, or create a new one within the app.

# Txt Files Support

While GitJournal’s default format is Markdown, this month we added the ability to read and write any file that ends with a `.txt` . The disadvantage is that there is no place to store the note metadata with these files, as with markdown files it is stored in a YAML Header.

However, my plan for the coming weeks is to fetch the creation and modification date of the notes from the Git repository directly. This way there will always be a fallback, and we can even remove the YAML Header entirely without losing any features.

With `.txt` files, the raw editor becomes the default and the markdown editor is hidden -

![](https://cdn-images-1.medium.com/max/1440/1*gJQ3qRgS0nSG_NlMBR-Z_Q.jpeg)

![](https://cdn-images-1.medium.com/max/1440/1*wVAdNBn0VezDAqgvJn8hEA.jpeg)

# Debug Panel

I hope no one will ever need to use this feature, but bugs are inevitable, and since many of our users are developers, and like to know what’s going on — There is now a Debug section in the Settings.

![](https://cdn-images-1.medium.com/max/1440/1*uEW8snpCsYwMkXmu5ndXvA.jpeg)

![Debug Screen](https://cdn-images-1.medium.com/max/1440/1*5tkoY9VJDPgfuope0-bR1w.jpeg)

# BackLinks

GitJournal has always supported linking to other notes via the [classical markdown syntax](https://www.markdownguide.org/basic-syntax/#links). It’s an easy way to create a connect your notes together. Now, with each note when previewing the note, you’ll also see what other notes link to this note -

{{< img src="https://cdn-images-1.medium.com/max/1440/1*1nhRErlUzMMgT_NVBw-0sQ.jpeg" >}}

For the full list of new features, please read the [changelog](https://github.com/GitJournal/GitJournal/blob/master/CHANGELOG.md).

---

GitJournal is completely [Open Source](https://github.com/GitJournal/GitJournal) and is supported by its patrons by paying a monthly subscription for some “Pro Features”. I’ve implemented a pay-what-you-want model so people from all different income levels and countries can easily access the pro features. And in the case when even that is not possible, the entire code base — including Pro features — is completely open source and freely available.
