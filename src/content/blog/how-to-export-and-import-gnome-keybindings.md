---
title: How to Export and Import Gnome Keybindings
date_pub: "2024.08.04"
---

Gnome stores literally all it's settings with dconf. 
Using dconf you can read (and set) the settings of every gnome app, from the calculator app to that random shell extension you downloaded of off github, all your keyboard shortcuts, everything is there.

Now, I'm not going to get into too much detail about how dconf works (partially because I don't really have any idea myself). What matters is that your keyboard shortcuts live there.

To print every dconf setting to stdout, use the following command:
```sh
dconf dump /
```

Now that you have an idea of how dconf stores it's data, here's the paths that could contain the keybinds that you want to save:
```sh
/org/gnome/settings-daemon/plugins/media-keys/
/org/gnome/shell/keybindings/
/org/gnome/desktop/wm/keybindings/
/org/gnome/mutter/keybindings/
/org/gnome/mutter/wayland/keybindings/
```

To export your keybindings from dconf, use the following command:
```sh
dconf dump /path/you/want/to/dump/ > filename.txt
```

Do this for all of the paths listed above. And don't forget to change the file name so you don't end up overwriting the same file.
Note that some of the paths may be empty, that's fine, it just means there's no keyboard shortcuts there, try the other paths.

To load the data back into dconf, just do the same process backwards:
```sh
dconf load /path/you/want/to/laod/ < filename.txt
```

As an example, here's how you would go about exporting every path that could contain your keybinds:
```sh
dconf dump /org/gnome/settings-daemon/plugins/media-keys/ > media-keys.txt
dconf dump /org/gnome/shell/keybindings/ > shell-keys.txt
dconf dump /org/gnome/desktop/wm/keybindings/ > wm-keys.txt
dconf dump /org/gnome/mutter/keybindings/ > mutter-keys.txt
dconf dump /org/gnome/mutter/wayland/keybindings/ > mutter-wayland-keys.txt
```

And to load them:
```sh
dconf load /org/gnome/settings-daemon/plugins/media-keys/ < media-keys.txt
dconf load /org/gnome/shell/keybindings/ < shell-keys.txt
dconf load /org/gnome/desktop/wm/keybindings/ < wm-keys.txt
dconf load /org/gnome/mutter/keybindings/ < mutter-keys.txt
dconf load /org/gnome/mutter/wayland/keybindings/ < mutter-wayland-keys.txt
```

You could also just export and import everything with the following commands:
```sh
dconf dump / > every-dconf-setting.txt
dconf load / < every-dconf-setting.txt
```
