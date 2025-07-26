---
title: How to Change Git Name and Email across Git History
date_pub: 2024.09.07
---

This snippet is stolen from [here](https://stackoverflow.com/questions/750172/how-do-i-change-the-author-and-committer-name-email-for-multiple-commits#answer-750191).
I needed to change my email throughout git history some years ago and I saved the snippet in case I needed to do it again in the future.
Didn't end up needing to do it again yet, but I'm sharing the snippet with you. Maybe you need it.

Be careful! This snippet will change all the names and emails across the git history **for all commits**. If there's multiple people that have contributed to the repo, their data will be overwritten as well. In that case you might want to use something else.

Snippet:

```sh
git filter-branch -f --env-filter \
"GIT_AUTHOR_NAME='new_name'; GIT_AUTHOR_EMAIL='new_email'; \
GIT_COMMITTER_NAME='new_name'; GIT_COMMITTER_EMAIL='new_email';" HEAD
```
