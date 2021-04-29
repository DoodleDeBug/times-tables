const two = document.querySelector(".t2");

const container = document.querySelector("#flex-container"); // aka main
const body = document.querySelector("body");

const subtitle = document.createElement("div"); // create subtitle
let subText = (subtitle.innerHTML = "2 Times Table");

const questionBox = document.createElement("div"); // create question box
const question = document.createElement("div"); // div for q
const input = document.createElement("input"); // input box
input.setAttribute("type", "text");

const footer = document.createElement("footer"); // create footer

const home = document.createElement("img"); // create home icon
home.setAttribute("src", "assets/home.svg");
home.setAttribute("alt", "Home Icon");

const questionNum = document.createElement("p"); // create q num tracker

let numbers = Array.from(Array(12).keys(), (n) => n + 1); // create array 1 to 12
// console.log(numbers);

two.addEventListener("click", function createPage() {
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

  body.appendChild(footer); // append footer

  footer.appendChild(home); //insert home icon
  home.classList.add("home"); // add class to home to apply css
  home.addEventListener("click", goHome);
  function goHome() {
    location.href = "./index.html"; // home button takes you back to index.html w/out js applied yet
  }

  footer.appendChild(questionNum); // insert q num
  questionNum.classList.add("questionNum"); // add class to questionNum to apply css
});

two.addEventListener("click", function startGame() {
  // start the game

  let type = Array.from(subText)[0];
  // console.log(type);

  let random = numbers[Math.floor(Math.random() * numbers.length)];
  // console.log(random);
  let q = `What is ${type} x ${random} ?`;
  // console.log(q);
  let answer = type * random;
  // console.log(answer);
  // let question = (questionBox.innerText = q);

  question.innerText = q;

  let qNum = 1;
  let currentQ = (questionNum.innerText = qNum); // set first q to num 1/12
  for (i = 0; i < numbers.length; i++) {
    qNum++;
    console.log(qNum);
  }
});
