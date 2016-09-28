$(function(){
	var shopindex={
		selectVersion:$('#J_stepList1 .J_stepItem'),
		selectColor:$('#J_stepList2 .J_stepItem'),
		addFavorable:$('#J_packageItem'),
		proChooseStep:$('#J_stepList3 .J_packageItem'),
		proChoose:$('#J_stepList3'),
		messageShow:$('.J_verDesc'),
		messageBd:$('#msg-bdi'),
		priceChange:$('.pro-price'),
		imgItem:$('#J_proImg'),
		priceItem:$('#price-item'),
		packageList:$('#J_packageListBox'),
		btnPrimary:$('#btn-primary'),
		primary:$('#primary'),
		suit:$('#suit'),
		store:$('#store'),
		data:1,
		index:1,
		init:function(){
			this.versionClick();
			this.colorSelect();
			this.choosePro();
			this.btnClick();
		},
		versionClick:function(){
			var that = this;
			this.selectVersion.click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				that.messageShow.html($(this).data('desc'));
				that.priceChange.html($(this).data('title-price'));
				that.messageBd.html($(this).text());
				that.store.attr({
					'data-price':$(this).attr('data-title-price'),
					'data-memory':'全网通'+$(this).attr('title'),
					'data-node-id':$(this).attr('data-node-id')
				})
				if(that.data == 0 || that.index==0){
					that.selectColor.removeClass('active');
					that.proChoose.hide();
					that.priceItem.html('');	
					that.suit.html('');
					that.packageList.hide();
					that.btnPrimary.show();
				}
				that.data = 1;
				that.index = 1;
			});
		
		},
		colorSelect:function(){
			var that = this;
			this.selectColor.click(function(){
				that.data = 0;
				that.proChoose.show();
				$(this).addClass('active').siblings().removeClass('active');
				that.priceItem.html($(this).attr('title'));
				that.imgItem.attr({
					'src':$(this).data('img')
				})
				that.store.attr({
					'data-img':$(this).attr('data-img'),
					'data-color':$(this).text().trim(),
					'data-gid':$(this).attr('data-gid')
				})
				if(that.index==0){
					that.proChooseStep.removeClass('active');
					that.packageList.hide();
					that.suit.html('');
					that.btnPrimary.show();
				}
			})
		},
		choosePro:function(){
			$.removeCookie('xiaomi-five',{path:'\mi'})
			console.log(document.cookie)
			var that = this;
			this.proChooseStep.on('click',function(){
				that.index = 0;
				$(this).addClass('active').siblings().removeClass('active');
				that.packageList.show();
				that.suit.html($(this).attr('title'))
				that.btnShow();
			})
			that.addFavorable.click(function(e){
				e.stopPropagation();
				that.packageList.hide();
				that.suit.html('');
			})
			
		},
		btnShow:function(){
			if(!this.index){
				this.btnPrimary.hide();	
			}
			console.log(document.cookie)
		},
		btnClick:function(){
			var that = this;
			
			this.primary.click(function(){
				var goods = {
					dataId:that.store.attr('data-node-id'),
					dataGd:that.store.attr('data-gid'),
					name:that.store.attr('data-name'),
					memory:that.store.attr('data-memory'),
					color:that.store.attr('data-color'),
					amount:that.store.attr('data-amount'),
					img:that.store.attr('data-img'),
					price:that.store.attr('data-price')
				}
				var userCart = $.cookie('xiaomi-five');
				userCart  = userCart || '{}';
				userCart = JSON.parse(userCart);
				console.log(userCart)
				if(!userCart[goods.dataId]){
					userCart[goods.dataId] = {
						memory:goods.memory,
						price:goods.price,
						name:goods.name,
						gcolor:{}
					}
				}
				if(!userCart[goods.dataId].gcolor[goods.dataGd]){
					userCart[goods.dataId].gcolor[goods.dataGd]={
						color:goods.color,
						img:goods.img,
						amount:goods.amount
					}
				}else{
					userCart[goods.dataId].gcolor[goods.dataGd].amount++;
				}
				$.cookie('xiaomi-five',JSON.stringify(userCart),{expires: 7,path:'/mi'});
				console.log(userCart)
			})
		}
	}
	shopindex.init();
})
