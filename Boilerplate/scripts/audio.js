const audioCtx = new(window.AudioContext || window.webkitAudioContext)()
var gainNode = audioCtx.createGain()
gainNode.connect(audioCtx.destination)
gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime)
var snapGainNode = audioCtx.createGain()
snapGainNode.connect(audioCtx.destination)
snapGainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)

var audioFiles = []

freq = (note, octave) => {
    if (octave < 0 || octave > 10) return 0
    var baseF = 0
    switch (note) {
        case 'C':
            baseF = 16.35
            break
        case 'C#':
            baseF = 17.32
            break
        case 'D':
            baseF = 18.35
            break
        case 'D#':
            baseF = 19.45
            break
        case 'E':
            baseF = 20.6
            break
        case 'F':
            baseF = 21.83
            break
        case 'F#':
            baseF = 23.12
            break
        case 'G':
            baseF = 24.5
            break
        case 'G#':
            baseF = 25.96
            break
        case 'A':
            baseF = 27.5
            break
        case 'A#':
            baseF = 29.14
            break
        case 'B':
            baseF = 30.87
            break
    }
    return octave == 0 ? baseF : baseF * Math.pow(2, octave)
}

// setTimeout(function() { playNote('C', 4, 500) }, 1000)
playNote = (note, octave, duration) => {
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(audioCtx.destination)
    oscillator.type = 'sine'
    let startTime = audioCtx.currentTime
    oscillator.frequency.setValueAtTime(freq(note, octave), startTime)
    oscillator.start()
    setTimeout(function() {
        oscillator.stop()
    }, duration)
    console.log(`${note}${octave}: ${freq(note, octave)}`)
}

var numBoops = 0
boop = () => {
    numBoops += 1
    if (numBoops > 1) {
        numBoops = 1
        return
    }
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = 'sine'
    let startTime = audioCtx.currentTime
    let frequencyMax = Math.floor(Math.random() * (3500 - 1500 + 1) + 1500)
    oscillator.frequency.setValueAtTime(frequencyMax, startTime)
    oscillator.start()
    setTimeout(function() {
        oscillator.stop()
        numBoops -= 1
    }, 25)
}

var numFizzles = 0
fizzle = () => {
    numFizzles += 1
    if (numFizzles > 1) {
        numFizzles = 1
        return
    }
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = 'sine'
    let startTime = audioCtx.currentTime
    let frequencyMax = Math.floor(Math.random() * (150 - 100 + 1) + 100)
    oscillator.frequency.setValueAtTime(frequencyMax, startTime)
    oscillator.start()
    setTimeout(function() {
        oscillator.stop()
        numFizzles -= 1
    }, 25)
}

var numSnaps = 0
snap = () => {
    numSnaps += 1
    if (numSnaps > 1) {
        numSnaps = 1
        return
    }
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = 'sine'
    let startTime = audioCtx.currentTime
    let frequencyMax = Math.floor(Math.random() * (350 - 200 + 1) + 200)
    oscillator.frequency.setValueAtTime(frequencyMax, startTime)
    oscillator.start()
    setTimeout(function() {
        oscillator.stop()
        numSnaps -= 1
    }, 40)
}

loadAudioFiles = (files) => {
    files.forEach(file => {
        var soundFile = document.createElement(`audio`)
        soundFile.preload = `auto`
        if (file.loop) soundFile.setAttribute(`loop`, ``)
        var src = document.createElement(`source`)
        src.src = file.src
        soundFile.appendChild(src)
        audioFiles.push({
            name: file.name,
            file: soundFile
        })
    })
}

clearAudioFiles = () => {
    audioFiles = []
}

playAudioFromFile = (audio, volume = 0.3) => {
    let sound = audioFiles.filter((file) => { return file.name == audio })[0].file
    sound.currentTime = audioCtx.currentTime
    sound.volume = volume
    sound.play()
}