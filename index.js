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

let q = "";
let actualAnswer = "";

function playRound() {
  // start the game

  let type = Array.from(subText)[0];
  // // console.log(type);

  let random = numbers[Math.floor(Math.random() * numbers.length)];
  // // // console.log(random);
  q = `${type} x ${random}`;
  let fullQ = `What is ${q}?`;
  // // console.log(q);
  actualAnswer = type * random;
  // console.log(actualAnswer);

  if (qNum <= 12) {
    question.innerText = fullQ;
    questionNum.innerText = qNum;
    qNum++;
  } else if (qNum > 12) {
    console.log("game over");
    createResults();
  }
}

two.addEventListener("click", createPage);
two.addEventListener("click", playRound);

//gathering results

let results = [];

button.addEventListener("click", function nextQ() {
  let answer = input.value;
  let fullAns = `${q} = ${answer}`;
  // console.log(fullAns);

  function mark() {
    // mark the answer and store it in a variable with full ans and whether correct or not
    window["q" + qNum] = {
      ans: fullAns,
    };
    if (answer == actualAnswer) {
      window["q" + qNum].mark = "correct";
      // console.log("correct");
    } else {
      window["q" + qNum].mark = "wrong";
      // console.log("wrong");
    }

    // console.log(window["q" + qNum]);

    results.push(window["q" + qNum]);
  }

  mark();
  input.value = "";
  playRound();
});

console.log(results);

function createResults() {
  // results page layout
  while (container.firstChild) {
    // removes all the tiles
    container.removeChild(container.lastChild);
  }

  container.classList.remove("quizpage");
  container.classList.add("results_container"); // add class to main to apply css

  container.appendChild(subtitle); // append subtitle
  subtitle.classList.add("subtitle", "t2"); // add class to subtitle to apply css
  subtitle.innerHTML = `${subText} - SCORES`;
  footer.removeChild(questionNum); // remove q num

  for (let i = 0; i < results.length; i++) {
    for (let key in results[i]) {
      const div = document.createElement("div");
      div.innerText = `${results[i][key]}`;
      container.appendChild(div);
    }
  }
}
