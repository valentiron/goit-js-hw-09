const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]"),
    body: document.querySelector("body"),
}

let timer = null;

refs.start.addEventListener("click", setBodyColor)

function setBodyColor() {
    const delay = 1000;

    refs.start.setAttribute("disabled", "");

    timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    }, delay);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stop.addEventListener("click", stopChangeColor)

function stopChangeColor() {
    clearInterval(timer);
    refs.start.removeAttribute("disabled", "");
}
