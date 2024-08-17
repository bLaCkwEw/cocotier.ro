---
title: How to Add Window Buttons Back in Gnome
date_pub: 2024.08.17
---

I  recently installed NixOS on a laptop and discovered that by default, Gnome now ships without the minimize and maximize window buttons. I was used to them so I looked for a way of getting them back.

To add them back you can simply run the following command:
```sh
gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"
```

Note that you can change the order of the buttons by changing the order of the words. So if you want your windows to have the following button order `:maximize,minimize,close`, you can also do that.

The `:` is for button direction, if you want them on the right side of the window, you need to put the `:` to the left (like in the example above). If you want the buttons to be on the left side of the window, add the `:` to the right, like so `minimize,maximize,close:`.
