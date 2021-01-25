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

		// 删除
		this.delete();
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
	},

	/**
	 * 删除
	*/
	delete: function () {
		$('.delete').click(function () {
			var flag = confirm("你确定删除吗？");
			console.log(flag);
			return flag;
		})
	},

	/**
	 * 修改字段值
	 * 	ele		被点击的元素
	 * 	model	要操作的数据模型
	 * 	id		查找的数据
	 * 	key		需要修改的字段
	 * 	value	修改的值
	*/
	updateKey({ ele, model, id, key, value }) {
		if (ele.src.includes('yes')) {
			ele.src = '/admin/images/no.gif'
		} else {
			ele.src = '/admin/images/yes.gif'
		}
		$.ajax({
			type: "POST",
			url: "/adminPage/updateKey",
			data: { model, id, key, value },
			success: function (result) {
				console.log(result);
			}
		});
	},

	updateSort({ ele, model, id }) {
		// 获取span中的排序值
		let html = $(ele).html().trim();

		// 生成input
		let input = $(`<input type='text' value='${html}'/>`);
		$(ele).html(input);

		// 获取焦点
		$(input).trigger('focus');

		// 阻止点击事件的冒泡
		$(input).click(function (event) {
			event.stopPropagation();
		});

		// 失去焦点
		$(input).blur(function (event) {
			let value = $(input).val();
			$(ele).html(value);

			// 上传数据
			$.ajax({
				type: "POST",
				url: "/adminPage/updateKey",
				data: {
					model,
					id,
					key: 'sort',
					value,
				},
				success: function (result) {
					console.log(result);
				}
			});
		});
	},
};

window.onresize = page.resizeIframe;
