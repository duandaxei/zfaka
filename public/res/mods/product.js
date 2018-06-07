layui.define(['layer', 'form'], function(exports){
	var $ = layui.jquery;
	var layer = layui.layer;
	var form = layui.form;

	form.on('select(typeid)', function(data){
		if (data.value == 0) return;
		$.ajax({
			url: '/product/get/proudctlist',
			type: 'POST',
			dataType: 'json',
			data: {tid: data.value},
			beforeSend: function () {
			},
			success: function (result) {
				if (result.code == '1') {
					var html = "";
					var list = result.data.products;
					for (var i = 0, j = list.length; i < j; i++) {
						html += '<option value='+list[i].id+'>'+list[i].name+'</option>';
					}
					$('#productlist').html(html);
					form.render('select');
				} else {
				}
			}

		});
	});

	form.on('select(productlist)', function(data){
		if (data.value == 0) return;
		$.ajax({
			url: '/product/get/proudctinfo',
			type: 'POST',
			dataType: 'json',
			data: {pid: data.value},
			beforeSend: function () {
			},
			success: function (result) {
				if (result.code == '1') {
					var product = result.data.product;
					$('#price').val(product.price);
					if(product.qty>0){
						$('#qty').val(product.qty);
					}else{
						$('#qty').val("不限量");
					}
					$('#prodcut_description').html(product.description);
					//form.render('select');
				} else {
					
				}
			}
		});

	});
	
	exports('product',null)
});