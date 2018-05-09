---
layout: post
title:  "CentOS 6.5 静默安装Oracle11g"
categories: Oracle
tags:  Oracle
---

* content
{:toc}


CentOS 6.5 静默安装 Oracle11g 数据库




## 安装Oracle之前要完成的任务

1. 确保内存在2G以上

2. 把所有的Linux组件装全


## 安装Oracle之前的配置工作

1. 创建Oracle用户和组
```
[root]# /usr/sbin/groupadd oinstall
[root]# /usr/sbin/groupadd dba
[root]# /usr/sbin/useradd -g oinstall -G dba oracle
```  
检查是否创建成功：
```
[root]# id oracle
uid=501(oracle) gid=502(dba) 组=502(dba),501(oinstall)
```

2. 配置OS核心参数  
(1) 编辑 /etc/sysctl.conf
```
[root]# vi /etc/sysctl.conf
```  
把以下内容加在文件最后：
```
fs.aio-max-nr = 1048576
fs.file-max = 6815744
#kernel.shmall = 2097152
#kernel.shmmax = 536870912
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586
```  
(2) 使核心参数生效:  
```
[root]# /sbin/sysctl -p
```

3. 设置oracle用户的shell限制值  
(1) 编辑 /etc/security/limits.conf
```
[root]# vi /etc/security/limits.conf
```  
添加以下行到文件：   
```
oracle           soft    nproc   2047
oracle           hard    nproc   16384
oracle           soft    nofile  1024
oracle           hard    nofile  65536
```  
(2) 编辑 /etc/pam.d/login
```
[root]# vi /etc/pam.d/login
```  
添加以下行到文件：
```
session    required   /lib64/security/pam_limits.so  // 64位系统用这个
session    required   /lib/security/pam_limits.so
session    required   pam_limits.so
```  
(3) 编辑 /etc/profile  
```
[root]# vi /etc/profile
```  
添加以下行到文件：  
```
    if [ $USER = "oracle" ]; then
        if [ $SHELL = "/bin/ksh" ]; then
            ulimit -p 16384
            ulimit -n 65536
        else
            ulimit -u 16384 -n 65536
        fi
    fi

    umask 022
    export LC_ALL=zh_CN.gbk
    export LANG=zh_CN.gbk
    export ORACLE_BASE=/opt/ora
    export ORACLE_SID=orcl
    export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_1
    export ORACLE_OWNER=oracle
    export PATH=$PATH:$ORACLE_HOME/bin
    export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH
    export NLS_LANG=AMERICAN_AMERICA.ZHS16GBK
```

4. 创建目录  
```
    [root]# mkdir -p /opt/ora/
    [root]# chown -R oracle:oinstall /opt/ora/
    [root]# chmod -R 775 /opt/ora/

    [root]# mkdir /opt/oraInventory
    [root]# chown -R oracle:oinstall /opt/oraInventory
    [root]# chmod -R 775 /opt/oraInventory

    [root]# mkdir /opt/oradata
    。。。授权同上

    [root]# mkdir /opt/fast_recovery_area
    。。。授权同上
```  

5. 配置oracle用户环境  
```
[root]# su - oracle
[oracle]$ vi .bash_profile
```  
添加：  
```
    umask 022
    export ORACLE_BASE=/opt/ora
    export ORACLE_SID=orcl

    export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/db_1
    export SQLPATH=/home/oracle/labs
    export PATH=$ORACLE_HOME/bin:$PATH
```  
执行： ```[oracle]$ . ./.bash_profile ```  
在oracle用户下执行下面命令，之后可以重启Linux：  
```
    [oracle]$ unset ORACLE_HOME
    [oracle]$ unset TNS_ADMIN
    [oracle]$ ORACLE_BASE=/opt/ora
    [oracle]$ export ORACLE_BASE
    [oracle]$ ORACLE_SID=orcl
    [oracle]$ export ORACLE_SID
```  

6. 安装文件更改权限  
使用root用户授权  
```
[root]# chmod -R 775 /opt/database
```  

## 安装Oracle（静默）

1. 创建 /etc/oraInst.loc  
否则安装时会报错：  
```
SEVERE: [FATAL] [INS-32038] The operating system group specified for central inventory (oraInventory) ownership is invalid.
```  
创建文件并写入两行：  
```
[root]# vi /etc/oraInst.loc
inventory_loc=/home/oracle/app/oraInventory
inst_group=oinstall
```  

2. 编辑 database/response/db_install.rsp  
编辑文件，参数示例如下：  
```
    [oracle]$ cd /opt/database/response/
    [oracle]$ grep -Ev "^$|^#" db_install.rsp
    oracle.install.responseFileVersion=/oracle/install/rspfmt_dbinstall_response_schema_v11_2_0
    oracle.install.option=INSTALL_DB_AND_CONFIG
    ORACLE_HOSTNAME=oracledb
    UNIX_GROUP_NAME=oinstall
    INVENTORY_LOCATION=/opt/oraInventory
    SELECTED_LANGUAGES=en,zh_CN,zh_TW
    ORACLE_HOME=/opt/ora/product/11.2.0/db_1
    ORACLE_BASE=/opt/ora
    oracle.install.db.InstallEdition=EE
    oracle.install.db.isCustomInstall=true
    oracle.install.db.customComponents=oracle.server:11.2.0.1.0,oracle.sysman.ccr:10.2.7.0.0,oracle.xdk:11.2.0.1.0,oracle.rdbms.oci:11.2.0.1.0,oracle.network:11.2.0.1.0,oracle.network.listener:11.2.0.1.0,oracle.rdbms:11.2.0.1.0,oracle.options:11.2.0.1.0,oracle.rdbms.partitioning:11.2.0.1.0,oracle.oraolap:11.2.0.1.0,oracle.rdbms.dm:11.2.0.1.0,oracle.rdbms.dv:11.2.0.1.0,orcle.rdbms.lbac:11.2.0.1.0,oracle.rdbms.rat:11.2.0.1.0
    oracle.install.db.DBA_GROUP=dba
    oracle.install.db.OPER_GROUP=oinstall
    oracle.install.db.CLUSTER_NODES=
    oracle.install.db.config.starterdb.type=GENERAL_PURPOSE
    oracle.install.db.config.starterdb.globalDBName=orcl
    oracle.install.db.config.starterdb.SID=orcl
    oracle.install.db.config.starterdb.characterSet=AL32UTF8
    oracle.install.db.config.starterdb.memoryOption=true
    oracle.install.db.config.starterdb.memoryLimit=512
    oracle.install.db.config.starterdb.installExampleSchemas=false
    oracle.install.db.config.starterdb.enableSecuritySettings=true
    oracle.install.db.config.starterdb.password.ALL=gdtBD123
    oracle.install.db.config.starterdb.password.SYS=
    oracle.install.db.config.starterdb.password.SYSTEM=
    oracle.install.db.config.starterdb.password.SYSMAN=
    oracle.install.db.config.starterdb.password.DBSNMP=
    oracle.install.db.config.starterdb.control=DB_CONTROL
    oracle.install.db.config.starterdb.gridcontrol.gridControlServiceURL=
    oracle.install.db.config.starterdb.dbcontrol.enableEmailNotification=false
    oracle.install.db.config.starterdb.dbcontrol.emailAddress=
    oracle.install.db.config.starterdb.dbcontrol.SMTPServer=
    oracle.install.db.config.starterdb.automatedBackup.enable=false
    oracle.install.db.config.starterdb.automatedBackup.osuid=
    oracle.install.db.config.starterdb.automatedBackup.ospwd=
    oracle.install.db.config.starterdb.storageType=FILE_SYSTEM_STORAGE
    oracle.install.db.config.starterdb.fileSystemStorage.dataLocation=/opt/oradata
    oracle.install.db.config.starterdb.fileSystemStorage.recoveryLocation=/opt/fast_recovery_area
    oracle.install.db.config.asm.diskGroup=
    oracle.install.db.config.asm.ASMSNMPPassword=
    MYORACLESUPPORT_USERNAME=
    MYORACLESUPPORT_PASSWORD=
    SECURITY_UPDATES_VIA_MYORACLESUPPORT=
    DECLINE_SECURITY_UPDATES=true
    PROXY_HOST=
    PROXY_PORT=
    PROXY_USER=
    PROXY_PWD=
```  

3. 执行安装  
```
    [oracle]$ cd /opt/database
    [oracle]$ ./runInstaller -silent -ignorePrereq -ignoreSysPrereqs -responseFile /opt/database/response/db_install.rsp
```  
等待，若出现提示，则按照提示，使用新窗口root用户执行相应脚本：  

## 配置Oracle

1. 启动数据库  
安装完后数据库可能已经启动了，若未启动，执行下面命令：  
```
    [oracle]$ sqlplus / as sysdba
    SQL> startup
```  

2. 修改Oracle启动配置文件  
```
    [root]# vi /etc/oratab

    #
    orcl:/opt/ora/product/11.2.0/db_1:Y
```  
为了让oracle在系统启动时服务自动启动，修改/etc/rc/loacl文件：  
```
    [root]# vi /etc/rc.local

    #!/bin/sh
    #
    # This script will be executed *after* all the other init scripts.
    # You can put your own initialization stuff in here if you don't
    # want to do the full Sys V style init stuff.

    touch /var/lock/subsys/local
    su - oracle -c "/opt/ora/product/11.2.0/db_1/bin/dbstart"
```  
打开防火墙端口：  
```
[root]# vi /etc/sysconfig/iptables
```  
在22端口下面插入一行  
```
-A INPUT -p tcp -m state -state NEW -m tcp --dport 1521 -j ACCEPT
```


3. 创建表空间及用户
创建临时表空间 user_temp：
SQL> create temporary tablespace user_temp tempfile '/opt/oradata/orcl/user_temp.dbf' size 50m autoextend on next 50m maxsize 20480m extent management local;

创建数据表空间 ISC：
SQL> create tablespace ISC logging datafile '/opt/oradata/orcl/ISC.dbf' size 50m autoextend on next 50m maxsize 20480m extent management local;

创建用户并指定表空间 ISC：
SQL> create user ISC identified by isc default tablespace ISC temporary tablespace user_temp;

用户授权：
SQL> grant connect,resource,dba to ISC;


## 相关命令

1. 把某个用户改为 group(s)：  
```
usermod -G groups loginname
```  

2. 把用户添加进入某个组(s)：  
```
usermod -a -G groups loginname
```  

3. 查看是否打开23端口：  
```
netstat -an | grep 23
```  

4. 开放端口：  
(1) 开放端口命令： /sbin/iptables -I INPUT -p tcp --dport 1521 -j ACCEPT  
(2) 保存：/etc/rc.d/init.d/iptables save  
(3) 重启服务：/etc/init.d/iptables restart  
(4) 查看端口是否开放：/sbin/iptables -L -n  
转载者PS：如果你想一次性添加多个接口，可以将1重复执行多次，然后一次性执行2、3、4。  

5. 关闭防火墙和selinux  
Redhat使用了SELinux来增强安全，关闭的办法为：  
(1) 永久有效：  
修改 /etc/selinux/config 文件中的 SELINUX="" 为 disabled ，然后重启。  
(2) 即时生效：  
setenforce 0  

关闭防火墙的方法为：  
(1) 永久性生效：  
开启：chkconfig iptables on  
关闭：chkconfig iptables off  
(2) 即时生效，重启后失效  
开启：service iptables start  
关闭：service iptables stop  

补充：  
a. 防火墙还需要关闭ipv6的防火墙：  
chkconfig ip6tables off  
并且可以通过如下命令查看状态：  
chkconfig --list iptables  

6. 去掉DNS  
连接数据库过慢：  
可能的原因：每次连接数据库时，都需要进行DNS查询（根据IP查询主机名），但由于DNS服务器不可达（内网），所以只有等待超时，超时后才返回，导致连接库过慢。  
解决：注释掉server上 /etc/resolv.conf中所有行

## Oracle数据库常用命令  

1. oracle用户下执行：  
```
    $ sqlplus system/manager @ file.sql 执行sql脚本文件
    $ sqlplus system/manager 登录sqlplus，使用system用户
    $ sqlplus /nolog 以不连接数据库的方式启动sqlplus，启动数据时会用到
    $ lsnrctl status/stop/start oracle的监听器listener状态查看/停止/启动

    $ imp system/manager file=/tmp/expfile.dmp log=/tmp/implogfile.log ignore=y fromuser=expuser touser=impuser 用户模式表数据导入，这里我只使用了几个参数，还有好多没有用到的参数，如果没有特别指定值，就使用默认的值。

    $ exp username/password file=/tmp/expfile.dmp log=/tmp/proV114_exp.log 用户模式表数据导出，这是最简单的导出方法，还有好多参数没有写出来。
```

2. sqlplus下执行：  
```
    sqlplus system/manage as sysdba

    SQL> conn / as sysdba sysdba用户模式连接
    SQL> startup 启动数据库
    SQL> shutdown immediate 立即关闭数据库
    SQL> desc dba_users; 查询dba_users表结构
    SQL> select username from dba_users; 查询当前sid下的所有用户的username
    SQL> select count(*) from username.tablename; 查询tablename表的行数
    SQL> drop user username cascade; 删除名称为username的oracle用户
    SQL> select distinct table_name from user_tab_columns; 查看当前user模式下所有表名
```  
删除连接的用户：  
```
select username,sid,serial# from v$session;
alter system kill session'69,11660';
```  
上面例子中该用户的 SID 为 69，serial# 为 11660。  
