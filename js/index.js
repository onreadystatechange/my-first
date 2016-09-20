$(function(){
	/*用户点击搜索框*/
	var inputClick = {
		headerSearch:$('.header-search'),
		userInput:$('.user-input'),
		hotSell:$('.hot-sell'),
		userBtn:$('.user-btn'),
		keyWordList:$('.keywordlist'),
		resultList:$('.result-list li'),
		init:function(){
			this.userInputFocus();
			this.userInputBlur();
			this.changeBgColor();
		},
		userInputFocus:function(){
			var that = this;
			console.log(this.hotSell)
			this.userInput.focus(function(){
				that.hotSell.stop(true).fadeOut();
				that.keyWordList.show();
				that.userBtn.css('border-color','#ff6700');
				that.userInput.css('border-color','#ff6700');
				that.dataRead();
			})
		},
		userInputBlur:function(){
			var that = this;
			this.userInput.blur(function(){
				that.hotSell.stop(true).fadeIn();
				that.keyWordList.hide();
				that.userBtn.css('border-color','#e0e0e0');
				that.userInput.css('border-color','#e0e0e0');
			})
		},
		dataRead:function(){
			this.resultList.each(function(e){
				console.log($(this).children(['a']))
				$(this).find('a').text($(this).data('key'))
			})
		},
		changeBgColor:function(){
			$('.user-btn,.findGoods i').hover(function(){
				$('.user-btn,.findGoods i').css('background-color','#ff6700');
				$('.findGoods i').css('color','#fff');
			},function(){
				$('.user-btn,.findGoods i').css('background-color','#fff')
				$('.findGoods i').css('color','#333')
			})
		}
	}
	inputClick.init();
	
	
	/*下拉菜单*/
	var slideMenu = {
		itemChildren:$('.item-children'),
		width:$('body').width(),
		navItem:$('.nav-item'),
		wrapper:$('.slideWrapper'),
		timer:null,
		init:function(){
			this.setWidth();
			this.menuMouseEnter();
			this.menuMouseLeave();
		},
		setWidth:function(){
			var that = this;
			this.wrapper.css({
				'width':that.width,
				left: -(that.width - $('.container').width())/2
			});
		},
		menuMouseEnter:function(){
			var that = this;
			console.log($('.nav-item:lt(7)'))
				$('.nav-item:lt(7)').mouseenter(function(){
					clearTimeout(that.timer);
					console.log($(this).index());
					that.wrapper.stop(true).slideDown(200);
					$(this).find('a').addClass('active');
					$(this).siblings().find('a').removeClass('active');
					that.itemChildren.eq($(this).index()-1).show().siblings().hide();
				});
			$('.slideWrapper').mouseenter(function(){
				clearTimeout(that.timer);
				$(this).stop(true).slideDown(200);
			});
		},
		menuMouseLeave:function(){
			var that = this;
			$('.nav-item,.slideWrapper').mouseleave(function(e){
				that.timer = setTimeout(function(){
					that.wrapper.stop(true).slideUp(200);
					$('.nav-item').find('a').removeClass('active');
				},300)
			})
		}
	}
	slideMenu.init();
	
	//轮播图
	var bannerAuto = {
		imgItem:$('.item-img'),
		rightBtn:$('.right-btn'),
		leftBtn:$('.left-btn'),
		circleItem:$('.circle-item span'),
		circleItemC:$('.circle-item'),
		container:$('.banner-auto .container'),
		btn:$('btn'),
		timer:null,
		now:0,
		next:0,
		init:function(){
			this.btnClick();
			this.autoPlay();
			this.mouseEnter();
			this.cicleClick();
		},
		autoPlay:function(){
			var that = this;
			this.timer = setInterval(function(){
				that.next++;
				that.next %= that.imgItem.length;
				that.switchImg();
			},3000)
		},
		switchImg:function(){
			var that = this;
			this.imgItem.eq(this.now).animate({
				'opacity':0
			},600);
			this.imgItem.eq(this.next).animate({
				'opacity':1
			},600);
			this.now = this.next;
			this.circleItem.removeClass('changebg');
			this.circleItem.eq(this.next).addClass('changebg');
		},
		btnClick:function(){
			this.leftBtn.hover(function(){
				$(this).css({
					'background-position': '0px 0'
				})
			},function(){
				$(this).css({
					'background-position': '-84px 0'
				})
			})
			this.rightBtn.hover(function(){
				$(this).css({
					'background-position': '-43px 0'
				})
			},function(){
				$(this).css({
					'background-position': '-125px 0'
				})
			})
			var that = this;
			this.leftBtn.click(function(){
				that.next--;
				if(that.next<= -1){
					that.next = that.imgItem.length-1;
				}
				that.switchImg();
			})
			this.rightBtn.click(function(){
				that.next++;
				that.next %= that.imgItem.length;
				that.switchImg();
			})
		},
		mouseEnter:function(){
			var that = this;
			this.container.hover(function(){
				clearInterval(that.timer);
			},function(){
				that.autoPlay();
			})
		},
		cicleClick:function(){
			var that = this;
			this.circleItemC.click(function(){
				clearInterval(that.timer)
				var index = $(this).index();
				console.log(index)
				that.next = index;
				that.switchImg();
			})
		}
	}
	bannerAuto.init();
	
	//左侧选项卡
	var leftSelected = {
		secondItem:$('.second-item'),
		headerNav:$('.header-nav-content'),
		navContent:$('.nav-content-item'),
		key:0,
		init:function(){
			this.hoverList()
		},
		hoverList:function(){
			var that = this;
			this.navContent.mouseenter(function(){
				var index = $(this).index();
				that.secondItem.hide();
				that.secondItem.eq(index).show();
			})
			
			$('.nav-content-item').mouseleave(function(){
				that.secondItem.mouseenter(function(){
					$(this).show();
					that.key = 1;
				})
				if(that.key){
					var index = $(this).index();
					that.secondItem.hide();
					that.secondItem.eq(index).show();
				}else{
					that.secondItem.hide();
				}
				that.secondItem.mouseleave(function(){
					$(this).hide();
					that.key = 0;
				})
			})
		}
	}
	leftSelected.init();
	
	//滚动小轮播
	function SmallBanner(obj){
		this.obj = obj;
		this.homeStarList = obj.find('.home-star-list');
		this.leftBtn = obj.find('.controls-left');
		this.rightBtn = obj.find('.controls-right');
		this.controls = obj.find('.controls')
		this.homeWrapper = obj.find('.home-star-wrapper')
		this.timer = null;
		this.now = 1;
	}
	SmallBanner.prototype = {
		constructor: SmallBanner.prototype.constructor,
		__proto__: SmallBanner.prototype.__proto__,
		init:function(){
			this.autoPlay();
			this.stopAuto();
			this.btnClick();
		},
		autoPlay:function(){
			var that = this;
			this.timer=setInterval(function(){
				that.switchImgLeft()
			},5000)
		},
		switchImgLeft:function(){
			var that = this;
			this.now ++;
			if(this.now %2 ==0){
				this.rightBtn.css('color','#b0b0b1').removeClass('allowed')
			    this.leftBtn.css('color','#e0e0e1').addClass('allowed')
				this.homeStarList.animate({
					'margin-left':-1240
				})
				return;
			}
			this.leftBtn.css('color','#b0b0b1').removeClass('allowed')
			this.rightBtn.css('color','#e0e0e1').addClass('allowed')
			this.homeStarList.animate({
				'margin-left':0
			})		
		},
		stopAuto:function(){
			var that = this;
			this.obj.mouseenter(function(){
				clearInterval(that.timer)
			})
			this.obj.mouseleave(function(){
				that.autoPlay()
			})
		},
		btnClick:function(){
			var that = this;
			this.leftBtn.click(function(){
				var index = parseInt(that.homeStarList.css('margin-left'));
				if(index == 0){
					that.rightBtn.css('color','#b0b0b1').removeClass('allowed')
				    that.leftBtn.css('color','#e0e0e1').addClass('allowed')
					that.homeStarList.animate({
						'margin-left':-1240
					})
				}else{
					return;
				}
			})
			this.rightBtn.click(function(){
				var index = parseInt(that.homeStarList.css('margin-left'));
				if(index == -1240){
					that.leftBtn.css('color','#b0b0b1').removeClass('allowed')
					that.rightBtn.css('color','#e0e0e1').addClass('allowed')
					that.homeStarList.animate({
						'margin-left':0
					})
				}else{
					return;
				}
			})
		}
	}
	var homeStar = $('#home-star');
	var banner = new SmallBanner(homeStar);
	banner.init();
	
	var homeStared = $('#home-stared')
	var bannered = new SmallBanner(homeStared);
	bannered.init();
	
	
	
	//选项卡封装
	function TabControl(obj){
		this.obj = obj;
		this.list = obj.find('.tab-li');
		this.brickList = obj.find('.brick-list');
		this.brickItem = obj.find('.brick-item');
	}
	TabControl.prototype ={
		constructor: TabControl.prototype.constructor,
		__proto__: TabControl.prototype.__proto__,
		init:function(){
			this.listClick();
			this.brickItemHover();
		},
		listClick:function(){
			var that = this;
			this.list.mouseenter(function(){
				var index = $(this).index();
				$(this).addClass('tab-active').siblings().removeClass('tab-active');
				that.brickList.removeClass('tab-content-active');
				that.brickList.eq(index).addClass('tab-content-active');
			})
		},
		brickItemHover:function(){
			var that = this;
			
			this.brickItem.hover(function(){
				console.log($(this).find('.review-wrapper'))
				$(this).find('.review-wrapper').stop(true).animate({
					'opacity':1,
					'height':'80px'
				},100)
			},function(){
				$(this).find('.review-wrapper').stop(true).animate({
					'opacity':0,
					'height':'0px'
				},100)
			})
		}
	}
	var matchContent = $('#match')
	var tabControl = new TabControl(matchContent);
	tabControl.init();
	
	var matchContented = $('#mached')
	var tabControled = new TabControl(matchContented);
	tabControled.init();
	
	//li上移
	var changeMarginTop = {
		reviewItem:$('.change-margin'),
		reviewItemHover:function(){
			var that = this;
			this.reviewItem.hover(function(){
				$(this).stop(true).animate({
					'margin-top':'-3px'
				},100)
			},function(){
				$(this).stop(true).animate({
					'margin-top':'0px'
				},100)
			})
		}
		
	}
	changeMarginTop.reviewItemHover();
	
	//小轮播封装开始
	function Carousel(obj){
		this.obj = obj;
		this.ul = obj.find('.item-list');
		this.btn = obj.find('.control-btn');
		this.preBtn = obj.find('.controls-previous');
		this.nextBtn = obj.find('.controls-next');
		this.wrapper = obj.find('.xm-carousel-wrapper');
		this.li = obj.find('.item-list li');
		this.pager = obj.find('.pager');
	}
	Carousel.prototype = {
		constructor:Carousel.prototype.constructor,
		__proto__: Carousel.prototype.__proto__,
		init:function(){
			var that = this;
			var ulWidth = this.obj.width()*4;
			this.ul.css('width',ulWidth);
			this.mouseenterUl();
			this.btnClick();
		},
		mouseenterUl:function(){
			var that = this;
			this.obj.hover(function(){
				that.btn.stop(true).fadeIn(500);
			},function(){
				that.btn.stop(true).fadeOut(500);
			})
		},
		btnClick:function(){
			var that = this;
			var index = 0;
			var needWidth = this.obj.width();
			this.nextBtn.click(function(){
				var marginLeft = that.ul.css('margin-left');
				index++;
				if(index>3){
					index = 3;
				}
				that.ul.animate({
					'margin-left':-needWidth*index
				});
				that.pager.removeClass('pager-active');
				that.pager.eq(index).addClass('pager-active');
				
			})
			this.preBtn.click(function(){
				var marginLeft = that.ul.css('margin-left');
				index--;
				if(index<=-1){
					index = 0;
				};
				that.ul.animate({
					'margin-left':-needWidth*index
				});
				that.pager.removeClass('pager-active');
				that.pager.eq(index).addClass('pager-active');
			})
			this.pager.click(function(){
				that.pager.removeClass('pager-active');
				$(this).addClass('pager-active');
				var keyis = $(this).index();
				that.ul.animate({
					'margin-left':-needWidth*keyis
				});
			})
		}
	}
	var bannerCarousel = $('#content');
	var bannerCarouselSecond = $('#contentSecond');
	var carouselSecond = new Carousel(bannerCarouselSecond);
	var carousel = new Carousel(bannerCarousel);
	carouselSecond.init();
	carousel.init();
	new Carousel($('#contentTree')).init();
	new Carousel($('#contentLast')).init();
	
	
	
	//判断是否登录成功及购物车是否有物品
	var havelogin = {
		 notLogin:$('#not-login'),
		 haveLogin:$('#have-login'),
		 cartMini:$('.cart-mini'),
		 cartMiniGoods:$('.cart-mini-goods'),
		 logoff:$('#logoff'),
		 cartMiniNum:$('#cart-mini-num'),
		 cartMenu:$('.cart-mini-goods'),
		 cart:{},
		 init:function(){
		 	 this.cartMiniHover();
		 	 this.loginSuccess();
		 },
		 loginSuccess:function(){
		 	var userinfo = JSON.parse( $.cookie('userinfo') );
		 	console.log(userinfo)
		 	if(userinfo.isLogin){
		 		this.haveLogin.show();
		 		this.notLogin.hide();
		 		this.haveLogin.find('#link').html('欢迎你'+userinfo.phone)
		 	}
		 },
		 cartMiniHover:function(){
		 	var that = this;
		 	this.cartMini.hover(function(){
		 		that.cartMiniGoods.stop(true).slideDown(200);
		 		that.loadCookie();
		 	},function(){
		 		that.cartMiniGoods.stop(true).slideUp(200);
		 	})
		 	this.logoff.click(function(){
		 		var userinfo = JSON.parse( $.cookie('userinfo') );
		 		userinfo.isLogin = false;
		 		$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/mi'});
		 		location.reload();
		 	})
		 },
		 loadCookie:function(){
		 	this.readCart();
		 	var cartStr = '';
		 	var add = 0;
		 	var arr = [];
		 	for(var key in this.cart){
		 		var obj = this.cart[key];
		 		
		 		for(var i in obj['gcolor']){
		 			var index = obj.gcolor[i];
		 			cartStr += '<div style="background:#fff;padding:0;border-bottom:1px solid #ddd;text-indent:1em" class="clearfix">'+'<div style="float:left;color:#333;text-align:left;">'+'<p>'+obj.name+obj.memory+'</p>'
		 	+'</div>';
		 			cartStr += '<div style="float:left">'+'<img src="'+index['img']+'" style="width:30px;height:30px"/>'+'</div>'+'<p style="float:right;margin-top:-40px;margin-right:20px;color:red">'
		 			+obj.price+'×'+index['amount']+'</p>'+'</div>';
		 			arr.push(index["amount"]);
		 		}
		 	}
		 	for(var j=0; j<arr.length; j++){
		 		add += parseInt(arr[j])
		 	}
		 	console.log(arr)
		 	this.cartMiniNum.html('（'+add+'）')
		 	this.cartMenu.html(cartStr);
		 },
		 //读取购物车cookie
		readCart: function(){
			this.cart = $.cookie('xiaomi-five');
			this.cart = JSON.parse(this.cart);
			//console.log(this.cart);
		},
		//设置购物车cookie
		setCart: function(){
			$.cookie('xiaomi-five',JSON.stringify(this.cart),{expires: 7,path:'/mi'});
		}
	}
	havelogin.init();
})
