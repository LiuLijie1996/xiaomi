$(function () {
	// 初始化
	page.initialize();
})

var page = {
	/**
	 * 初始化
	*/
	initialize: function () {
		// 设置iframe高度
		this.resizeIframe();

		// 左侧导航的点击效果
		this.slideToggle();
	},

	/**
	 * 设置iframe高度
	*/
	resizeIframe: function () {
		$("#rightView").height($(window).height() - 80);
	},

	/**
	 * 左侧导航的点击收缩效果
	*/
	slideToggle: function () {
		$('.aside h4').click(function () {
			//		$(this).toggleClass('active');
			$(this).siblings('ul').slideToggle();
		})
	}
};

window.onresize = page.resizeIframe;
