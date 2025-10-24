let temp = [];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const data = JSON.parse(localStorage.getItem('prizes'));
data.items.forEach(item => {
    const top = document.createElement("div");
    const middle = document.createElement("div");
    const bottom = document.createElement("div");

    top.classList.add("corner");
    top.classList.add("top");
    top.classList.add("red");
    top.innerHTML = "A<br>&hearts;";

    middle.classList.add("suit");
    middle.innerHTML = `${item.value}`;

    bottom.classList.add("corner");
    bottom.classList.add("bottom");
    bottom.classList.add("red");
    bottom.innerHTML = "A<br>&hearts;";

    const front = document.createElement("div");
    front.classList.add("card-face");

    front.appendChild(top);
    front.appendChild(middle);
    front.appendChild(bottom);

    const back = document.createElement("div");
    back.classList.add("card-face");
    back.classList.add("card-back");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");
    inner.appendChild(front);
    inner.appendChild(back);

    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("flipped");
    card.appendChild(inner);

    temp.push(card);

    
})

shuffle(temp)

temp.forEach(card => {
    document.querySelector(".row").appendChild(card);
})

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.remove('flipped');
    });
});