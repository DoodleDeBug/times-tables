// ****************get all the quiz tiles
const two = document.querySelector(".t2");

//get main body bits
const container = document.querySelector("#flex-container"); // aka main
const body = document.querySelector("body");

const footer = document.createElement("footer"); // create footer

const home = document.createElement("img"); // create home icon
home.setAttribute("src", "assets/home.svg");
home.setAttribute("alt", "Home Icon");
home.classList.add("home"); // add class to home to apply css
home.addEventListener("click", goHome);

// game
two.addEventListener("click", createPage);
two.addEventListener("click", playRound);

//*************things i cant put in create page coz of scope issues
const subtitle = document.createElement("div"); // create subtitle
const question = document.createElement("div"); // create div for q
const input = document.createElement("input"); // create input box

const questionNum = document.createElement("p"); // create q num tracker
let qNum = 1;

let numbers = Array.from(Array(12).keys(), (n) => n + 1); // create array 1 to 12

let q = "";
let actualAnswer = "";
let results = [];
let scores = 0;

const goodMsg = "Well Done!";
const badMsg = "You Need To Revise!";

//***************************FUNCTIONS
function goHome() {
  location.href = "./index.html"; // home button takes you back to index.html w/out js applied yet
}

let enterNext = function (e) {
  if (e.key === "Enter") {
    nextQ();
  }
};

function createPage() {
  // creates the quizpage layout

  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }

  container.classList.add("quizpage"); // add class to main to apply css

  subText = "2 Times Table";
  subtitle.innerHTML = subText;
  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", "t2"); // add class to subtitle to apply css

  const questionBox = document.createElement("div"); // create question box
  container.appendChild(questionBox); // append question box
  questionBox.classList.add("questionBox", "t2"); // add class to questionbox to apply css
  questionBox.appendChild(question); // add the q before the input

  input.setAttribute("type", "text");
  input.setAttribute("id", "userInput");
  input.classList.add("input");
  questionBox.appendChild(input); // add input onto page

  const button = document.createElement("div"); // create next button
  button.innerText = "Press Enter To Continue";
  button.classList.add("button"); // add class to button to apply css
  questionBox.appendChild(button); // add button onto questionBox

  body.appendChild(footer); // append footer
  footer.appendChild(home); //insert home icon

  footer.appendChild(questionNum); // insert q num
  questionNum.classList.add("questionNum"); // add class to questionNum to apply css

  document.addEventListener("keypress", enterNext);
}

function playRound() {
  // start the game

  let type = Array.from(subText)[0];

  let random = numbers[Math.floor(Math.random() * numbers.length)];

  q = `${type} x ${random}`;
  let fullQ = `What is ${q}?`;

  actualAnswer = type * random;

  if (qNum <= 12) {
    question.innerText = fullQ;
    questionNum.innerText = `${qNum}/12`;
    qNum++;
  } else if (qNum > 12) {
    createResults();
  }
}

//gathering results of each answer
function nextQ() {
  let answer = input.value;
  let fullAns = `${q} = ${answer}`;

  input.value = "";
  mark();
  playRound();

  function mark() {
    // mark the answer and store it in a variable with full ans and whether correct or not
    window["q" + qNum] = {
      ques: qNum,
      ans: fullAns,
    };
    if (answer == actualAnswer) {
      window["q" + qNum].mark = "correct";
      scores++;
    } else {
      window["q" + qNum].mark = "wrong";
    }
    results.push(window["q" + qNum]);
  }
}

// results page layout
function createResults() {
  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }

  container.classList.remove("quizpage");
  container.classList.add("results-page"); // add class to main to apply css

  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", "t2"); // add class to subtitle to apply css
  subtitle.innerHTML = `${subText} - SCORES`;

  footer.removeChild(questionNum); // remove q num

  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add("results-container");
  container.appendChild(resultsContainer);
  for (let i = 0; i < results.length; i++) {
    const div = document.createElement("div");
    div.classList.add("result-tile");
    div.innerHTML = `<p> <b>Q${results[i].ques - 1}.</b> ${results[i].ans} ${
      results[i].mark
    }</p>`;
    resultsContainer.appendChild(div);
  }

  const resultsMessage = document.createElement("div");
  resultsMessage.classList.add("results-message");
  container.appendChild(resultsMessage);

  const score = document.createElement("p");
  score.innerText = `Your Score: ${scores}/12`;
  resultsMessage.appendChild(score);

  const msg = document.createElement("p");
  scores > 5 ? (msg.innerText = goodMsg) : (msg.innerText = badMsg);
  resultsMessage.appendChild(msg);

  document.removeEventListener("keypress", enterNext);
}
