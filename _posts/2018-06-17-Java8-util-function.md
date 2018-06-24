---
layout: post
title:  "Java8 filter实用功能"
categories: Java
tags:  Java
---

* content
{:toc}

Java8 Lambda,forEach,Stream




## Lambda

#### lambda的定义

Funda-men-tally, a lambda expression is just a shorter way of writing an implementation of a method for later execution.

个人理解：Lambda表达式仅仅是一种匿名内部类的简短写法。

#### lambda的语法结构

1. 一个括号内用逗号分隔的形式参数， 参数是函数式接口里面方法的参数

2. 一个箭头符号：->

3. 方法体（可以是表达式，代码块，接口实现的方法），如果是代码块，则需要用“{}”包裹起来。


方法的引用：“::”

方法引用是什么? 是lambda表达式的一个简化写法。
方法引用语法:左边是容器（ 可以是类名， 实例名） ， 中间是“ :: ”， 右边是相应的方法名。

一般方法的引用格式是：

- 静态方法： ClassName::methodName。 如 Object ::equals
- 成员方法：先new Object()，得到类的obj
Instance::methodName。 如Object obj=new Object();obj::equals;
- 构造函数：ClassName::new


## forEach

外部VS forEach 内部迭代

以前Java集合是不能够在内部进行迭代的， 而只提供了一种外部迭代的方式， 也就是for或者while循环。我们的forEach()可以进行集合的内部迭代

简单的使用案例：

```java
List<String> strs = Arrays.asList("android","ios","javaweb","ss");
System.out.println("-------for i使用jdk以前版本--------");
for (String str:strs) {
    System.out.println(str);
}
System.out.println("------forEach()使用新特性后--------");
strs.forEach(System.out::println);
```


## Stream

stream是什么？：可以理解为一个高级的迭代器（但有不同）
java.util.Stream 表示能应用在一组元素上一次执行的操作序列。

- Iterator：用户只能一个一个的遍历元素并对其执行某些操作

- Stream：用户只要给出需要对其包含的元素执行什么操作（可以进行过滤）

简单案例：过滤掉为null的对象

```java
List<Integer> nums = Arrays.asList(1,null,3,4,null,6);
nums.stream()//创建stream实例
.filter(num -> num != null)//使用条件进行过滤
.forEach(n->System.out.println(n));//遍历集合元素，并且打印出来
```

从上面的案例中可以看出：我们可以直接操作带有过滤条件的元素

1. 使用Stream的简单步骤：  
创建Stream；  
转换Stream， 每次转换原有Stream对象不改变， 返回一个新的Stream对象（ 可以有多次转换） ；
对Stream进行聚合（ Reduce） 操作， 获取想要的结果；

常见的Stream操作符：

```java
List<Integer> nums = Arrays.asList(1,1,null,2,3,4,null,5,6,7,8,9,10);
System.out.println("sum is:"+
        nums.stream()//获取其对应的Stream对象
        .filter(num -> num != null)//使用条件过滤 或 Objects::nonNull
        .distinct()//去重
        .mapToInt(num -> num * 2)//每个元素乘以2
        .peek(System.out::println)//每个元素被消费的时候打印自身
        .skip(2)//跳过前两个元素
        .limit(4)//返回前四个元素
        .sum());//加和运算
}
```

Stream使用的常见误区：

只有在聚合函数的地方执行循环，也就是无论中间执行多少个操作符，只会执行一次的循环，也就是说在执行聚合函数的时候才会执行循环  

聚合函数：一类统计函数的总称，例如：（sum average count collect）
获取常用统计值

```java
    private static void testStream () {
        // 获取数字的个数、 最小值、 最大值、 总和以及平均值
        List<Integer> list = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
        //IntSummaryStatistics:集合概要例如: count, min, max, sum, and average.
        IntSummaryStatistics stats = list//
                .stream()//获取Stream对象
                .mapToInt((x) -> x)//格式转换
                .summaryStatistics();//
        System.out.println("Max : " + stats.getMax());
        System.out.println("Min: " + stats.getMin());
        System.out.println("Sun: " + stats.getSum());
        System.out.println("Average : " + stats.getAverage());
    }
```

#### 例子2

- 对象A：  
```java
    public Class A{
        private Long id;

        private String userName;

         // 省略get和set方法  
    }
```

- 查找集合中的第一个对象  
```java
 Optional<A> firstA= list.stream().filter(a -> "hanmeimei".equals(a.getUserName())).findFirst();
 ```  
关于Optional，java API中给了解释。  
A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.  
所以，我们可以这样子使用  
```java
if (firstA.isPresent()) {
     A a = firstA.get();   //这样子就取到了这个对象呢。
} else {
   //没有查到的逻辑
}
```

- 返回集合  
```java
 List<A> firstA= list.stream().filter(a -> "hanmeimei".equals(a.getUserName())).collect(Collectors.toList());
 ```

- 抽取对象中所有的id的集合  
```java
List<Long> idList = list.stream().map(A::getId).collect(Collectors.toList());
```
