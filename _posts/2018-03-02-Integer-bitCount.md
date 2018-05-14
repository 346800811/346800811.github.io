---
layout: post
title:  "Java 源码 Integer.bitCount"
categories: Java
tags:  Java 源码 Integer 算法
---

* content
{:toc}


Java源码分析：```java.lang.Integer.bitCount(int i)```。




## 源代码：

```java
/**
 * Returns the number of one-bits in the two's complement binary
 * representation of the specified {@code int} value.  This function is
 * sometimes referred to as the <i>population count</i>.
 *
 * @param i the value whose bits are to be counted
 * @return the number of one-bits in the two's complement binary
 *     representation of the specified {@code int} value.
 * @since 1.5
 */
public static int bitCount(int i) {
    // HD, Figure 5-2
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}
```

## 思路：
大致的思路如下：  
```
1//计算每两位有几个1
2//计算每四位有几个1
3//计算每八位有几个1
4//计算每十六位有几个1
5//计算每32为有几个1
6//删除后六位之前的值
```

先每两位一组，求二进制1的个数，并且保存在原处，然后每四个一组，把之前每两个的那组算出来的值相加，再把它存储在原处。以此类推直到计算完成。

先观察存储的情况：

|二进制源数据|有几个1|解释|
|:-------|:-------|:-------|
|00|00|这两位没有，那就用0存储|
|01|01|这两位只有一个1，就用1存储|
|10|01|这两位也只有一个1,也用1存储|
|11|10|这两位有两个1，用10存储|

那么i不止两位怎么处理呢？比如：1110，我们希望得到的是0101(每两位都是`>>>1`嘛)，对于最后的两位来说，向右移位之后，原先最后的一位二进制被移出去 ，但是之前每两位的向右移位会影响后面的最高位，比如：0111，那么我们此时把从前面移出去的那一位消除：

```i >>> 1 & 0x55555555```  
即为：01010101 01010101 01010101 01010101  
这个例子为：0111 & 0101;  
就得到了0101;  
```i = i - ((i>>>1) & 0x55555555)```

我们此时得到了没两位的1的个数并保存在原位。  
那么，如何计算4位的二进制位呢？  
我们可以把每一个四位的1的个数看成其中两个2位的个数的和。  
对于其中的一个四位aabb:  
低两位 bb = aabb & 0011，关键是要计算bb和aa的和：  
已知可以用1100& aabb = aa00，但是多了两个00，那么要计算aa + bb：  
可以 ```aabb>>>2 = 00aa```只看这两位，移位多出去的也可以被下一个00消除，不影响后面的计算。  
即:  
```λ =( i & 0x33333333) + (i>>>2 & 0x33333333)```

同理求8位里面的两边4位之和：  
```λ =( i + i>>>4) & 0x0F0F0F0F```

那为什么后面两行代码求16位和32位的时候没有再用与运算呢？因为最后的结果肯定不超过2^5，所以我们只关心最右边的那些结果是否算对，而高位数的那些冗余的通过最后一步来消去。  
最后：  
```0000 0000 0000 0000 0000 0000 0011 1111 = 0x3F```  
利用return i&0x3F，把前面的值抹干净。


源码解析参考自：http://blog.csdn.net/cor_twi/article/details/53720640
