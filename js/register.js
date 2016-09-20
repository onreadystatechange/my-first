$(function(){
	/*
	 注册验证
	 * */
	var verifyRegistration = {
		listWrapper:$('.listtit'),
		liWrapper:$('#lis-wrapper'),
		listItem:$('.lis_item'),
		selectResult:$('#select-cycode-result'),
		lisLeft:$('.lis_left'),
		lisRight:$('.lis_right'),
		chkcode:$('.chkcode_img'),
		phone:$('#phone'),
		captchaCode:$('#captcha-code'),
		btn:$('#login-btn'),
		data:1,
		dated:1,
		datedn:1,
		init:function(){
			this.listWrapperClick();
			this.identifyingCode();
			this.phoneChecked();
			this.btnClick();
			this.chkChecked();
		},
		listWrapperClick:function(){
			var that = this;
			//var indexd = true;
			this.listWrapper.click(function(e){
				e.stopPropagation();
				that.liWrapper.toggle();
			})
			this.listItem.click(function(){
				var str = '';
				str += $(this).find('.lis_left').html() + '( ' +$(this).find('.lis_right').html()+ ')';
				that.selectResult.html(str);
			//	if(!indexd){
			//		that.liWrapper.hide();
			//	}
				//indexd = true;
			})
			$('body').click(function(e){
				//var target = e.target;
				//if(!$(target).is($('.listtit,.listtit *,.liWrapper,.liWrapper *'))){
					that.liWrapper.hide();
				//}
				//indexd = true;
			});
			this.chkcode.click(function(){
				that.identifyingCode();
				that.phoneChecked();
			})
		},
		identifyingCode:function(){
			var str ='1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
			var randomRolor = ['#ff6700','purple','brown','black','#2e1417','#c33','#1ca261']
			var needNum = parseInt((Math.random()*30) % randomRolor.length);
			var cool = '';
			for(var a=0; a<6; a++){
				cool += str.charAt(parseInt(Math.random()*1000)%62)
			}
			this.chkcode.html(cool);
			this.chkcode.css('color',randomRolor[needNum]);
		},
		chkChecked:function(){
			var that =this;
			this.captchaCode.on('change',function(){
				that.oneFunction();
			})
		},
		oneFunction:function(){
			var chk = this.chkcode.html();
			var bigChk = chk.toUpperCase();
			var smallChk = chk.toLowerCase();
			var that = this;
			if(this.captchaCode.val() != bigChk && this.captchaCode.val() != smallChk && this.captchaCode.val() != chk){
				this.captchaCode.parent().css('border-color','#ff6700');
				$('#error-outcon').show().find('.error-con').html('验证码输入错误');
				that.data = 0;
				return;
			}
			this.captchaCode.parent().css('border-color','#e0e0e0');
			$('#error-outcon').hide().find('.error-con').html('');
			that.data = 1;
		},
		phoneChecked:function(){
			var reg = /^[1][358][0-9]{9}$/;
			var that = this;
			this.captchaCode.on('input propertychange',function(){
				$(this).parent().css('border-color','#e0e0e0');
				$('#error-outcon').hide().find('.error-con').html('');
			});
			this.phone.on('input propertychange',function(){
				$(this).parent().css('border-color','#e0e0e0');
				$('#error-phone').hide().find('.error-con').html('');
			});
			that.phone.on('change',function(){
				if( !reg.test($(this).val()) ){
					$(this).parent().css('border-color','#ff6700');
					$('#error-phone').show().find('.error-con').html('手机号码格式错误');
					that.datad = 0;
					return;
				};
				$.getJSON('js/userinfo.json',function(userinfo){
					var phoneNum = that.phone.val();
					for(var i in userinfo){
						if(userinfo[i].phone == phoneNum){
							that.phone.parent().css('border-color','#ff6700');
							$('#error-phone').show().find('.error-con').html('手机号已被注册');
							that.datedn = 0;
							return;
						}
					}
				});
				$(this).parent().css('border-color','#e0e0e0');
				$('#error-phone').hide().find('.error-con').html('');
				that.datad = 1;
				that.datedn = 1;
			});
		},
		btnClick:function(){
			var that = this;
			this.btn.click(function(){
				
				if(that.phone.val().length<=0){
					that.phone.parent().css('border-color','#ff6700');
					$('#error-phone').show().find('.error-con').html('请输入手机号');
					return;
				};
				
				if(that.captchaCode.val().length<=0){
					that.captchaCode.parent().css('border-color','#ff6700');
					$('#error-outcon').show().find('.error-con').html('请输入图片验证码');
					return;
				};
				that.oneFunction();
				var content = $('#error-phone').find('.error-con').html();
				var contenter = $('#error-outcon').find('.error-con').html();
				
				if(that.data && that.dated && that.datedn ){
					var userinfo = {
							phone: that.phone.val(),
							isLogin: false
						};
					$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/mi'});
					location.href = "jump.html";
				}
			})
		}
	}
	verifyRegistration.init();
})
