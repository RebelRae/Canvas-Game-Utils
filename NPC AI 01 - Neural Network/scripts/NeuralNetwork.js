sigmoid = (value, derivative = false) => {
    return (derivative) ? value * (1 - value) : value / (1 + Math.abs(value))
}

tanh = (value, derivative = false) => {
    return (derivative) ? 1 - Math.tanh(value) ^ 2 : Math.tanh(value)
}

relu = (value, derivative = false) => {
    return (derivative) ? 1 - (value <= 0 ? 0 : value) : value <= 0 ? 0 : value
}

class Neuron {
    constructor(value = -1, synapses = 0) {
        this.value = (value >= 0) ? value : Math.random()
            // this.weight = Math.random()
        this.synapses = []
        for (let i = 0; i < synapses; i++)
            this.synapses.push(Math.random())
    }
}

/**
 * @class NeuralNetwork
 * ```
 * const neuralNetwork = new NeuralNetwork(trainingData, innerLayers)
 * ```
 * @param trainingData
 * Array[Object{ input: Array[Number], output: Array[Number]}]
 * ```
 * const trainingData = [{
 *     input: [0, 0],
 *     output: [1]
 * }, ... ]
 * ```
 * @param layers
 * Array[Number] // Lengths of each inner layer
 * ```
 * const innerLayers = [3, 2, 3]
 * ```
 */
class NeuralNetwork {
    constructor(trainingData = [], layers = []) {
        if (trainingData.length < 1) return
        let inputSize = 0
        let outputSize = 0
        for (let i = 0; i < trainingData.length; i++) {
            if (trainingData[i].input.length > inputSize) inputSize = trainingData[i].input.length
            if (trainingData[i].output.length > outputSize) outputSize = trainingData[i].output.length
        }
        this.matrix = []
        this.biases = []

        let inputCol = []
        for (let i = 0; i < inputSize; i++) inputCol.push(new Neuron(-1, layers[0]))
        this.matrix.push(inputCol)
        this.biases.push(0)

        for (let x = 0; x < layers.length; x++) {
            let layerCol = []
            for (let y = 0; y < layers[x]; y++) layerCol.push(x + 1 == layers.length ? new Neuron(-1, outputSize) : new Neuron(-1, layers[x + 1]))
            this.matrix.push(layerCol)
            this.biases.push(Math.random())
        }

        let outputCol = []
        for (let i = 0; i < outputSize; i++) outputCol.push(new Neuron())
        this.matrix.push(outputCol)
        this.biases.push(Math.random())

        this.trainingData = trainingData
        this.error = [] /** @NOTE : Maybe this should be local */
    }

    train() {
        for (let i = 0; i < this.trainingData.length; i++) {

            // Set input nodes to training data
            for (let j = 0; j < this.matrix[0].length; j++)
                this.matrix[0][j].value = (j < this.trainingData[i].input.length) ? this.trainingData[i].input[j] : 0

            // Forward propagation
            for (let x = 1; x < this.matrix.length; x++) {
                let layerBias = this.biases[x]
                for (let y = 0; y < this.matrix[x].length; y++) {
                    let sum = 0
                    for (let w = 0; w < this.matrix[x - 1].length; w++)
                        sum += this.matrix[x - 1][w].value * this.matrix[x - 1][w].synapses[y]
                    this.matrix[x][y].value = sigmoid(sum + layerBias)
                }
            }

            // Error detection
            for (let j = 0; j < this.trainingData[i].output.length; j++) {
                const guess = this.matrix[this.matrix.length - 1][j].value
                const difference = Math.abs(this.trainingData[i].output[j] - guess)
                console.log(`guess: ${guess}, difference: ${difference}`)
            }

            // Backward propagation
            // for () {}

            // if (i == 0)
            //     console.log(this.matrix)
        }
        // for (let x = 0; x < this.matrix.length; x++)
        //     for (let y = 0; y < this.matrix[x].length; y++)
        //         console.log(this.matrix[x][y])
    }

    test() {}
}

const trainingData = [{
    input: [0, 0],
    output: [0]
}, {
    input: [0, 1],
    output: [1]
}, {
    input: [1, 0],
    output: [1]
}, {
    input: [1, 1],
    output: [0]
}]

let network = new NeuralNetwork(trainingData, [3, 2, 3])

network.train()
    // console.log(network.matrix)