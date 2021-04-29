const two = document.querySelector(".t2");

const container = document.querySelector("#flex-container"); // aka main
const body = document.querySelector("body");

const subtitle = document.createElement("div"); // create subtitle
subText = "2 Times Table";
subtitle.innerHTML = subText;

const questionBox = document.createElement("div"); // create question box
const question = document.createElement("div"); // create div for q
const input = document.createElement("input"); // create input box
input.setAttribute("type", "text");
input.setAttribute("id", "userInput");
const button = document.createElement("div"); // create next button
button.innerText = "Next";
button.classList.add("button"); // add class to button to apply css

const footer = document.createElement("footer"); // create footer

const home = document.createElement("img"); // create home icon
home.setAttribute("src", "assets/home.svg");
home.setAttribute("alt", "Home Icon");

const questionNum = document.createElement("p"); // create q num tracker
let qNum = 1;

let numbers = Array.from(Array(12).keys(), (n) => n + 1); // create array 1 to 12
// console.log(numbers);

function goHome() {
  location.href = "./index.html"; // home button takes you back to index.html w/out js applied yet
}

function createPage() {
  // creates the quizpage layout

  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }

  container.classList.add("quizpage"); // add class to main to apply css

  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", "t2"); // add class to subtitle to apply css

  container.appendChild(questionBox); // append question box
  questionBox.classList.add("questionBox", "t2"); // add class to questionbox to apply css
  questionBox.appendChild(question); // add the q before the input
  input.classList.add("input");
  questionBox.appendChild(input); // add input onto page
  questionBox.appendChild(button); // add button onto questionBox
  body.appendChild(footer); // append footer

  footer.appendChild(home); //insert home icon
  home.classList.add("home"); // add class to home to apply css
  home.addEventListener("click", goHome);

  footer.appendChild(questionNum); // insert q num
  questionNum.classList.add("questionNum"); // add class to questionNum to apply css
}

function createResults() {
  // results page layout
  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }
  container.classList.add("results_container"); // add class to main to apply css

  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", "t2"); // add class to subtitle to apply css
  subtitle.innerHTML = `${subText} - SCORES`;
  footer.removeChild(questionNum); // remove q num
}

let q = "";

function playRound() {
  // start the game

  let type = Array.from(subText)[0];
  // // console.log(type);

  let random = numbers[Math.floor(Math.random() * numbers.length)];
  // // // console.log(random);
  q = `${type} x ${random}`;
  let fullQ = `What is ${q}?`;
  // // console.log(q);
  let actualAnswer = type * random;
  // // console.log(answer);

  if (qNum <= 12) {
    question.innerText = fullQ;
    questionNum.innerText = qNum;
    // console.log(`you are on question ${qNum} out of 12`);
    qNum++;
  } else if (qNum > 12) {
    createResults();
    console.log("game over");
  }
}

two.addEventListener("click", createPage);
two.addEventListener("click", playRound);

button.addEventListener("click", function nextQ() {
  let answer = input.value;
  let fullAns = `${q} = ${answer}`;
  console.log(fullAns);
  input.value = "";
  playRound();
});
