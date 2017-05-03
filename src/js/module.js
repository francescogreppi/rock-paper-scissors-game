export default class rockPaperScissors {
	constructor(domUtilities){
		this.domUtilities = domUtilities;
		this.state = {
			player1: null,
			player2: null,
			gameMode: 'gameModeHuman'
		}
		this.optionList = ['rock','paper','scissors'];
		this.evaluationModel = {
			rock: ['scissors', 'paper', 'rock'],
			paper: ['rock', 'scissors', 'paper'],
			scissors: ['paper', 'rock', 'scissors'],
		}
		
	}
	setGameMode(value){
		this.domUtilities.handleNavigation(value);
		this.state.gameMode = value;
	}
	setHumanSelection(selectedValue){
		this.domUtilities.handleCards('player1', selectedValue);
		this.state.player1 = selectedValue;
	}
	startGame(){
		this.domUtilities.showButton('start', false);
		this.counter();
	}
	counter(){
		let i = 0;
		const timer = ()=> {
			i++;
			document.getElementById("gameState").innerHTML = i;
			if (i > 3) {
				window.clearInterval(counting);
				this.setComputerChoice(this.state.gameMode === 'gameModeComputer');
			}
		}
		timer();
		const counting = setInterval(timer, 1000);
	}
	setComputerChoice(isVsComputer){
		if (isVsComputer){
			this.state.player1 = this.randomChoice();
			this.domUtilities.handleCards('player1', this.state.player1);
		}
		this.state.player2 = this.randomChoice();
		this.domUtilities.handleCards('player2', this.state.player2);
		const result = this.evaluateGame();
		this.domUtilities.showResult(result);
	}
	randomChoice(){
		return this.optionList[Math.floor(Math.random() * this.optionList.length)];
	}
	evaluateGame(){
		return this.evaluationModel[this.state.player1].indexOf(this.state.player2);
	}
	restartGame(){
		this.domUtilities.resetGameBoard(this.state.gameMode === 'gameModeHuman');
		this.state.player1 = null;
		this.state.player2 = null;
	}
}
