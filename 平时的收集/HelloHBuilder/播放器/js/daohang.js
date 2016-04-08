;
(function($) {
	$.fn.lavalamp = function(options) { //lavalamp=插件名
		options = $.extend({
			gap: 20, //设置options.gap为20
			easeinel: 'easeInOutElastic', //设置options.easing为ease InOutElastic
			ease: ''
		}, options);
		return this.each(function() {
			var $nav = $(this),
				$current_item = $(this).find('.focus'), //在$nav中查找.focus对象后保存到$current_item变量中		
				$lava = $('<li class="lava"></li>'),
				reset; //将动态生成的<li class="lava">保存到$lava变量中
			$nav.css('position', 'relative')
				.find('a').css({ //在$nav内查找<a>并添加样式
					position: 'relative',
					zIndex: 1
				});
			$lava.css({ //使用.css()方法向$lava添加样式
				width: $current_item.outerWidth(),
				height: $current_item.outerHeight() + options.gap, //将高度设置为$current_item元素的高度,options.gap=引用options空间的gap值
				backgroundColor: '#eee',
				position: 'absolute',
				top: $current_item.position().top - (options.gap / 2), //设置$lava的top为$current_item的top减去20/2
				left: $current_item.position().left
			}).appendTo($nav.find('ul'));
			$nav.find('li') //在$nav中查找li
				.bind('mouseover focusin', function() { //为mouseover,focusin事件绑定处理函数
					$lava.animate({ //向$lava设置动画
						left: $(this).position().left, //将$lava的left设置为li的left
						width: $(this).outerWidth() //将$lava的width设置为li的width
					}, {
						duration: 400, //设置动画持续时间为400ms
						easing: options.easeinel, //设置动画Easing曲线为弹性移动,更多效果参考书本141P
						//easeIn=开始移动慢，而后慢慢加速		easeOut=开始移动快，而后慢慢减速。		easeInOut=前半段从0开始加速，后半段减速到0
						queue: false //设置动画队列为false，设置为false后可以多个动画同时执行
					})
				})
				.bind('mouseout focusout', function() { //mouseout,focusout事件绑定处理函数
					//setTimeout(function(){									//设置setTimeout()
					$lava.animate({ //超过指定的时间向$lava设置动画
						left: $current_item.position().left, //设置$lava的left为$current_item的left
						width: $current_item.outerWidth()
					}, {
						duration: 400,
						easing: options.ease,
						queue: false
					} /*,200*/ ); //设置setTimeout()的时间，悬浮框返回的持续时间
					//},2000);																	//设置动画duration时间，鼠标离开后悬浮框停留的时间
				});
		});
	};
})(jQuery);

/******** 创建jQuery插件的基本代码 ********/
/*
$.fn.lavalamp=function(){							为jQuery.fn对象添加lavalamp函数
	return this.each(function(){				返回this以处理jQuery链
		//插件代码												jQuery each()函数以每一个选配的元素作为上下文执行一个函数
	});
};
*/