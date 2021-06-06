// ****************get all the quiz tiles
const two = document.querySelector(".t2");
const three = document.querySelector(".t3");
const four = document.querySelector(".t4");
const five = document.querySelector(".t5");
const six = document.querySelector(".t6");
const seven = document.querySelector(".t7");
const eight = document.querySelector(".t8");
const nine = document.querySelector(".t9");
const ten = document.querySelector(".t10");
const eleven = document.querySelector(".t11");
const twelve = document.querySelector(".t12");
const rando = document.querySelector(".t1");

//get main body bits
const container = document.querySelector("#flex-container"); // aka main
const body = document.querySelector("body");

const footer = document.createElement("footer"); // create footer

const home = document.createElement("img"); // create home icon
home.setAttribute("src", "assets/home.svg");
home.setAttribute("alt", "Home Icon");
home.classList.add("home"); // add class to home to apply css
home.addEventListener("click", goHome);

// game/ add event listeners to all tiles
const tableList = [
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  rando,
];

for (let i = 0; i < tableList.length; i++) {
  tableList[i].addEventListener("click", getTable);
  tableList[i].addEventListener("click", createPage);
  tableList[i].addEventListener("click", playRound);
}

//*************things i cant put in create-page coz of scope issues
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
let subText;
let tableClass;

//****variables */
const perfect = "You got full marks! You are amazing!!!! Well Done!";
const goodMsg = "Well Done!";
const badMsg = "You Need To Revise!";
const correct = `<img src="./assets/tick.svg" alt="Correct" class="tick">`;
const incorrect = `<img src="./assets/cross.svg" alt="Incorrect" class="cross">`;

//***************************FUNCTIONS
function goHome() {
  location.href = "./index.html"; // home button takes you back to index.html w/out js applied yet
}

let enterNext = function (e) {
  if (e.key === "Enter") {
    nextQ();
  }
};

function getTable(e) {
  subText = e.target.innerText;

  if (subText == "Random Quiz") {
    tableClass = 1;
  } else if (Array.from(subText).length > 13) {
    tableClass = Array.from(subText).slice(0, 2).join("");
  } else {
    tableClass = Array.from(subText)[0];
  }
}

function createPage() {
  // creates the quizpage layout

  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }

  container.classList.add("quizpage"); // add class to main to apply css

  subtitle.innerHTML = subText;
  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", `t${tableClass}`); // add class to subtitle to apply css

  const questionBox = document.createElement("div"); // create question box
  container.appendChild(questionBox); // append question box
  questionBox.classList.add("questionBox", `t${tableClass}`); // add class to questionbox to apply css
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

  let random = numbers[Math.floor(Math.random() * numbers.length)];
  let random2 = numbers[Math.floor(Math.random() * numbers.length)];

  if (tableClass == 1) {
    q = `${random} x ${random2}`;
    actualAnswer = random * random2;
  } else {
    q = `${tableClass} x ${random}`;
    actualAnswer = tableClass * random;
  }

  let fullQ = `What is ${q}?`;

  // actualAnswer = tableClass * random;

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
  let reg = /^(?:[1-9]\d*|\d)$/;
  if (input.value == "") {
    alert("You must enter an answer");
  } else if (!reg.test(input.value)) {
    alert("You must enter a number");
  } else {
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
        window["q" + qNum].mark = correct;
        scores++;
      } else {
        window["q" + qNum].mark = incorrect;
      }
      results.push(window["q" + qNum]);
    }
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
  subtitle.classList.add("subtitle", `t${tableClass}`); // add class to subtitle to apply css
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
  scores > 6 ? (msg.innerText = goodMsg) : (msg.innerText = badMsg);
  scores == 12 ? (msg.innerText = perfect) : null;
  resultsMessage.appendChild(msg);

  document.removeEventListener("keypress", enterNext);
}
