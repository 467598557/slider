# slider
一个slider,可以更方面的去帮助你，在移动端实现下滑刷新的功能
## 参数介绍
1.wrapper 内容滑动容器(原生的dom对象)
2.onSliderStartCallback  开始滑动时回调函数，返回true表示继续执行，返回false表示不继续执行下面的内容
3.onSliderEndCallback  滑动结束后回调函数
4.maxSliderLength  用户最长可以滑动的长度(px)
5.minSliderLength  用户最小可以触发onSliderEndCallback的滑动长度
6.sliderBackDuration 松开手之后，容器回归动画时间
7.delayToSliderBackDuration  松开手之后，容器回归之前，需要等待的时间
