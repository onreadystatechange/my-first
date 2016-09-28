/*
 	二维码弹窗
 */
$(function(){
	var popup = {
		ercode:$('.ercode'),
		loginMain:$('.mainbox'),
		loginQrcode:$('#login-qrcode'),
		iconCode:$('.code_close'),
		codeIframe:$('.code_iframe'),
		username:$('#username'),
		pwd:$('#pwd'),
		timer:null,
		loginBtn:$('#login-btn'),
		chkcode:$('.chkcode_img'),
		captchaCode:$('#captcha-code'),
		captcha:$('#captcha'),
		index:1,
		data:1,
		init:function(){
			this.ercodeClick();
			this.iconCodeClick();
			this.usernameCheck();
			this.btnClick();
			this.identifyingCode();
			this.chkChecked();
		},
		ercodeClick:function(){
			var that = this;
			this.ercode.click(function(){
				that.setTimeImg();
				that.loginQrcode.show();
				that.loginMain.hide();
			})
		},
		iconCodeClick:function(){
			var that = this;
			this.iconCode.click(function(){
				clearTimeout(that.timer)
				that.loginQrcode.hide();
				that.loginMain.show();
				that.codeIframe.html('')
			})
			
		},
		setTimeImg:function(){
			var that = this;
			this.timer = setTimeout(function(){
				that.codeIframe.append('<img src="img/xiazai0.png" />')
			},600)
		},
		usernameCheck:function(){
			var userinfo = JSON.parse( $.cookie('userinfo') );
			var that = this;
			
			this.username.on('input',function(){
				$(this).parent().css('border-color','#e0e0e0');
				$('#error-username').hide().find('.error-con').html('');
			})
			this.username.on('change',function(){
				if($(this).val() != userinfo.phone){
					$(this).parent().css('border-color','#FF6700');
					$('#error-username').show().find('.error-con').html('您输入的用户名未注册');
					that.captcha.show();
					that.index = 0;
					return;
				}
				that.index = 1;
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
			var that = this;
			this.captchaCode.on('input',function(){
				that.captchaCode.parent().css('border-color','#e0e0e0');
				$('#error-outcon').hide().find('.error-con').html('');
			})
			this.captchaCode.on('change',function(){
				that.oneFunction();
			})
			this.chkcode.click(function(){
				that.identifyingCode();
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
				this.data = 0;
				return;
			}
			this.captchaCode.parent().css('border-color','#e0e0e0');
			$('#error-outcon').hide().find('.error-con').html('');
			this.data = 1;
		},
		btnClick:function(){
			var that = this;
			this.loginBtn.click(function(){
				if(that.username.val().length<=0){
					that.username.parent().css('border-color','#FF6700');
					$('#error-username').show().find('.error-con').html('用户名不能为空');
					return;
				}
				if(that.pwd.val().length<=0){
					that.pwd.parent().css('border-color','#FF6700');
					$('#error-psw').show().find('.error-con').html('密码不能为空');
					return;
				}
				if($('#captcha-code').is('visible') && that.captchaCode.val().length<=0){
					that.captchaCode.parent().css('border-color','#FF6700');
					$('#error-outcon').show().find('.error-con').html('请输入验证码');
					return;
				}
				if(that.index && that.data){
					var userinfo = {
							phone: that.username.val(),
							isLogin: true
						};
					$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/'});
					location.href = 'index.html';
					return;
				}
			
			})
		}
	}
	popup.init();
})
