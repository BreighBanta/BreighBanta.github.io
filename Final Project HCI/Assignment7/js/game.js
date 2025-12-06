const spanPlayer=document.querySelector(".player");
const grid=document.querySelector(".grid");
const timer=document.querySelector(".timer");

const characters=[
	'appaloosa.jpg',
	'bay.jpg',
	'black.jpg',
	'buckskin.jpeg',
	'grey.jpeg',
	'grulla.jpeg',
	'paint.jpg',
	'palomino.jpg',
	'roan.jpeg',
	'white.jpg'
];

let firstCard="";
let secondCard="";
let lockboard = false;
let loop;
//let matchCount = 0;



const startTimer=()=>{
	 loop=setInterval(()=>{
		currentTime=+timer.innerHTML;
		timer.innerHTML=currentTime+1;
	}, 
	1000);
};

startTimer();


function speakAddress(address) {
	if ('speechSynthesis' in window) {
		var speech = new SpeechSynthesisUtterance(address);
		speech.lang = 'en-US'; // Set the language to English
		window.speechSynthesis.speak(speech);
		} else {
		console.log("Speech synthesis not supported in this browser.");
    }
}

speakAddress("Welcome to the card memory game, find the pair to each horse coat color");

const creatElement=(tag,className)=>{
	const element=document.createElement(tag);
	element.className=className;
	return element;
};

const creatCard=(characters)=>{
	const card=creatElement('div','card');
	const front=creatElement('div','face front');
	const back=creatElement('div','face back');
	front.style.backgroundImage=`url('../images/${characters}')`;
	card.appendChild(front);
	card.appendChild(back);
	card.addEventListener('click',revealCard);
	card.setAttribute('data-character',characters);//Note 13
	return card;
};

const revealCard=(event)=>{
	//console.log("I am clicked!");
	const target=event.target;

	
	if (target.parentNode.className.includes('reveal-card')){
		return;
	}
	
	if (firstCard===''){
		target.parentNode.classList.add('reveal-card');
		firstCard=target.parentNode;
		const name = firstCard.getAttribute('data-character');
		showAndSpeakName(name);
		return;

	}else if (secondCard===''){
		target.parentNode.classList.add('reveal-card');
		secondCard=target.parentNode;

		const name = secondCard.getAttribute('data-character');
		showAndSpeakName(name);
		
		setTimeout(()=>checkCards(),2000);
	}
	
};

//added function that displays th name of the coat and speaks the name out loud
//had trouble with syntax and the file extensions shwoing up
function showAndSpeakName(name) {
    	const cleanName = name.replace(/\.[^/.]+$/, "");//used chatgpt to find syntax that would remove the file extensions from the name
    	document.getElementById("coat-name").textContent = cleanName;

    	speakAddress(cleanName);

	}
const loadGame=()=>{
	const repeatedCards=[...characters,...characters];//Note 14
	const shuffledArray=repeatedCards.sort(()=>Math.random()-0.5);//Note 15
	shuffledArray.forEach((characters)=>{//Note 16
		const card=creatCard(characters);
		grid.appendChild(card);
	});
};

loadGame();

let matchCount=0;

const checkCards=()=>{
	const firstCharacter=firstCard.getAttribute('data-character');
    const secondCharacter=secondCard.getAttribute('data-character');
	
	if (firstCharacter===secondCharacter){
		firstCard.firstChild.classList.add('disabled-card');
		secondCard.firstChild.classList.add('disabled-card');
		matchCount=matchCount+2;

		if (matchCount === 20) {

			speakAddress("Good job! Restarting game...");
			setTimeout(() => {
				location.reload();
			}, 500);
		}
		
		firstCard="";
		secondCard="";
	}else{
		setTimeout( ()=>{
				firstCard.classList.remove('reveal-card');
				firstCard="";
		
				secondCard.classList.remove('reveal-card');
				secondCard="";	
			}, 1000 
		);

	}
	
};









