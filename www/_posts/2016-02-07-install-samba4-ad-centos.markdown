---
layout: post
title:  "Samba AD Domain Controller"
date:   2016-02-07 10:46:12 -0500
categories: linuxadmin
---

## The Goal ##
Configure Samba Active Directory Domain Controller

## Background ##
There's a network that uses Windows 2008 as the Domain Controller (DC) and I want to migrate to Samba running on CentOS since Linux already handles the files and it'd be easier if they didn't have to be reshared through Windows.

## Get Samba ##
The first step is getting Samba. It's included in most recent distributions *but* most of those do not include the AD/DC portion of the program (you'll notice samba-tool is missing).

So you must get a version built to be a controller. 


## Build Samba ##
To chose to build Samba from its source. Here's what I used: [Source](https://www.samba.org/samba/ftp/samba-latest.tar.gz), [Guide](https://wiki.samba.org/index.php/Build_Samba_from_source), and [Dependancies](https://wiki.samba.org/index.php/Operating_system_requirements/Dependencies_-_Libraries_and_programs).

 * wget https://www.samba.org/samba/ftp/samba-latest.tar.gz
 * ./configure --sysconfdir=/etc/samba --sbindir=/sbin --mandir=/usr/share/man --bindir=/bin

## Configure Domain ## 

samba-tool domain provision

ln -sf /usr/local/samba/private/krb5.conf /etc/krb5.conf

## Testing ##
smbclient -L localhost -U%
smbclient //localhost/netlogon -UAdministrator -c 'ls'
[root@localhost ~]# smbclient -L localhost -U%
Domain=[LD] OS=[Windows 6.1] Server=[Samba 4.3.4]

	Sharename       Type      Comment
	---------       ----      -------
	netlogon        Disk      
	sysvol          Disk      
	IPC$            IPC       IPC Service (Samba 4.3.4)
Domain=[LD] OS=[Windows 6.1] Server=[Samba 4.3.4]

	Server               Comment
	---------            -------

	Workgroup            Master
	---------            -------
[root@localhost ~]# smbclient //localhost/netlogon -UAdministrator -c 'ls'
Enter Administrator's password: 
Domain=[LD] OS=[Windows 6.1] Server=[Samba 4.3.4]
  .                                   D        0  Sun Feb  7 11:33:47 2016
  ..                                  D        0  Sun Feb  7 11:33:59 2016

		7964672 blocks of size 1024. 6002572 blocks available
[root@localhost ~]# 



## Errors Encountered ##

ERROR(<class 'samba.provision.ProvisioningError'>): Provision failed - ProvisioningError: guess_names: 'realm =' was not specified in supplied /etc/samba/smb.conf.  Please remove the smb.conf file and let provision generate it
  File "/usr/local/samba/lib64/python2.7/site-packages/samba/netcmd/domain.py", line 442, in run
    nosync=ldap_backend_nosync, ldap_dryrun_mode=ldap_dryrun_mode)
  File "/usr/local/samba/lib64/python2.7/site-packages/samba/provision/__init__.py", line 2025, in provision
    sitename=sitename, rootdn=rootdn, domain_names_forced=(samdb_fill == FILL_DRS))
  File "/usr/local/samba/lib64/python2.7/site-packages/samba/provision/__init__.py", line 606, in guess_names
    raise ProvisioningError("guess_names: 'realm =' was not specified in supplied %s.  *Please remove the smb.conf file and let provision generate it*" % lp.configfile)

Needed  to remove /etc/samba/smb.conf


KINIT Stalled
I chose simples domains Domain 