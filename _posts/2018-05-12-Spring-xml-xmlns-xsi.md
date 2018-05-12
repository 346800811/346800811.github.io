---
layout: post
title:  "Spring xml头文件xmlns和xsi的意思"
categories: Oracle
tags:  Oracle
---

* content
{:toc}


Spring xml头文件xmlns和xsi的意思




在spring的配置中，总能看见如下的代码：  
```xml
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:mvc="http://www.springframework.org/schema/mvc"
           xmlns:context="http://www.springframework.org/schema/context"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                http://www.springframework.org/schema/context
                http://www.springframework.org/schema/context/spring-context-3.0.xsd
                http://www.springframework.org/schema/mvc
                http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd"
                default-autowire="byName">
```  

1. beans ——xml文件的根节点  

2. xmlns ——是XML NameSpace的缩写，因为XML文件的标签名称都是自定义的，自己写的和其他人定义的标签很有可能会重复命名，
而功能却不一样，所以需要加上一个namespace来区分这个xml文件和其他的xml文件，类似于java中的package。  

3. xmlns:xsi ——是指xml文件遵守xml规范，xsi全名：xml schema instance，是指具体用到的schema资源文件里定义的元素所准守的规范。即http://www.w3.org/2001/XMLSchema-instance这个文件里定义的元素遵守什么标准  
```
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
```  
这个是每个配置文件必须的部分，也就是spring的根本。  

4. xsi:schemaLocation ——是指本文档里的xml元素所遵守的规范，这些规范都是由官方制定的，可以进你写的网址里面看版本的变动。xsd的网址还可以帮助你判断使用的代码是否合法。  
所以如下代码：
```xml
    <!-- 启用spring mvc 注解 -->
        <context:annotation-config/>

        <!--自动扫描-->
        <context:component-scan base-package="com.icekredit.credit.controller"/>
        <context:component-scan base-package="com.icekredit.credit.service.impl"/>

        <!--自动配置注解映射器和适配器-->
        <mvc:annotation-driven />
        <mvc:default-servlet-handler />
        <mvc:resources location="/static/" mapping="/static/**" />
```  
代码里面用到了< mvc >的标签就要先引入  
```
xmlns:mvc="http://www.springframework.org/schema/mvc"
```  
然后需要遵守的代码规范有：  
```
    http://www.springframework.org/schema/mvc
    http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
```

