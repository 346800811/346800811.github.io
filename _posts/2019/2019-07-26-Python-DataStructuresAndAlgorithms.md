---
layout: post
title:  "Python数据结构和算法"
categories: Python
tags:  Python
---

* content
{:toc}

```
参考：《Python3高级教程》  
```




Python提供了大量的内置数据结构，包括列表，集合以及字典。

##  1. 解压序列赋值给多个变量

问题：现在有一个包含N个元素的元组或者是序列，怎样将它里面的值解压后同时赋值给N个变量？  
解决方案

```
>>> p = (4,5)
>>> x, y = p
>>> x
4
>>> y
5
>>> data = ['ACME', 50, 91.1, (2019, 7, 26)]
>>> name, shares, price, date = data
>>> name
'ACME'
>>> date
(2019, 7, 26)
>>> name, shares, price, (year,mon,day) = data
>>> name
'ACME'
>>> year
2019
```

变量的数量必须跟序列元素的数量是一样的。如果变量个数和序列元素的个数不匹配，会产生一个异常。

这种解压赋值可以用在任何可迭代对象上面。包括字符串，文件对象，迭代器和生成器。

有时候，你可能只想解压一部分，对这种情况Python并没有提供特殊的语法，但可以使用任意变量名去占位，到时候丢掉这个些变量就行了。

```
>>> s = 'Hello'
>>> a, b, c, d, e = s
>>> a
'H'
>>> e
'o'
>>> data = ['ACME', 50, 91.1, (2019, 7, 26)]
>>> _, shares, price, _ = data
>>> shares
50
```

## 2. 解压可迭代对象赋值给多个变量

未完。。。




















