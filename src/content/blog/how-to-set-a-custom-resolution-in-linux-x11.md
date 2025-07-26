---
title: How to Set a Custom Resolution in Linux (X11)
date_pub: 2024.08.31
---

> Note: This tutorial is for X11 **only**. If you're using Wayland the commands presented bellow might not work!

If you want to create a custom resolution that will appear in the display settings of your OS, you're going to need to use a few commands, but I'll guide you through everything so don't worry.

First, you need to run `xrandr` which will output the monitor name, and it's available resolutions.

```sh
user@os ~> xrandr
Screen 0: minimum 16 x 16, current 1920 x 1080, maximum 32767 x 32767
**HDMI-1** connected primary 1920x1080+0+0 (normal left inverted right x axis y axis) 530mm x 300mm
   1920x1080    143.88*+
   1440x1080    143.80
   1400x1050    143.89
   1280x1024    143.79
   1280x960     143.86
   1152x864     143.92
```

Your output will be slightly different from mine, depending on your device and how many monitors you have connected.
Take note of the device name for which you want to add a new resolution option. You'll need it later.

Now, run the `cvt` command using your desired resolution as arguments.
Let's say you want to add a 1980x1080 resolution.

```sh
user@os ~> cvt 1980 1080
# 1984x1080 59.92 Hz (CVT) hsync: 67.11 kHz; pclk: 178.25 MHz
Modeline **"1984x1080_60.00"  178.25  1984 2112 2320 2656  1080 1083 1093 1120 -hsync +vsync**
```

Copy everything after "Modeline", and add it as the input to the following command:

```sh
user@os ~> sudo xrandr --newmode **"1984x1080_60.00"  178.25  1984 2112 2320 2656  1080 1083 1093 1120 -hsync +vsync**
```

Your custom resolution is now created. But you still have to assign it to your desired monitor. Use the following command:

```sh
user@os ~> #sudo xrandr --addmode MONITOR_NAME RESOLUTION_NAME
user@os ~> sudo xrandr --addmode **HDMI-1** **"1984x1080_60.00"**
```

And that's it! Now you can go to your display settings, and you should be able to pick your custom resolution from the available options.
