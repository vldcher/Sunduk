$(function() {

	//flame
	var c = document.getElementById('canvas'),
	ctx = c.getContext('2d'),
	cw = c.width = 200,
	ch = c.height = 300,
	parts = [],
	partCount = 90,
	partsFull = false,
	rand = function(min, max) {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	};

	var FireParticle = function() {
		this.reset();
	};

	FireParticle.prototype.reset = function() {
		this.startRadius = this.radius = rand(4, 18);  
		this.x = cw / 3 + (rand(1, 6) - 3);
		this.y = 250;
		this.vx = this.vy = 0;
		this.hue = rand(2, 55);
		this.saturation = rand(100, 40);
		this.lightness = rand(25, 50);
		this.startAlpha = rand(12, 8) / 100;
		this.alpha = this.startAlpha;
		this.decayRate = .12;
		this.startLife = this.life = 11; //высота пламя
		this.lineWidth = rand(12, 90); //Ширина очага
	}

	FireParticle.prototype.update = function() {
		this.vx += (rand(0, 270) - 100) / 1000;
		this.vy -= this.life / 100;
		this.x += this.vx;
		this.y += this.vy;
		this.alpha = this.startAlpha * (this.life / this.startLife);
		this.radius = this.startRadius * (this.life / this.startLife);
		this.life -= this.decayRate;
		if (
			this.x > cw + this.radius ||
			this.x < -this.radius ||
			this.y > ch + this.radius ||
			this.y < -this.radius ||
			this.life <= this.decayRate
			) {
			this.reset();
		}
	};

	FireParticle.prototype.render = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
		ctx.lineWidth = this.lineWidth;
		ctx.fill();
		ctx.stroke();
	};

	var createParts = function() {
		if (!partsFull) {
			if (parts.length > partCount) {
				partsFull = true;
			} else {
				parts.push(new FireParticle());
			}
		}
	};

	var updateParts = function() {
		var i = parts.length;
		while (i--) {
			parts[i].update();
		}
	};

	var renderParts = function() {
		var i = parts.length;
		while (i--) {
			parts[i].render();
		}
	};

	var clear = function() {
		ctx.globalCompositeOperation = 'destination-out';
		ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
		ctx.fillRect(0, 0, cw, ch);
		ctx.globalCompositeOperation = 'lighter';
	};

	var loop = function() {
		window.requestAnimFrame(loop, c);
		clear();
		createParts();
		updateParts();
		renderParts();

	};

	window.requestAnimFrame = function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
			window.setTimeout(a, 1E3 / 60)
		}
	}();

	loop();

	//spinner

	$('.spinner .btn:first-of-type').on('click', function() {
		var btn = $(this);
		var input = btn.closest('.spinner').find('input');
		if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {    
			input.val(parseInt(input.val(), 10) + 1);
		} else {
			btn.next("disabled", true);
		}
	});
	$('.spinner .btn:last-of-type').on('click', function() {
		var btn = $(this);
		var input = btn.closest('.spinner').find('input');
		if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {    
			input.val(parseInt(input.val(), 10) - 1);
		} else {
			btn.prev("disabled", true);
		}
	});

	//blick shoulder
	$(document).ready(function () {
		setInterval(function(){
			$('#shoulder>span').addClass('blink_on');
			setTimeout(function(){$('#shoulder>span').removeClass('blink_on')},1900);
		},6500)
	});
	//blick arm
	$(document).ready(function () {
		setInterval(function(){
			$('#arm>span').addClass('blink_on');
			setTimeout(function(){$('#arm>span').removeClass('blink_on')},1500);
		},5000)
	});
	
	
	//calculate Sum
	// var CalulateSum = function(){
		// 	var oneGamePrice = 50;
		// 	var gamesQuantityInput = $(this).find('.games-quantity-input').val(); //количество покупаемых игр
		// 	var sum = samesQuantityInput * oneGamePrice; //Сума за покупку игр

		// };
		$('#foo').bind('click', function(){
			var oneGamePrice = 50;
			var gamesQuantityInput = document.getElementById('gamesQuantityInput');
			var amountOfBonusPoints = document.getElementById('amountOfBonusPoints').innerHTML; //1754
			var amountOfBuyingGames = gamesQuantityInput.value;
			var sum = amountOfBuyingGames * oneGamePrice;
			// $('.total-price').prepend(sum); //добавление параграфа суммы денег
			if (sum <= amountOfBonusPoints) {

				var availableGames = amountOfBuyingGames; //кол-во купленых игр
				$('.available-games').text(availableGames);
				var amountOfBonusPoints = amountOfBonusPoints - sum; // остаток бонусов после покупки игры
				$('#amountOfBonusPoints').text(amountOfBonusPoints);
				// alert(availableGames);
			}
			else {
				alert('Извини, но на твоём счету недостаточно средств :(');


			}
			if (availableGames >= 1){

				var playButton = document.getElementById('playButton');
				// var playButton = document.getElementsByClassName('.silver-button');


				$('#playButton').css('background', 'url(/img/button-gold-all.png)');
				$('#playButton').css('padding', '14px 58px');
				$('#playButton').css('cursor', 'pointer');
				// $('.gnom-text').empty();
				$('.gnom-text').text('Отличная работа! Теперь можешь приступать к поиску сокровищ!');




				// $('#playButton').removeClass('.silver-button');
				// $('#playButton').addClass('.gold-button');

				// alert('her');

			}
			else {
				// playButton.removeClass('.gold-button');
				// playButton.addClass('.silver-button');
			}

		});

		$('.chest-closed').bind('click', function(){
			// $(this).css('background', 'url(/img/sunduk-open-half-small.png)');
			$('.chest-closed').addClass('active-chest');
			setTimeout(function() {
				$('.active-chest').css('background', 'url(/img/sunduk-open-full-small.png)');
						
		}, 35);

			// alert('her');

		});



	});
