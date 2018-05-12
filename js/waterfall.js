/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      demo_link: 'https://codepen.io/haoyang/pen/jrvrQq',
      img_link: 'https://ooo.0o0.ooo/2016/11/24/5836d81f48cd2.png',
      code_link: 'https://codepen.io/haoyang/pen/jrvrQq',
      title: 'Fisher-Yates 洗牌算法动画',
      core_tech: 'JavaScript',
      description: 'Fisher-Yates 洗牌算法动画。算法详情见 <a href ="https://gaohaoyang.github.io/2016/10/16/shuffle-algorithm/">这里</a>。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/test/headerTransition/',
      img_link: 'https://ooo.0o0.ooo/2016/06/20/5768c1597d1fe.png',
      code_link: 'https://github.com/Gaohaoyang/test/tree/master/headerTransition',
      title: 'Header Transition 渐变动画',
      core_tech: 'jQuery BootStrap CSS3',
      description: '花费不到半小时帮师兄做了一个简单的 CSS3 动画效果，当页面滚动到指定距离时，header 区的背景色由透明变为蓝色。仿照了网站 <a href ="https://quorrajs.org/">https://quorrajs.org/</a> 的 Header 区动画效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_4.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba2krzs0j207005y0sv.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '输入框即时提示',
      core_tech: 'JavaScript',
      description: '对input监听，使用正在表达式高亮匹配，实现输入联想效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_3.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba04okoqj20eq093wh1.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '轮播图',
      core_tech: 'JavaScript',
      description: '变速运动，运动终止条件的应用。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_1.html',
      img_link: 'http://ww3.sinaimg.cn/large/7011d6cfjw1f3b9tmyuh2j20au0aaaar.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '处理兴趣爱好列表',
      core_tech: 'JavaScript',
      description: '对JavaScript正则表达式和字符串的练习。'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      count++
    } else {
      imgs[i].onload = function() {
        count++
        if (count == totalImgs) {
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
