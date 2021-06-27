//---------- Display ----------//
canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
const context = canvas.getContext('2d')

//---------- Application ----------//
// Performance
var interval = 1000 / 20
var throttle = true
var running = false
var prevTime = 0
var currTime = 0

// Mouse
var cursor = {
    x: 0,
    y: 0
}

// Loader

// Menu

// Audio

// Particle Systems

// Terrain

//---------- Application Functions ----------//
func = (arg) => {
    console.log(arg)
}

//---------- Events ----------//
addEventListener('contextmenu', event => event.preventDefault()) // Disables default right-click
canvas.addEventListener('mouseover', mouseEvent => {})
canvas.addEventListener('mouseout', mouseEvent => {})
addEventListener('mousemove', mouseEvent => {
    cursor.x = mouseEvent.clientX
    cursor.y = mouseEvent.clientY
})
addEventListener('mousedown', mouseEvent => {
    if (mouseEvent.detail === 2) {
        // Double click
    }
    switch (mouseEvent.button) {
        case 0:
            // Left click
            break
        case 1:
            // Middle click
            break
        case 2:
            // Right click
            break
        default:
            alert('WTF?')
            break
    }
})
addEventListener('mouseup', mouseEvent => {})
addEventListener('keydown', keyboardEvent => {
    console.log(keyboardEvent.code)
    switch (keyboardEvent.code) {
        default: break
    }
})
addEventListener('resize', event => {
    context.canvas.width = window.innerWidth
    context.canvas.height = window.innerHeight
})

//---------- Application Loop ----------//
pausedUpdate = () => {
    // Draw pause screen
    var pauseGradient = context.createRadialGradient(canvas.width / 2, canvas.height / 3, 0, canvas.width / 2, canvas.height / 3, (canvas.height > canvas.width) ? canvas.height + canvas.height / 3 : canvas.width + canvas.width / 3)
    pauseGradient.addColorStop(0, `rgba(0, 0, 0, 0.0)`)
    pauseGradient.addColorStop(0.85, `rgba(255, 255, 255, 1.0)`)
    pauseGradient.addColorStop(1, `rgba(255, 255, 255, 1.0)`)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = pauseGradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = `rgb(200, 200, 200)`
    context.font = '16px Electrolize'
    context.fillText('PAUSED', (canvas.width / 2) - (context.measureText('LOADING').width / 2), canvas.height / 2 + 8)
}
update = () => {
    // Low priority updates go here
    context.clearRect(0, 0, canvas.width, canvas.height)
}
throttleUpdate = () => {
    // Check if time delta is greater than fps interval
    if (currTime - prevTime > interval) {
        update()
        prevTime = currTime
    }
    // Put nothing else in here
}
processLoop = (timestamp) => {
    // High priority updates go here

    // Update all at spec
    currTime = timestamp // Use default requestAnimationFrame() timestamp
    running ? // Throttle down or full speed when not paused
        throttle ?
        throttleUpdate() : update() : pausedUpdate()

    requestAnimationFrame(processLoop)
}
requestAnimationFrame(processLoop)