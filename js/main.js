//Function for adding img elements
const addImage = (parentNode, source) => {
	const image = document.createElement('img');
	image.src = source;
	parentNode.appendChild(image);
}

//Function for adding players
const playerAdd = (parentNode, arrPlayers, numPlayers) => {
	//Function for adding p elements to div element
	const divPCreate = (parentNode, property) => {
		const divP = document.createElement('p');
		divP.innerHTML = property;
		parentNode.appendChild(divP);
	}
	//Function for creation of div element
	const elementCreate = (parentNode, playerData) => {
		const divElem = document.createElement('div');
		addImage(divElem, `./images/${playerData.image}`);
		divPCreate(divElem, `Name: ${playerData.name}`);
		divPCreate(divElem, `Last name: ${playerData.lastname}`);
		divPCreate(divElem, `Number: ${playerData.number}`);
		divPCreate(divElem, `Position: ${playerData.position}`);
		divPCreate(divElem, `Age: ${playerData.age}`);
		parentNode.appendChild(divElem);
	}

	for (let i = 0; i < numPlayers; i++) {
		let randomNum;
		let tempElement = [];
		if (i === 0) {
			//Adding goalkeepers
			if (numPlayers === 11) {
				randomNum = Math.round(Math.random());
				tempElement = arrPlayers.splice(randomNum, 1);
				elementCreate(parentNode, tempElement[0]);
			} else {
				tempElement = arrPlayers.splice(0, 1);
				elementCreate(parentNode, tempElement[0]);
			}
		} else {
			//Adding other players
			randomNum = Math.ceil(Math.random()*(arrPlayers.length - 1));
			tempElement = arrPlayers.splice(randomNum, 1);
			elementCreate(parentNode, tempElement[0]);
		}
		
	}
	
}

//Adding team logo
addImage(document.getElementsByTagName('header')[0], fcRad.logo);

//Adding team name
const main = document.getElementsByTagName('main');
const teamName = document.createElement('h1');
teamName.innerHTML = fcRad.team;
document.getElementsByTagName('body')[0].insertBefore(teamName, main[0]);

//Adding players
playerAdd(document.querySelector('.first-team'), fcRad.playersList, 11);
playerAdd(document.querySelector('.reserve'), fcRad.playersList, 4);

//BONUS
//Function for swapping of players
const swapPlayers = () => {
	const firstNum = Math.round(Math.random()*10);
	const secondNum = firstNum === 0 ? 0 : Math.ceil(Math.random()*3);
	const oldChild = document.querySelectorAll('.first-team div')[firstNum];
	const newChild = document.querySelectorAll('.reserve div')[secondNum];
	document.querySelector('.first-team').replaceChild(newChild, oldChild);
	if (secondNum === 3) {
		document.querySelector('.reserve').appendChild(oldChild);
	} else {
		document.querySelector('.reserve').insertBefore(oldChild, 
			document.querySelectorAll('.reserve div')[secondNum]);
	}
}

setInterval(swapPlayers, 60*1000);