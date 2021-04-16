
const two = document.querySelector(".t2")
const container = document.querySelector("#flex-container")
const subtitle = document.createElement('div')
const subText = subtitle.innerHTML = '2 Times Table'
const questionBox = document.createElement('div')
const question = questionBox.innerHTML = '2x2'

two.addEventListener('click', function startGameTwo(){
console.log("selected two times table");
while (container.firstChild) { // removes all the tiles
    container.removeChild(container.lastChild);
  }
console.log("removed");

container.appendChild(subtitle)
console.log("appended subtitle")

subtitle.classList.add('subtitle')

container.appendChild(questionBox)
console.log("appended question")

questionBox.classList.add('questionBox')
container.classList.add('quizpage')

})
