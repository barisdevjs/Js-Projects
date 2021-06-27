const slider = document.querySelector('.slider')
const black = document.querySelector('.blackimg')
const colorful = document.querySelector('.colorimg')
const container = document.querySelector('.container')

const draw = (e) => {
    let xPos = e.layerX;
    let size = container.offsetWidth;
    colorful.style.width = xPos + "px";
    slider.style.left = xPos + "px"

    if (xPos < 50) {
        colorful.style.left = 0;
        slider.style.left = 0;
    }
    if ( xPos + 50 > size) {
        colorful.style.width = size + "px";
        slider.style.left = size + "px";
    }
};

container.addEventListener('mousemove', draw)