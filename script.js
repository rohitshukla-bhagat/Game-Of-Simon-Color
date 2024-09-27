// Creating the variable using DOM
let mainBox = document.querySelector(".boxes");
let level = document.querySelector(".level");
let errorMsg = document.querySelector(".errorMsg");
let highScore = document.querySelector(".highScore");
const resBtn = document.querySelector(".resBtn");

// Creating array for storing the sequence of blinking and clicking
const boxArray = [];
const checkArrayCom = [];
let checkArrayUser = [];
let count1 = 0;
let gameStartCount = 0;
let highScoreVar = 0 ;

// Add the all 4 boxes into an array 
for (let i = 0; i < 4; i++) {
  boxArray.push(mainBox.children[i]);
}

// Access the previousElementSibling of mainBox for preventing the event delegation
const mainBoxSibling = mainBox.previousElementSibling;

// This function show the error when user sequence gone wrong and also play a audio effect
const showError = () => {
  const errorSound = new Audio("assets/wrong.mp3");
  errorSound.play();
  if (level.innerText.startsWith("Press")) {
    if (!errorMsg.firstElementChild) {
      const errorElem = document.createElement("p");
      errorElem.innerText = "Firstly Please Start The Game !";
      errorElem.classList.add("errorElem");
      errorMsg.append(errorElem);
      mainBox.style.boxShadow = "0px 0px 10px red";
      mainBox.style.border = "1px solid red";
      checkArrayUser.length = 0;
    }
  } else {
    if (!errorMsg.firstElementChild) {
      const errorElem = document.createElement("p");
      errorElem.innerText = "Oops ! You Are Wrong !";
      errorElem.classList.add("errorElem");
      errorMsg.append(errorElem);
      mainBox.style.boxShadow = "0px 0px 10px red";
      mainBox.style.border = "1px solid red";
      let levelText = level.innerText.split(" ");
      level.innerHTML = `Your Score : ${levelText[1]} ! Press <span style="color: yellow;"> S </span> Or Click "<span style="color: yellow;">Start</span>" Button For Play Again !`;
      if(highScoreVar <= Number(levelText[1])){
        highScoreVar = Number(levelText[1]);
      }
      // Here the logic for showing the Highest Score of the user
      if(highScore.firstElementChild){
        highScore.firstElementChild.remove();
        const highScoreElem = document.createElement("p");
        highScoreElem.innerText = `Highest Score : ${highScoreVar}`;
        highScoreElem.classList.add("highScore");
        highScore.append(highScoreElem);
      }else{
        const highScoreElem = document.createElement("p");
        highScoreElem.innerText = `Highest Score : ${highScoreVar}`;
        highScoreElem.classList.add("highScore");
        highScore.append(highScoreElem);
      }
      // After wrong click all the array stores the sequence of colors being empty
      checkArrayCom.length = 0;
      checkArrayUser.length = 0;
      gameStartCount = 0;
    }
  }
};

// This function is based on the click functionality of the user
const clickFunc = () => {
  mainBox.addEventListener("click", (event) => {
    if (event.target.previousElementSibling != mainBoxSibling) {
      checkArrayUser.push(event.target.getAttribute("number"));
      if (checkArrayUser.length === checkArrayCom.length) {
        count1 = 0;
        for (let i = 0; i < checkArrayCom.length; i++) {
          if (checkArrayCom[i] === checkArrayUser[i]) {
            count1++;
          }
        }
        if (count1 === checkArrayCom.length) {
          const correctSound = new Audio("assets/correct.mp3");
          correctSound.play();
          checkArrayUser = [];
          let levelText = level.innerText.split(" ");
          levelText[1] = Number(levelText[1]) + 1;
          let newLevel = `${levelText[0]} <span style = "color : yellow;">${levelText[1]}</span>`;
          level.innerHTML = newLevel;
          setTimeout(mainFunc, 800);
        } else {
          showError();
        }
      } else {
        for (let i = 0; i < checkArrayUser.length; i++) {
          if (checkArrayUser[i] != checkArrayCom[i]) {
            showError();
          }
        }
      }
    }
  });
};

// This fucntion is for the computer (based on random number) blink functionality
const comBlink = () => {
  let random = Math.floor(Math.random() * 4);
  let previousColor = window.getComputedStyle(boxArray[random]).backgroundColor;
  boxArray[random].style.backgroundColor = "white";
  boxArray[random].style.boxShadow = "0px 0px 10px white";
  setTimeout(() => {
    boxArray[random].style.backgroundColor = previousColor;
    boxArray[random].style.boxShadow = "0px 0px 0px ";
  }, 200);
  checkArrayCom.push(boxArray[random].getAttribute("number"));
};

// This is the main function from where all the code start executing 
const mainFunc = () => {
  count1 = 0;
  setTimeout(() => {
    comBlink();
  }, 800);
};

// This is for when user press the S letter key for starting the game
document.addEventListener("keydown", (event) => {
  if (event.key == "S" || event.key == "s") {
    gameStartCount++;
    if (gameStartCount == 1) {
      level.innerHTML = `Level <span style = "color : yellow;">1</span>`;
      mainBox.style.boxShadow = "0px 0px 10px white";
      if (errorMsg.firstElementChild) {
        errorMsg.firstElementChild.remove();
      }
      mainBox.style.border = "1px solid white";
      mainFunc();
    }
  }
});
// Calling the user click function 
clickFunc();

// This is for when user click on the Start button for play the game at the bottom 
resBtn.addEventListener("click", () => {
  gameStartCount++;
  if (gameStartCount == 1) {
    level.innerHTML = `Level <span style = "color : yellow;">1</span>`;
    mainBox.style.boxShadow = "0px 0px 10px white";
    mainBox.style.border = "1px solid white";
    if (errorMsg.firstElementChild) {
      errorMsg.firstElementChild.remove();
    }
    setTimeout(mainFunc, 800);
  }
});