let interval;
class Game{
	constructor(){
		this.playerScore = 0;
		this.computerScore = 0;
		this.playerPosX = 0;
		this.playerPosY = 125;
		this.computerPosX = 990;
		this.computerPosY = 125;
		this.ballX = 505;
		this.ballY = 250;
		this.ballMoveX = -10;
		this.ballMoveY = 0;
		this.bg = new Image();
		this.bg.src = "19231_space-game-background.jpg";
		this.sound = new Audio('pong.mp3');
		this.tableSound = new Audio('pong1.mp3');
		this.fail = new Audio('Powerup5.wav');
		this.win = new Audio("Powerup26.wav")
		this.countDown = new Audio('Countdown 5 Seconds HD.mp3')
		this.over = new GameOver;
		this.show();
		this.showScore();
		this.move();
		setTimeout(()=>{
			this.countDown.play();
		}, 500)
		setTimeout(()=>{
			interval = setInterval(()=>{
				this.show();
				this.showScore();
				this.ballX += this.ballMoveX;
				this.ballY += this.ballMoveY;
				// this.computerPosY = this.ballY - 100;
				if (this.ballX - 20 <= this.playerPosX && this.ballY >= this.playerPosY && this.ballY <= this.playerPosY + 100){
					this.ballMoveX = 10;
					this.ballMoveY = -Math.random()*8;
					this.sound.play();
				}
				if (this.ballX - 20 <= this.playerPosX && this.ballY >= this.playerPosY + 100 && this.ballY <= this.playerPosY + 200){
					this.ballMoveX = 10;
					this.ballMoveY = Math.random()*8;
					this.sound.play();
				}
				if (this.ballX + 20 >= this.computerPosX && this.ballY >= this.computerPosY && this.ballY <= this.computerPosY + 100){
					this.ballMoveX = -10;
					this.ballMoveY = -Math.random()*8;
					this.sound.play();
				}
				if (this.ballX + 20 >= this.computerPosX && this.ballY >= this.computerPosY + 100 && this.ballY <= this.computerPosY + 200){
					this.ballMoveX = -10;
					this.ballMoveY = Math.random()*8;
					this.sound.play();
				}
				if (this.ballY + 10 >= 500){
					this.ballMoveY = -Math.random()*8;
					this.tableSound.play();
				}
				if (this.ballY - 10 <= 0){
					this.ballMoveY = Math.random()*8;
					this.tableSound.play();
				}
				if (this.ballX <= 0){
					this.computerScore++;
					this.ballX = 505;
					this.ballY = 250;
					this.ballMoveY = -Math.random()*8;
					this.ballMoveX = 10;
					this.fail.play();
				}
				if (this.ballX > 990){
					this.playerScore++;
					this.ballX = 505;
					this.ballY = 250;
					this.ballMoveY = +Math.random()*8;
					this.ballMoveX = -10;
					this.win.play();
				}
				// this.ballY -= 10;

				
			}, 15)
		}, 3000)
		


	}

	move(){
		// canvas.addEventListener("mousemove", (e)=>{
		// 	this.playerPosY = e.clientY - 100;
		// })
		window.addEventListener('keydown', (e)=>{
			if (e.key == "w" && this.playerPosY - 40 > 0){
				this.playerPosY -= 40;
				console.log()
			}
			if (e.key == "s" && this.playerPosY + 205 < 500){
				this.playerPosY += 40;
			}

			if (e.key == "ArrowUp" && this.computerPosY - 40 > 0){
				this.computerPosY -= 40;
				console.log()
			}
			if (e.key == "ArrowDown" && this.computerPosY + 205 < 500){
				this.computerPosY += 40;
			}
		})
	}


	show(){
		// Background
		Game.ctx.beginPath();
		Game.ctx.fillStyle = "#0f0f0f";
		Game.ctx.fillRect(0, 0, 1000, 500)

		// Game.ctx.drawImage(this.bg,0,0, 1000, 500);

		//Center Line

		Game.ctx.beginPath();
		Game.ctx.fillStyle = "white";
		Game.ctx.strokeStyle = "black";
		Game.ctx.fillRect(500, 0, 10, 500);
		Game.ctx.lineWidth = 5;
		// Game.ctx.strokeRect(500, 0, 10, 500);

		//Create player and computer platforms

		Game.ctx.beginPath();
		Game.ctx.shadowColor = "lime";
		Game.ctx.shadowBlur = 15;
		Game.ctx.fillStyle = "lime";
		Game.ctx.strokeStyle = "black";
		Game.ctx.fillRect(this.playerPosX, this.playerPosY, 10, 200);
		// Game.ctx.strokeRect(this.playerPosX, this.playerPosY, 10, 200);
		Game.ctx.fillRect(this.computerPosX, this.computerPosY, 10, 200);
		// Game.ctx.strokeRect(this.computerPosX, this.computerPosY, 10, 200);

		//Create ball
		let img = document.querySelector("img")
		Game.ctx.beginPath();
		Game.ctx.fillStyle = "lightgreen";
		Game.ctx.arc(this.ballX, this.ballY, 20, 0, Math.PI*2)
		Game.ctx.fill();
		// Game.ctx.drawImage(img, this.ballX, this.ballY, 20, 20);



	}

	showScore(){
		Game.ctx.font = "48px sans-serif";
		Game.ctx.fillStyle = "white"
		Game.ctx.fillText(this.playerScore, 200, 50)
		Game.ctx.fillText(this.computerScore, 800, 50)
	}
}

Game.ctx = canvas.getContext('2d');

class GameOver{
	end(){
		Game.ctx.font = "70px sans-serif";
		Game.ctx.fillStyle = 'red';
		Game.ctx.textAlign = "center";
		Game.ctx.fillText ("Game Over!", canvas.width/2, canvas.height/3);

		clearInterval(interval);
	}
}
let x = new Game;

