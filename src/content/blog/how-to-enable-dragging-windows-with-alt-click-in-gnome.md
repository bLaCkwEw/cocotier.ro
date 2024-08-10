---
title: How to Enable Dragging Windows with Alt Click in Gnome
date_pub: 2024.09.10
---

By default gnome seems to be using Meta+Click to drag windows. I personally dislike this combination.

To change the setting to Alt+Click for moving windows, use the following command:
```sh
gsettings set org.gnome.desktop.wm.preferences mouse-button-modifier '<Alt>'
```

If you'd like to be able to use Alt+Right Click to resize windows, use this command as well. 
```sh
gsettings set org.gnome.desktop.wm.preferences resize-with-right-button true
```
