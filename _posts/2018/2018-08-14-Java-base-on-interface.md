---
layout: post
title:  "基于接口设计与编程"
categories: Java
tags:  Java
---

* content
{:toc}

```
来源：琴水玉  
链接：www.cnblogs.com/lovesqcc/p/8672868.html
```




## 问题

可能很多开发者对“基于接口编程”的准则耳熟能详，也自觉不自觉地遵守着这条准则，可并不是真正明白为什么要这么做。大部分时候，我们定义Control, Service, Dao 接口，实际上却很少提供超过两个类的实现。 似乎只是照搬准则，过度设计，并未起实际效用。不过，基于接口设计与编程，在通常情形下可以增强方法的通用性；而在特定场景下，则可以有助于系统更好地重构和精炼。

当需要从一个系统提炼出更通用的系统，或者重构出一个新的系统时，预先设计的接口就会起大作用。

举个例子吧， 假设现在已经有一个订单导出的实现，如下所示：

```java
    package zzz.study.inf;

    import java.util.List;
    import java.util.concurrent.ExecutorService;
    import java.util.concurrent.Executors;

    import lombok.Data;

    /**
     * Created by shuqin on 18/3/29.
     */
    public class OrderExportService {

      private static OrderExportService orderExportService;

      ExecutorService es = Executors.newFixedThreadPool(10);

      public static void main(String[] args) {
        getInstance().export(new OrderExportRequest());
      }

      public static OrderExportService getInstance() {
        // 实际需要考虑并发, 或者通过Spring容器管理实例
        if (orderExportService != null) {
          return orderExportService;
        }
        return new OrderExportService();
      }

      public String exportOrder(OrderExportRequest orderExportRequest) {
        check(orderExportRequest);
        String exportId = save(orderExportRequest);
        generateJobFor(orderExportRequest);
        return exportId;
      }

      private String save(OrderExportRequest orderExportRequest) {
        // save export request param into db
        // return exportId
        return "123";
      }

      private void generateJobFor(OrderExportRequest orderExportRequest) {
        es.execute(() -> exportFor(orderExportRequest));
      }

      private void exportFor(OrderExportRequest orderExportRequest) {
        // export for orderExportRequest
      }

      private void check(OrderExportRequest orderExportRequest) {
        // check bizType
        // check source
        // check templateId
        // check shopId
        // check biz params
      }

    }

    @Data
    class OrderExportRequest {
      private String bizType;
      private String source;
      private String templateId;

      private String shopId;

      private String orderNos;

      private List<String> orderStates;

    }
```

可以看到，几乎所有的方法都是基于实现类来完成的。 如果这个系统就只需要订单导出也没什么问题，可是，如果你想提炼出一个更通用的导出，而这个导出的流程与订单导出非常相似，就尴尬了： 无法复用已有的代码和流程。它的代码类似这样：

```java
    package zzz.study.inf;

    import java.util.concurrent.ExecutorService;
    import java.util.concurrent.Executors;

    import lombok.Data;

    /**
     * Created by shuqin on 18/3/29.
     */
    public class GeneralExportService {

      private static GeneralExportService generalExportService;

      ExecutorService es = Executors.newFixedThreadPool(10);

      public static void main(String[] args) {
        getInstance().export(new GeneralExportRequest());
      }

      public static GeneralExportService getInstance() {
        // 实际需要考虑并发, 或者通过Spring容器管理实例
        if (generalExportService != null) {
          return generalExportService;
        }
        return new GeneralExportService();
      }

      public String exportOrder(GeneralExportRequest generalExportRequest) {
        check(generalExportRequest);
        String exportId = save(generalExportRequest);
        generateJobFor(generalExportRequest);
        return exportId;
      }

      private String save(GeneralExportRequest generalExportRequest) {
        // save export request param into db
        // return exportId
        return "123";
      }

      private void generateJobFor(GeneralExportRequest generalExportRequest) {
        es.execute(() -> exportFor(generalExportRequest));
      }

      private void exportFor(GeneralExportRequest orderExportRequest) {
        // export for orderExportRequest
      }

      private void check(GeneralExportRequest generalExportRequest) {
        // check bizType
        // check source
        // check templateId
        // check shopId

        // check general params
      }

    }

    @Data
    class GeneralExportRequest {

      private String bizType;
      private String source;
      private String templateId;

      private String shopId;

      // general export param

    }
```

可以看到，检测基本的参数、保存导出记录，生成并提交导出任务，流程及实现几乎一样，可是由于之前方法限制传入请求的实现类，**使得之前的方法都无法复用，进一步导致大段大段的重复代码， 而若在原有基础上改造，则要冒破坏现有系统逻辑和实现的很大风险，真是进退两难** 。


## 解决

怎么解决呢？ 最好能够预先做好设计，设计出基于接口的导出流程框架，然后编写所需要实现的方法。

#### 定义接口

由于传递具体的请求类限制了复用，因此，需要设计一个请求类的接口，可以获取通用导出参数， 具体的请求类实现该接口：

```java
    public interface IExportRequest {
      // common methods to be implemented

    }

    class OrderExportRequest implements IExportRequest {
      // implementations for IExportRequest methods
    }

    class GeneralExportRequest implements IExportRequest {
      // implementations for IExportRequest methods
    }
```

#### 实现抽象导出

接着，基于导出请求接口，实现抽象的导出流程骨架，如下所示：

```java
    package zzz.study.inf;

    import com.alibaba.fastjson.JSON;
    import java.util.concurrent.ExecutorService;

    /**
     * Created by shuqin on 18/3/29.
     */
    public abstract class AbstractExportService {

      public String export(IExportRequest exportRequest) {
        checkCommon(exportRequest);
        checkBizParam(exportRequest);
        String exportId = save(exportRequest);
        generateJobFor(exportRequest);
        return exportId;
      }

      private String save(IExportRequest exportRequest) {
        // save export request param into db
        // return exportId
        System.out.println("save export request successfully.");
        return "123";
      }

      private void generateJobFor(IExportRequest exportRequest) {
        getExecutor().execute(() -> exportFor(exportRequest));
        System.out.println("submit export job successfully.");
      }

      public void exportFor(IExportRequest exportRequest) {
        // export for orderExportRequest
        System.out.println("export for export request for" + JSON.toJSONString(exportRequest));
      }

      private void checkCommon(IExportRequest exportRequest) {
        // check bizType
        // check source
        // check templateId
        // check shopId
        System.out.println("check common request passed.");
      }

      public abstract void checkBizParam(IExportRequest exportRequest);
      public abstract ExecutorService getExecutor();

    }
```

#### 具体导出

然后，就可以实现具体的导出了：

订单导出的实现如下：

```java
    public class OrderExportService extends AbstractExportService {

      ExecutorService es = Executors.newCachedThreadPool();

      @Override
      public void checkBizParam(IExportRequest exportRequest) {
        System.out.println("check order export request");
      }

      @Override
      public ExecutorService getExecutor() {
        return es;
      }
    }
```

通用导出的实现如下：

```java
    public class GeneralExportService extends AbstractExportService {

      ExecutorService es = Executors.newFixedThreadPool(10);

      @Override
      public void checkBizParam(IExportRequest exportRequest) {
        System.out.println("check general export request");
      }

      @Override
      public ExecutorService getExecutor() {
        return es;
      }
    }
```

#### 导出服务工厂

定义导出服务工厂，来获取导出服务实例。在实际应用中，通常通过Spring组件注入和管理的方式实现的。

```java
    public class ExportServiceFactory {

      private static OrderExportService orderExportService;

      private static GeneralExportService generalExportService;

      public static AbstractExportService getExportService(IExportRequest exportRequest) {
        if (exportRequest instanceof OrderExportRequest) {
          return getOrderExportServiceInstance();
        }
        if (exportRequest instanceof GeneralExportRequest) {
          return getGeneralExportServiceInstance();
        }
        throw new IllegalArgumentException("Invalid export request type" + exportRequest.getClass().getName());
      }

      public static OrderExportService getOrderExportServiceInstance() {
        // 实际需要考虑并发, 或者通过Spring容器管理实例
        if (orderExportService != null) {
          return orderExportService;
        }
        return new OrderExportService();
      }

      public static GeneralExportService getGeneralExportServiceInstance() {
        // 实际需要考虑并发, 或者通过Spring容器管理实例
        if (generalExportService != null) {
          return generalExportService;
        }
        return new GeneralExportService();
      }

    }
```

#### 客户端使用

现在，可以在客户端使用已有的导出实现了。

```java
    public class ExportInstance {

      public static void main(String[] args) {
        OrderExportRequest orderExportRequest = new OrderExportRequest();
        ExportServiceFactory.getExportService(orderExportRequest).export(orderExportRequest);

        GeneralExportRequest generalExportRequest = new GeneralExportRequest();
        ExportServiceFactory.getExportService(generalExportRequest).export(generalExportRequest);
      }

    }
```

现在，订单导出与通用导出能够复用相同的导出流程及导出方法了。


## 基于接口设计

主要场景是：1. 需要从系统中提炼出更通用的系统； 2. 需要从老系统重构出新的系统而不需要做“剧烈的变更”。有同学可能担心，基于接口设计系统是否显得“过度设计”。在我看来，先设计系统的接口骨架，可以让系统的流程更加清晰自然，更容易理解，也更容易变更和维护。接口及交互设计得足够好，就能更好滴接近“开闭原则”，有需求变更的时候，只是新增代码而不修改原有代码。

基于接口设计需要有更强的整体设计思维，预先思考和建立系统的整体行为规约及交互，而不是走一步看一步。

JDK集合框架是基于接口设计的典范，读者可仔细体味。


## 基于接口编程

基于接口编程有三个实际层面：基于Interface编程；基于泛型接口编程； 基于Function编程。

基于Interface编程，能够让方法不局限于具体类，更好滴运用到多态，适配不同的对象实例； 基于泛型编程，能够让方法不局限于具体类型，能够适配更多类型；基于Function编程，能够让方法不局限于具体行为，能够根据传入的行为而改变其具体功能变化多样，解耦外部依赖。


## 小结

通过一个实际的例子阐述了基于接口设计与编程的缘由。基于接口设计与编程，可以使系统更加清晰而容易扩展和变更。
