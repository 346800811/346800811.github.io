---
layout: post
title:  "U盘安装 CentOS 7"
categories: Linux
tags:  Linux CentOS
---

* content
{:toc}

使用U盘安装CentOS 7




## 一、准备工作
1. U盘：8G以上  
2. 软件：`UltraISO` 虚拟光驱（试用版即可）  
3. 软件：`CentOS-7-x86_64-DVD-xxxx.iso`  

## 二、制作U盘启动盘
1. 安装 UltraISO  
2. 安装完成后点击 `试用`  
3. 点击`文件`，选择`打开`  
4. 找到Centos7包所在的文件夹，选择Centos7包，点击`打开`  
5. 插入准备好的U盘  
6. 点击顶部菜单中的 `启动`  选择 `写入硬盘映像`  
7. 硬盘驱动器选择你的U盘 ，写入方式 `usb-hdd+`  
8. 点击`写入`  

## 三、安装Centos7
1. 把U盘插到电脑上  
2. 设置开机U盘启动 （不同机器设置不一样，我的是按F2可选择U盘。）  
3. 选择U盘后跳转到如下界面  
```
                         CentOS 7

    Install CentOS 7
    Test this media & install CentOS 7

    Troubleshooting

      Press Tab for full configuration options on menu items.
```  
4. 按下键盘`Tab`键将最下面的  
```
vmlinuz initrd=initrd.img inst.stage2=hd:LABEL=CentOS\x207\x20x86_64 rd.live.check quiet
```  
改为  
```
vmlinuz initrd=initrd.img linux dd quiet
```  
5. 查看U盘启动盘的名称比如：`sda`，`sdb`，`sdc`  ps：label一列会显示Centos7等字样的  
6. `重启`后到第三步界面按下`Tab`键  
7. 将  
```
vmlinuz initrd=initrd.img inst.stage2=hd:LABEL=CentOS\x207\x20x86_64 rd.live.check quiet
```  
改为  
```
vmlinuz initrd=initrd.img inst.stage2=hd:/dev/sdb1 quiet
```  
ps：`sdb1`就是你看到的启动盘名称  
8. 之后等待安装到图形界面  

## 四、安装选项示例
1. 选择`中文` → `简体中文` → 点击`继续`  
2. 安装源：`本地介质`，软件选择：`GNOME桌面`，安装位置：`选择硬盘，自动分配`，网络和主机名：`打开（默认关闭的）`  
3. 设置完成点击`开始安装`  
4. 之后会有`用户设置`的界面，点进去设置root密码然后创建常用账号。密码过于简单点击确定会有提示，如果就想用这个密码可以再次点击确定  
5. 等待安装完成会让重启，点击重启按钮  
6. 重启后会有一个安全协议的操作，有些可以界面选择有些是命令行，界面不多说，命令行的话 输入：`1，回车`，`2，回车`，`c，回车`，`c，回车`  
7. 安装完成。  
