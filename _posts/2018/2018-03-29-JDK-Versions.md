---
layout: post
title:  "Java 各版本新增的主要特性"
categories: Java
tags:  Java
---

* content
{:toc}


Java 各版本新增的主要特性




## Java成立到现在的版本

    1990年初，最初被命名为Oak；
    1995年5月23日，Java语言诞生；
    1996年1月，第一个JDK-JDK1.0诞生；
    1996年4月，10个最主要的操作系统供应商申明将在其产品中嵌入Java技术；
    1996年9月，约8.3万个网页应用了Java技术来制作；
    1997年2月18日，JDK1.1发布；
    1997年4月2日，JavaOne会议召开，参与者逾一万人，创当时全球同类会议纪录；
    1997年9月，JavaDeveloperConnection社区成员超过十万；
    1998年2月，JDK1.1被下载超过2,000,000次；
    1998年12月8日，Java 2企业平台J2EE发布；
    1999年6月，SUN公司发布Java三个版本：标准版（J2SE）、企业版（J2EE）和微型版（J2ME）；
    2000年5月8日，JDK1.3发布；
    2000年5月29日，JDK1.4发布；
    2001年6月5日，Nokia宣布到2003年将出售1亿部支持Java的手机；
    2001年9月24日，J2EE1.3发布；
    2002年2月26日，J2SE1.4发布，此后Java的计算能力有了大幅提升；
    2004年9月30日，J2SE1.5发布，成为Java语言发展史上的又一里程碑。为了表示该版本的重要性，J2SE1.5更名为Java SE 5.0；
    2005年6月，JavaOne大会召开，SUN公司公开Java SE 6。此时，Java的各种版本已经更名，以取消其中的数字“2”：J2EE更名为Java EE，J2SE更名为Java SE，J2ME更名为Java ME；
    2006年12月，SUN公司发布JRE6.0；
    2009年4月20日，甲骨文以74亿美元的价格收购SUN公司，取得java的版权，业界传闻说这对Java程序员是个坏消息（其实恰恰相反）；
    2010年11月，由于甲骨文对Java社区的不友善，因此Apache扬言将退出JCP；
    2011年7月28日，甲骨文发布Java SE 7；
    2014年3月18日，甲骨文发表Java SE 8；
    2017年7月，甲骨文发表Java SE 9；
    2018年3月，发布Java 10。

## JDK1.5新特性：

1. 自动装箱与拆箱：

2. 枚举

3. 静态导入，如：import staticjava.lang.System.out

4. 可变参数（Varargs）

5. 内省（Introspector），主要用于操作JavaBean中的属性，通过getXxx/setXxx。一般的做法是通过类Introspector来获取某个对象的BeanInfo信息，然后通过BeanInfo来获取属性的描述器（PropertyDescriptor），通过这个属性描述器就可以获取某个属性对应的getter/setter方法，然后我们就可以通过反射机制来调用这些方法。

6. 泛型(Generic)（包括通配类型/边界类型等）

7. For-Each循环

8. 注解

9. 协变返回类型：实际返回类型可以是要求的返回类型的一个子类型


## JDK1.6新特性：

1. AWT新增加了两个类:Desktop和SystemTray，其中前者用来通过系统默认程序来执行一个操作，如使用默认浏览器浏览指定的URL,用默认邮件客户端给指定的邮箱发邮件,用默认应用程序打开或编辑文件(比如,用记事本打开以txt为后缀名的文件),用系统默认的打印机打印文档等。后者可以用来在系统托盘区创建一个托盘程序

2. 使用JAXB2来实现对象与XML之间的映射，可以将一个Java对象转变成为XML格式，反之亦然

3. StAX，一种利用拉模式解析(pull-parsing)XML文档的API。类似于SAX，也基于事件驱动模型。之所以将StAX加入到JAXP家族，是因为JDK6中的JAXB2和JAX-WS 2.0中都会用StAX。

4. 使用Compiler API，动态编译Java源文件，如JSP编译引擎就是动态的，所以修改后无需重启服务器。

5. 轻量级Http Server API，据此可以构建自己的嵌入式HttpServer,它支持Http和Https协议。

6. 插入式注解处理API(PluggableAnnotation Processing API)

7. 提供了Console类用以开发控制台程序，位于java.io包中。据此可方便与Windows下的cmd或Linux下的Terminal等交互。

8. 对脚本语言的支持如: ruby,groovy, javascript

9. Common Annotations，原是J2EE 5.0规范的一部分，现在把它的一部分放到了J2SE 6.0中

10. 嵌入式数据库 Derby


## JDK1.7 新特性

1. 对Java集合（Collections）的增强支持，可直接采用[]、{}的形式存入对象，采用[]的形式按照索引、键值来获取集合中的对象。如：
```java
List<String> list = ["item1","item2"]; //存
String item = list[0]; //直接取
Set<String> set = {"item1","item2","item3"}; //存
Map<String,Integer> map = {"key1":1,"key2":2}; //存
int value = map["key1"]; //取
```

2. 在Switch中可用String

3. 数值可加下划线用作分隔符（编译时自动被忽略）

4. 支持二进制数字，如：int binary= 0b1001_1001;

5. 简化了可变参数方法的调用

6. 调用泛型类的构造方法时，可以省去泛型参数，编译器会自动判断。

7. Boolean类型反转，空指针安全,参与位运算

8. char类型的equals方法: booleanCharacter.equalsIgnoreCase(char ch1, char ch2)

9. 安全的加减乘除: Math.safeToInt(longv); Math.safeNegate(int v); Math.safeSubtract(long v1, int v2);Math.safeMultiply(int v1, int v2)……

10. Map集合支持并发请求，注HashTable是线程安全的，Map是非线程安全的。但此处更新使得其也支持并发。另外，Map对象可这样定义：Map map = {name:"xxx",age:18};


## JDK1.8新特性

1. 接口的默认方法：即接口中可以声明一个非抽象的方法做为默认的实现，但只能声明一个，且在方法的返回类型前要加上“default”关键字。

2. Lambda 表达式：是对匿名比较器的简化，如：
```java
Collections.sort(names,(String a, String b) -> {
    return b.compareTo(a);
});
```
对于函数体只有一行代码的，你可以去掉大括号{}以及return关键字。如：
```java
Collections.sort(names,(String a, String b) -> b.compareTo(a));
```
或：
```java
Collections.sort(names, (a, b) -> b.compareTo(a));
```

3. 函数式接口：是指仅仅只包含一个抽象方法的接口，要加@FunctionalInterface注解

4. 使用 :: 关键字来传递方法或者构造函数引用

5. 多重注解

6. 还增加了很多与函数式接口类似的接口以及与Map相关的API等……


## JDK1.9新特性

1. Java 平台级模块系统  
当启动一个模块化应用时， JVM 会验证是否所有的模块都能使用，这基于 `requires` 语句——比脆弱的类路径迈进了一大步。模块允许你更好地强制结构化封装你的应用并明确依赖。

2. Linking  
当你使用具有显式依赖关系的模块和模块化的 JDK 时，新的可能性出现了。你的应用程序模块现在将声明其对其他应用程序模块的依赖以及对其所使用的 JDK 模块的依赖。为什么不使用这些信息创建一个最小的运行时环境，其中只包含运行应用程序所需的那些模块呢？ 这可以通过 Java 9 中的新的 jlink 工具实现。你可以创建针对应用程序进行优化的最小运行时映像而不需要使用完全加载 JDK 安装版本。

3. JShell : 交互式 Java REPL  
许多语言已经具有交互式编程环境，Java 现在加入了这个俱乐部。您可以从控制台启动 jshell ，并直接启动输入和执行 Java 代码。 jshell 的即时反馈使它成为探索 API 和尝试语言特性的好工具。

4. 改进的 Javadoc  
Javadoc 现在支持在 API 文档中的进行搜索。另外，Javadoc 的输出现在符合兼容 HTML5 标准。此外，你会注意到，每个 Javadoc 页面都包含有关 JDK 模块类或接口来源的信息。

5. 集合工厂方法  
通常，您希望在代码中创建一个集合（例如，List 或 Set ），并直接用一些元素填充它。 实例化集合，几个 “add” 调用，使得代码重复。 Java 9，添加了几种集合工厂方法：
```java
Set<Integer> ints = Set.of(1,2,3);
List<String> strings = List.of("first","second");
```
除了更短和更好阅读之外，这些方法也可以避免您选择特定的集合实现。 事实上，从工厂方法返回已放入数个元素的集合实现是高度优化的。这是可能的，因为它们是不可变的：在创建后，继续添加元素到这些集合会导致 “UnsupportedOperationException” 。

6. 改进的 Stream API  
长期以来，Stream API 都是 Java 标准库最好的改进之一。通过这套 API 可以在集合上建立用于转换的申明管道。在 Java 9 中它会变得更好。Stream 接口中添加了 4 个新的方法：dropWhile, takeWhile, ofNullable。还有个 iterate 方法的新重载方法，可以让你提供一个 Predicate (判断条件)来指定什么时候结束迭代：
```java
IntStream.iterate(1,
 i -> i < 100,
 i -> i + 1).forEach(System.out::println);
```
第二个参数是一个 Lambda，它会在当前 IntStream 中的元素到达 100 的时候返回 true。因此这个简单的示例是向控制台打印 1 到 99。  
除了对 Stream 本身的扩展，Optional 和 Stream 之间的结合也得到了改进。现在可以通过 Optional 的新方法 `stram` 将一个 Optional 对象转换为一个(可能是空的) Stream 对象：
```java
Stream<Integer> s = Optional.of(1).stream();
```
在组合复杂的 Stream 管道时，将 Optional 转换为 Stream 非常有用。

7. 私有接口方法  
使用 Java 9，您可以向接口添加私有辅助方法来解决此问题：
```java
public interface MyInterface {
    void normalInterfaceMethod();
    default void interfaceMethodWithDefault() {
        init();
    }
    default void anotherDefaultMethod() {
        init();
    }
    // This method is not part of the public API exposed by MyInterface
    private void init() {
        System.out.println("Initializing");
    }
}
```
如果您使用默认方法开发 API ，那么私有接口方法可能有助于构建其实现。

8. HTTP/2  
Java 9 中有新的方式来处理 HTTP 调用。这个迟到的特性用于代替老旧的 `HttpURLConnection` API，并提供对 WebSocket 和 HTTP/2 的支持。注意：新的 HttpClient API 在 Java 9 中以所谓的孵化器模块交付。也就是说，这套 API 不能保证 100% 完成。不过你可以在 Java 9 中开始使用这套 API：
```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder(URI.create("http://www.google.com"))
    .header("User-Agent", "Java").GET().build();
HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandler.asString());
HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandler.asString());
```
除了这个简单的请求/响应模型之外，HttpClient 还提供了新的 API 来处理 HTTP/2 的特性，比如流和服务端推送。

9. 多版本兼容 JAR  
我们最后要来着重介绍的这个特性对于库的维护者而言是个特别好的消息。当一个新版本的 Java 出现的时候，你的库用户要花费数年时间才会切换到这个新的版本。这就意味着库得去向后兼容你想要支持的最老的 Java 版本 (许多情况下就是 Java 6 或者 7)。这实际上意味着未来的很长一段时间，你都不能在库中运用 Java 9 所提供的新特性。幸运的是，多版本兼容 JAR 功能能让你创建仅在特定版本的 Java 环境中运行库程序时选择使用的 class 版本：
```
multirelease.jar
  ├── META-INF
    └── versions
      └── 9
        └── multirelease
          └── Helper.class
            ├── multirelease
            ├── Helper.class
            └──  Main.class
```
在上述场景中， multirelease.jar 可以在 Java 9 中使用, 不过 Helper 这个类使用的不是顶层的 multirelease.Helper 这个 class, 而是处在“META-INF/versions/9”下面的这个。这是特别为 Java 9 准备的 class 版本，可以运用 Java 9 所提供的特性和库。同时，在早期的 Java 诸版本中使用这个 JAR 也是能运行的，因为较老版本的 Java 只会看到顶层的这个 Helper 类。


## JDK 10 新特性

JDK10 包含 12 个JEP (改善提议）：

【286】局部变量类型推断 ：对于开发者来说，这是 JDK10 唯一的真正特性。它向 Java 中引入在其他语言中很常见的  var   ，比如 JavaScript 。只要编译器可以推断此种类型，你不再需要专门声明一个局部变量的类型。一个简单的例子是：
```Java
var x = new ArrayList<String>();
```
这就消除了我们之前必须执行的 ArrayList<String> 类型定义的重复。我鼓励你们去读 JEP ，因为上面有一些关于这个句法是否能用的规则。  
有趣的是，需要注意 var 不能成为一个关键字，而是一个保留字。这意味着你仍然可以使用 var 作为一个变量，方法或包名，但是现在（尽管我确定你绝不会）你不能再有一个类被调用。  

[310]应用类数据共享(CDS) ：CDS 在 JDK5 时被引进以改善 JVM 启动的表现，同时减少当多个虚拟机在同一个物理或虚拟的机器上运行时的资源占用。  
JDK10 将扩展 CDS 到允许内部系统的类加载器、内部平台的类加载器和自定义类加载器来加载获得的类。之前，CDS 的使用仅仅限制在了 bootstrap 的类加载器。

[314]额外的 Unicode 语言标签扩展：这将改善 java.util.Locale 类和相关的 API 以实现额外 BCP 47 语言标签的 Unicode 扩展。尤其是，货币类型，一周的第一天，区域覆盖和时区等标签现在将被支持。

[322]基于时间的版本控制：正如我在之前的博客中所讨论的，我们的 JDK 版本字符串格式几乎与 JDK 版本一样多。有幸的是，这是最后需要使用到的，我们可以坚持用它。这种格式使用起来很像 JDK9 中介绍的提供一个更加语义的形式。有一件困扰我的事是包含了一个 INTERIM 元素，正如 JEP 提议中所说，“永远是0”。好吧，如果永远是0，那它有什么意义呢？他们说这是为未来使用做保留，但我仍不是很赞同。我认为，这有些冗余繁杂。  
这也消除了在 JDK9 中有过的相当奇怪的情形。第一次更新是 JDK 9.0.1 , 非常符合逻辑。第二次更新是 JDK 9.0.4 ，不合逻辑。原因是，在 JDK9 的版本计数模式下，需要留下空白以便应急或不在预期安排的更新使用。但既然没有更新是必须的，为什么不简单称之为 JDK 9.0.2 呢？

[319]根证书：在 JDK 中将提供一套默认的 CA 根证书。关键的安全部件，如 TLS ，在 OpenJDK 构建中将默认有效。这是 Oracle 正在努力确保 OpenJDK 二进制和 Oracle JDK 二进制功能上一样的工作的一部分，是一项有用的补充内容。

[307] 并行全垃圾回收器 G1 : G1 是设计来作为一种低延时的垃圾回收器（但是如果它跟不上旧的堆碎片产生的提升速率的话，将仍然采用完整压缩集合）。在 JDK9 之前，默认的收集器是并行，吞吐，收集器。为了减少在使用默认的收集器的应用性能配置文件的差异，G1 现在有一个并行完整收集机制。

[313]移除 Native-Header 自动生成工具：Java9 开始了一些对 JDK 的家务管理，这项特性是对它的延续。当编译 JNI 代码时，已不再需要单独的工具来生成头文件，因为这可以通过 javac 完成。在未来的某一时刻，JNI 将会被 Panama 项目的结果取代，但是何时发生还不清楚。

[304]垃圾回收器接口: 这不是让开发者用来控制垃圾回收的接口；而是一个在 JVM 源代码中的允许另外的垃圾回收器快速方便的集成的接口。

[312]线程-局部变量管控：这是在 JVM 内部相当低级别的更改，现在将允许在不运行全局虚拟机安全点的情况下实现线程回调。这将使得停止单个线程变得可能和便宜，而不是只能启用或停止所有线程。

[316]在备用存储装置上的堆分配：硬件技术在持续进化，现在可以使用与传统 DRAM 具有相同接口和类似性能特点的非易失性 RAM 。这项 JEP 将使得 JVM 能够使用适用于不同类型的存储机制的堆。

[317] 试验性的基于 Java 的 JIT 编译器：最近宣布的 Metropolis 项目，提议用 Java 重写大部分 JVM 。乍一想，觉得很奇怪。如果 JVM 是用 Java 编写的，那么是否需要一个 JVM 来运行 JVM ？ 相应的，这导致了一个很好的镜像类比。 现实情况是，使用 Java 编写 JVM 并不意味着必须将其编译为字节码，你可以使用 AOT 编译，然后在运行时编译代码以提高性能。  
这项 JEP 将 Graal 编译器研究项目引入到 JDK 中。并给将 Metropolis 项目成为现实，使 JVM 性能与当前 C++ 所写版本匹敌（或有幸超越）提供基础。

[296]: 合并 JDK 多个代码仓库到一个单独的储存库中：在 JDK9 中，有 8 个仓库： root、corba、hotspot、jaxp、jaxws、jdk、langtools 和 nashorn 。在 JDK10 中这些将被合并为一个，使得跨相互依赖的变更集的存储库运行 atomic commit （原子提交）成为可能。
