---
layout: post
title:  "Eclipse创建Maven Web项目"
categories: Maven
tags:  Eclipse Maven
---

* content
{:toc}

Eclipse 创建 Maven Web项目




1. 新建maven项目  
File -> New -> Maven Project

2. 进入maven项目之后,点击next  
选择最下面的webapp之后 next  
输入两个id  package可以不写,是它默认帮你新建一个包,不写没关系  
会生成一个这样目录的项目  
```
    Proj
    ├─.settings
    ├─src
    │  └─main
    │     ├─resources
    │     └─webapp
    │         ├─WEB-INF
    │         │  └─ web.xml
    │         └─ index.jsp
    ├─target
    │  ├─classes
    │  ├─m2e-wtp
    │  └─test-classes
    ├ .classpath
    ├ .project
    └ pom.xml
```  

3. 配置maven  
首先新建几个文件夹  
3.1 添加Source文件夹  
接下来需要添加  
src/main/java  
src/test/java  
src/test/resources三个文件夹  
右键项目根目录点击New -> Source Folder，  
建出这三个文件夹。注意不是建普通的Folder，而是Source Folder。  
项目或者文件加上右键 new  sourceFolder,正常情况下是没有问题的  
项目右键属性 -> Java Build Path -> Libraries  
JRE 改成jdk1.8  
<br>
3.2 更改class路径  
右键项目，Java Build Path -> Source  
下面应该有4个文件夹。src/main/java，src/main/resources，src/test/java。  
双击每个文件夹的Output folder，选择路径。  
src/main/java，src/main/resources，选择target/classes;  
src/test/java, 选择target/test-classes;  
选上Allow output folders for source folders.（如果没有选上的话）  
<br>
右键属性  project Facets  
想要切换成3.0发现报错  
这是因为新建项目的时候，用了maven-artchetype-webapp，由于这个catalog比较老，用的servlet还是2.3的  
<br>
修改 web.xml：
```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" version="3.0">
      <display-name>Archetype Created Web Application</display-name>
    </web-app>
```  
修改 org.eclipse.jdt.core.prefs 以下3行  
```
    org.eclipse.jdt.core.compiler.codegen.targetPlatform=1.7
    org.eclipse.jdt.core.compiler.compliance=1.7
    org.eclipse.jdt.core.compiler.source=1.7
```  
修改 org.eclipse.wst.common.project.facet.core.xml 以下2行  
```
    <installed facet="java" version="1.7"/>
    <installed facet="jst.web" version="3.0"/>
```  
重新打开属性 project Facets,看到这个地方已经修改成3.0; 右边 Runtimes中，勾选上tomcat。  
项目工程创建完成。  
<br>
new 一个server, 启动之后看看有无报错,目前没有。  
运行一下,测试没问题,至此maven web项目创建完成。
