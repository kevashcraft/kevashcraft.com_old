---
layout: post
title:  "Resize Qcow2 NTFS Virtual Disk Drive"
date:   2016-01-23 11:40:00 -0500
categories: howto git
---

Today I had to resize a virtual disk drive that contained an ntfs partition. Additionally, the vdd was qcow2. Researching led to tutorials too long to be right. So here's the few steps I ended up following that worked quickly and easily.

cp image.qcow2 image.qcow2.bak
qemu-img resize image.qcow2 +40G
*"Load" Linux live iso into virtual cd drive (Xubuntu desktop worked great for me) and boot into Linux*
*Run gParted, select NTFS volume and choose resize*
When done restart into Windows (it'll run CHKDSK, let it).

This Does the Following:
1) Backups up the vdd incase you screw up
2) Resizes the image (not the partition)
3) Starts the world's best operating system
4) gParted easily resizes the ntfs partition
5) Windows checks its new disk (using methods much slower than fsck) then starts up with more storage space
6) [Email me](kevin@kevashcraft.com) because you should already be satisfied 