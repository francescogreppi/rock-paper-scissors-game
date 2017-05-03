import rockPaperScissors from '../src/js/module';

describe('rock paper scissors', () => {
	let instance;
	//mock dom utitlities instance
	const domUtilities = {
		handleNavigation: ()=>{return true},
		handleCards: ()=>{return true},
		setGameBoard: ()=>{return true},
		switchClass: ()=>{return true},
		removeClass: ()=>{return true},
		addClass: ()=>{return true},
		disablePlayer1Cards: ()=>{return true},
		attachString: ()=>{return true},
		showButton: ()=>{return true},
		disableButton: ()=>{return true},
		showResult: ()=>{return true},
		resetGameBoard: ()=>{return true}
	};
	beforeEach(()=>{
        instance = new rockPaperScissors(domUtilities);
	})
	it('should instantiate an instance', () => {
		// assert
		expect(instance).to.be.an('object');
	});
	it('should have the expected initial state values', () => {
		//assert
		expect(instance.domUtilities).to.be.an('object');
		expect(instance.state).to.be.an('object');
		expect(instance.state.player1).to.be.a('null');
		expect(instance.state.player2).to.be.a('null');
		expect(instance.state.gameMode).to.equal('gameModeHuman');
		expect(instance.optionList).to.be.an('array');
		expect(instance.evaluationModel).to.be.an('object');
	});
	it('should set initial state and not changing preselected game mode, if restart', () => {
		//arrange
		instance.state = {
			player1: 'rock',
			player2: 'scissors',
			gameMode: 'gameModeComputer'
		}
		//act
		instance.restartGame();
		//assert
		expect(instance.state).to.be.an('object');
		expect(instance.state.player1).to.be.a('null');
		expect(instance.state.player2).to.be.a('null');
		expect(instance.state.gameMode).to.equal('gameModeComputer');
	});
	it('sets the game mode',()=>{
		//arrange
		instance.state = {
			player1: null,
			player2: null,
			gameMode: 'gameModeHuman'
		}
		//act
		instance.setGameMode('gameModeComputer');
		//assert
		expect(instance.state.gameMode).to.equal('gameModeComputer');
	});
	it('should set the player selection',()=>{
		//arrange
		instance.state = {
			player1: null,
			player2: null,
			gameMode: 'gameModeHuman'
		}
		//act
		instance.setHumanSelection('rock');
		//assert
		expect(instance.state.player1).to.equal('rock');
		expect(instance.state.player2).to.equal(null);
	});
	it('should set player2 choice randomly if gameModeHuman', ()=>{
		//arrange
		instance.state = {
			player1:'rock',
			player2:null,
			gameMode:'gameModeHuman'
		}
		//act
		instance.setComputerChoice(instance.state.gameMode === 'gameModeHuman');
		//assert
		expect(instance.state.player2).to.be.ok;
	});
	it('should set player1 and player2 choice if gameModeComputer', ()=>{
		//arrange
		instance.state = {
			player1:null,
			player2:null,
			gameMode:'gameModeComputer'
		}
		//act
		instance.setComputerChoice(instance.state.gameMode === 'gameModeComputer');
		
		//assert
		expect(instance.state.player1).to.be.ok;
		expect(instance.state.player2).to.be.ok;
	});
	it('should return a value when random choice method is called',()=>{
		//act
		const value = instance.randomChoice();
		//arrange
		expect(value).to.be.ok;
	});
	it('should evaluate according to the evaluation model defined',()=>{
		//arrange
		instance.state = {
			player1:'rock',
			player2:'scissors'
		}
		//act
		const result = instance.evaluateGame();
		//arrange
		expect(result).to.equal(0);
	})
});