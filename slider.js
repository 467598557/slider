/**
@param wrapper 内容滑动容器(原生的dom对象)
@param onSliderStartCallback  开始滑动时回调函数，返回true表示继续执行，返回false表示不继续执行下面的内容
@param onSliderEndCallback  滑动结束后回调函数
@param maxSliderLength  用户最长可以滑动的长度(px)
@param minSliderLength  用户最小可以触发onSliderEndCallback的滑动长度
@param sliderBackDuration 松开手之后，容器回归动画时间
@param delayToSliderBackDuration  松开手之后，容器回归之前，需要等待的时间
*/
(function() {
	function Slider(e) {
		this.e = e;
		!this.e.minSliderLength && (this.e.minSliderLength = 50);
		!this.e.maxSliderLength && (this.e.minSliderLength = 100);
		var self = this;
		var wrapper = e.wrapper;
		var sliderValid = false;
		var TransitionUtil = {
			setTransitionDuration: function(domStyle, time) {
				domStyle.webkitTransitionDuration =
				domStyle.MozTransitionDuration =
				domStyle.msTransitionDuration =
				domStyle.OTransitionDuration =
				domStyle.transitionDuration = time;
			},
			setTransitionDelay: function(domStyle, time) {
				domStyle.webkitTransitionDelay =
				domStyle.MozTransitionDelay =
				domStyle.msTransitionDelay =
				domStyle.OTransitionDelay =
				domStyle.transitionDelay = time;
			},
			setTranslateY: function(domStyle, posY) {
				domStyle.webkitTransform = 'translate(0, ' + posY+'px)' + 'translateZ(0)';
				domStyle.msTransform =
				domStyle.MozTransform =
				domStyle.OTransform = 'translateY(' + posY+'px)';
				domStyle.webkitTranslateZ = posY+"px";
			}
		};
		wrapper.addEventListener("touchstart", function(e) {
			var touch = e.touches[0];
			this.touchPos = {
				x: touch.pageX,
				y: touch.pageY
			}
			TransitionUtil.setTransitionDuration(wrapper.style, "0ms");
			TransitionUtil.setTransitionDelay(wrapper.style, "0ms");
			if(self.e.onSliderStartCallback) {
				sliderValid = self.e.onSliderStartCallback ();
			} else {
				sliderValid = false;
			}
		}, false);
		wrapper.addEventListener("touchmove", function(e) {
			if(!sliderValid) {
				return;
			}
			var changedTouche = e.changedTouches[0];
			var touchPos = {
				x: changedTouche.pageX,
				y: changedTouche.pageY
			};
			var offsetY = touchPos.y - this.touchPos.y;
			if(offsetY < 0 || offsetY > self.e.maxSliderLength) {
				return;
			}
			TransitionUtil.setTranslateY(wrapper.style, offsetY);
		}, false);
		wrapper.addEventListener("touchend", function(e) {
			if(!sliderValid) {
				return;
			}

			var changedTouche = e.changedTouches[0];
			var touchPos = {
				x: changedTouche.pageX,
				y: changedTouche.pageY
			};
			TransitionUtil.setTransitionDuration(wrapper.style, self.e.sliderBackDuration + "ms");
			TransitionUtil.setTranslateY(wrapper.style, 0);
			//业务处理
			if(touchPos.y - this.touchPos.y < self.e.minSliderLength) {
				return;
			}
			// delay
			TransitionUtil.setTransitionDelay(wrapper.style, self.e.delayToSliderBackDuration + "ms");
			self.e.onSliderEndCallback && self.e.onSliderEndCallback();
		});
	}

	window.Slider = Slider;
		if(typeof define === "function" && define.amd) {
		define( "Slider", [], function() {
			return Slider;
		});
	}
})();
