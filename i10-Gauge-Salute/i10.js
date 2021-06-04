const rpmNeedle = document.querySelector('[data-rpm-needle]')
const rpmNumbers = [...document.querySelector('[data-rpm-numbers]').querySelectorAll('span')]
const kmhNeedle = document.querySelector('[data-kmh-needle]')
const kmhNumbers = [...document.querySelector('[data-kmh-numbers]').querySelectorAll('span')]
const heatNeedle = document.querySelector('[data-heat-needle]')
const heatNumbers = [...document.querySelector('[data-heat-numbers]').querySelectorAll('p')]
const fuelNeedle = document.querySelector('[data-fuel-needle]')
const fuelNumbers = [...document.querySelector('[data-fuel-numbers]').querySelectorAll('p')]
const computer = [...document.querySelector('.computer').querySelectorAll('p')]

function opac(elem) {
  elem.style.opacity =1 
}

function rotationRpm(elem , x) {
  this.x = x
  elem.style.transform = `rotateZ(${this.x}deg)`
}

// right sector
setTimeout(() => {opac(rpmNeedle)}, 800)
rpmNumbers.forEach((e,idx) => setTimeout(() => {opac(e)}, (400*idx)))
setTimeout(() => {rotationRpm(rpmNeedle, 212)}, 1200)
setTimeout(() => {rotationRpm(rpmNeedle, 42)}, 2500)

// middle sector
setTimeout(() => {opac(kmhNeedle)}, 800)
kmhNumbers.forEach((e,idx) => setTimeout(() => {opac(e)}, (300*idx)))
setTimeout(() => {rotationRpm(kmhNeedle, 308)}, 1200)
setTimeout(() => {rotationRpm(kmhNeedle, 55)}, 3200)

// left sector
setTimeout(() => {opac(heatNeedle)}, 1200)
setTimeout(() => {opac(fuelNeedle)}, 800)
heatNumbers.forEach((e,idx) => setTimeout(() => {opac(e)}, (3000*idx)))
fuelNumbers.forEach((e,idx) => setTimeout(() => {opac(e)}, (2000*idx)))
setTimeout(() => {rotationRpm(heatNeedle, 240)}, 2200)
setTimeout(() => {rotationRpm(heatNeedle, 110)}, 5400)
setTimeout(() => {rotationRpm(fuelNeedle, 240)}, 2200)
setTimeout(() => {rotationRpm(fuelNeedle, 190)}, 5400)

// roadcomputer
computer.forEach((e) => setTimeout(() => e.style.display ='block', 3000))
computer.forEach((e) => setTimeout(() =>{opac(e)}, 4000))

