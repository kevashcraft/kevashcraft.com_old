---
layout: post
cover: false
title: Compiling The Linux Kernel
date:   2015-11-23 17:42:00
categories: learning linux, weekend
navigation: True
---

I got a new [wifi usb stick](http://www.ebay.com/itm/USB-150Mbps-Mini-Wifi-Wireless-LAN-Internet-Adapter-802-11-n-g-b-Network-/331174326267?hash=item4d1b872ffb:g:79MAAOSwPgxVSiLa) (RTL8188ETV) and wanted to play around with it, but unfortunately when I ran airmon-ng to set the device into monitor mode I learned that the driver for this (r8188eu) didn't support such activity. So I tried to install the [dkms driver from the aur](https://aur.archlinux.org/packages/8188eu-dkms/), but that didn't work either. When I dug further it looks like there was a [patch](https://github.com/jsitnicki/linux/commit/d70efced56a04958a28d1133b201b7b62467ecd7) that's been acceoted into the new kernel (I'm currently running 4.2.5). So, I decided to compile the kernel. 

## Getting the Source
Where can you find the most recent Linux Kernel? [Kernel.org](https://www.kernel.org/) is the answer. Kinda. I was, at first, looking to use git and clone the stable branch. In the [Git Section](https://git.kernel.org/cgit/) I searched for stable and found the stable branch. After a couple of compilations I decided to try the [dev branch](https://github.com/torvalds/linux) which is a Torvolds Github repo.

## How to Compile
Next I needed instructions on what to do. The [Arch Wiki](https://wiki.archlinux.org/index.php/Kernels/Compilation/Traditional) gave me a great starting point. I followed it and ran
1. make mrproper
2. zcat /proc/config.gz > .config
3. make menuconfig (set new version number)
4. make
5. sudo make modules_install (failed!)

## Researching Errors
After trying to make modules_install I got the following:
depmod: ERROR: Found 2 modules in dependency cycles!
depmod: ERROR: Cycle detected: lnet -> libcfs -> lnet
Makefile:1139: recipe for target '_modinst_post' failed
make: *** [_modinst_post] Error 1
Which after [some researching](https://bbs.archlinux.org/viewtopic.php?id=205322) turns out to be an issue with LNET and can be fixed by disabled the LNET modules in .config. But soon after doing that I realized I should just be compiling the dev branch so that's what's making right now (trying it first without disabled LNET for science).

## An Update
It's an hour and a half later and I'm still waiting for make.