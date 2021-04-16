
const two = document.querySelector('.t2');

const container = document.querySelector('#flex-container'); // aka main
const body = document.querySelector('body');

const subtitle = document.createElement('div'); // create subtitle
let subText = subtitle.innerHTML = '2 Times Table';

const questionBox = document.createElement('div'); // create question box
let question = questionBox.innerHTML = '2x2';

const footer = document.createElement('footer'); // create footer

const home = document.createElement('img'); // create home icon
home.setAttribute('src', 'assets/iconfinder_-_Home-House-_3844470.svg');
home.setAttribute('alt', 'Home Icon');

const questionNum = document.createElement('p');
let currentQ = questionNum.innerHTML = '1/12'


two.addEventListener('click', function startGameTwo(){
console.log('selected two times table');
while (container.firstChild) { // removes all the tiles
    container.removeChild(container.lastChild);
  }
console.log('removed');

container.classList.add('quizpage'); // add class to main to apply css

container.appendChild(subtitle)// append subtitle
console.log('appended subtitle');
subtitle.classList.add('subtitle'); // add class to subtitle to apply css

container.appendChild(questionBox);// append question box
console.log('appended question');
questionBox.classList.add('questionBox'); // add class to questionbox to apply css

body.appendChild(footer);// append footer
footer.appendChild(home); //insert home icon
home.classList.add('home'); // add class to home to apply css
footer.appendChild(questionNum) // insert q num
questionNum.classList.add('questionNum'); // add class to questionNum to apply css

})
