// selecting elements from html file
const volume = document.querySelector('#volume');
const bass = document.querySelector('#bass')
const treble = document.querySelector('#treble')  
const visualizer = document.querySelector('#visualizer')

const context = new AudioContext(); // controls everything related to audio
const analyzerNode = new AnalyserNode(context, { fftSize: 256 }) // gets info from the context  and number of frequencies is going to show
const gainNode = new GainNode(context, {gain: volume.value})
const bassEQ = new BiquadFilterNode(context, {
    type: 'lowshelf',
    frequency:500,
    gain: bass.value
    })
const trebleEQ = new BiquadFilterNode(context, {
    type: 'highshelf',
    frequency: 3000,
    gain: treble.value
})

setupEventListeners() // calling functions
setupContext()
resize()
drawVisualizer()

function setupEventListeners() {
    window.addEventListener('resize', resize)

    volume.addEventListener('input', e => {
        const value = parseFloat(e.target.value) // string to floating point number
         gainNode.gain.setTargetAtTime(value, context.currentTime, 0.01)
    })

    bass.addEventListener('input', e => {
        const value = parseFloat(e.target.value) // string to floating point number
        bassEQ.gain.setTargetAtTime(value, context.currentTime, 0.01)
    })

    treble.addEventListener('input', e => {
        const value = parseInt(e.target.value)
        trebleEQ.gain.setTargetAtTime(value, context.currentTime, .01)
    })
}

async function setupContext() {
    const player = await getPlayer()
    if (context.state === 'suspended') { 
        await context.resume()
    }
    const source = context.createMediaStreamSource(player)
    source
    .connect(bassEQ)
    .connect(trebleEQ)
    .connect(gainNode )
    .connect(analyzerNode)
    .connect(context.destination)
}

function getPlayer() { // returns a promise and settings about 
    return navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false,
            exposureCompensation: true,
            saturation: true,
            sharpness: false,
            latency: 0
        }
    })
}

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer) // updates the display of the bars like an infinite loop

    const bufferLength =analyzerNode.frequencyBinCount; // number of how many different frequencies are going to be shown
    const dataArray = new Uint8Array(bufferLength); 
    analyzerNode.getByteFrequencyData(dataArray);
    /*  this part is drawing it on the canvas */
    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = (width / bufferLength) 
    /*                        */
    const canvasContext = visualizer.getContext('2d'); // get canvas
    canvasContext.clearRect(0, 0, width, height); // clear the canvas

    dataArray.forEach((value, index) => {
        const y = value / 255 * height / 1.2;
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${y / height * 500 }, 100%, 50%)`; 
        canvasContext.fillRect(x, height- y, barWidth, y);
    });
    }
    // adjusting the visualizer to the size of the window of the browser
    function resize() {
        visualizer.width = visualizer.clientWidth * window.devicePixelRatio;
        visualizer.height = visualizer.clientHeight * window.devicePixelRatio;
    }