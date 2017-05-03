export default class domUtilities {
	handleNavigation(elementId){
		this.setGameBoard(elementId === 'gameModeHuman');
		this.switchClass('nav','a','active', elementId);
	}
	handleCards(containerId, value){
		if(containerId === 'player1'){
			//allow user to click on start button after card selection is done
			this.disableButton('start', false);
		}
		//determine the card id, to be used in switchClass method
		const elementId = containerId+'-'+value;
		this.switchClass(containerId, 'button','active', elementId);
	}
	switchClass(containerId, htmlElement, className, elementId){
		//given a containerId, a className, an htmElement type and an elementId
		//loop through the elements, remove the specified className if any
		this.removeClass(containerId, htmlElement, className);
		//add the className to the passed elementId
		this.addClass(elementId,className);
	}
	removeClass(containerId, htmlElement, className){
		const elements = document.querySelectorAll('#'+containerId+' '+htmlElement);
		for(let element of elements){
			element.classList.remove(className);
		}
	}
	addClass(elementId, className){
		document.getElementById(elementId).classList.add(className);
	}
	setGameBoard(isHuman) {
		//display label according to game mode
		document.getElementById('player-mode').innerHTML = (isHuman) ? 'Player 1 - You' : 'Player 1 - Computer';
		//enable/disable cards interaction
		this.disablePlayer1Cards(!isHuman);
		// disable start button if human - it will be enabled after card selection
		this.disableButton('start', isHuman);
		// if game mode computer remove and pre-selected card
		if (!isHuman){
			this.removeClass('player1','button','active');
		}
	}
	disablePlayer1Cards(value){
		const buttons = document.querySelectorAll('#player1 button');
		for(let button of buttons){
			button.disabled = value;
		}
	}
	showResult(result){
		switch(result){
			case 0:
				this.attachString('Player 1 wins!');
				break;
			case 1:
				this.attachString('Player 2 wins!');
				break;
			case 2:
				this.attachString('Tie!');
				break;
			default:
				return;
		}
		this.showButton('restart', true);
	}
	attachString(message){
		document.getElementById('gameState').innerHTML = message;
	}
	showButton(id,show){
		let property = (show) ? 'inline-block' : 'none';
		document.getElementById(id).style.display = property;
	}
	disableButton(id, disableButton){
		document.getElementById(id).disabled = (disableButton) ? true : false;
	}
	resetGameBoard(isHuman){
		document.getElementById('gameState').innerHTML = '';
		if(isHuman){
			this.disableButton('start', true)
		}
		this.removeClass('player1','button','active');
		this.removeClass('player2','button','active');
		this.showButton('restart', false);
		this.showButton('start', true);
	}
}
