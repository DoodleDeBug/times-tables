const two = document.querySelector(".t2")
const container = document.querySelector("#flex-container")
const tiles = document.querySelectorAll(".tile")



two.addEventListener('click', function startGameTwo(){
console.log("selected two times table");
while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
console.log("removed");
})
