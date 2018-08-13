---
layout: post
title:  "Java main函数多种写法"
categories: Java
tags:  Java
---

* content
{:toc}

没有卵用，纯属娱乐。  




Java中的main入口方法一般的入门书上都说只有一种固定的写法，但实际上可以有以下几种变种的写法，没有什么实际用处。  

## 1. main方法的一般写法

```java
    public class TestMainMethod {
      public static void main(String[] args) {
        System.out.println("Hello,world!");
      }
    }
```

## 2. 可变参数的写法

```java
    public class TestMainMethod {
      public static void main(String... args) {
        System.out.println("Hello,world!");
      }
    }
```

## 3. unicode的写法

可使用命令行手动解释执行，在IDE中可能不支持

```
\u0070\u0075\u0062\u006c\u0069\u0063\u0020
\u0063\u006c\u0061\u0073\u0073\u0020
\u0054\u0065\u0073\u0074\u004d\u0061\u0069\u006e\u004d\u0065\u0074\u0068\u006f\u0064
\u0020\u007b\u000a\u0070\u0075\u0062\u006c\u0069\u0063\u0020
\u0073\u0074\u0061\u0074\u0069\u0063\u0020
\u0076\u006f\u0069\u0064\u0020
\u006d\u0061\u0069\u006e\u0028\u0053\u0074\u0072\u0069\u006e\u0067\u005b\u005d\u0020
\u0061\u0072\u0067\u0073\u0029\u0020
\u007b\u000a
\u0053\u0079\u0073\u0074\u0065\u006d\u002e
\u006f\u0075\u0074\u002e
\u0070\u0072\u0069\u006e\u0074\u006c\u006e\u0028\u0022\u0048\u0069\u0022\u0029\u003b
\u007d\u000a
\u007d\u000a
```

## 4. 其他修饰符

除了`static`、`void`、`public`，还可以使用`final`、`synchronized`、`strictfp`修饰符在main方法的签名中

```java
    public strictfp final synchronized static void main (String... args) {
        System.out.println("Hello,world!");
    }
```

