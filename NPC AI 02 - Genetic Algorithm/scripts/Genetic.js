class Specimen {
    constructor(parents = null, traits = [], location) {
        this.traits = []
        if (parents)
            for (let i = 0; i < parents[0].traits.length; i++)
                this.traits[i] = Date.now() % 2 == 0 ? parents[0].traits[i] : parents[1].traits[i]
        else
            this.traits = traits
        this.score = 0
    }

    behavior(epochs) {

    }

    rank(chars) {
        this.score = 0
        for (let i = 0; i < chars.length; i++) {
            if (chars.charAt(i) == this.traits[i])
                this.score += 1
        }
        // const xDist = Math.abs(this.location.x - chars.x)
        // const yDist = Math.abs(this.location.y - chars.y)
        // this.score = Math.sqrt((xDist * xDist) + (yDist * yDist))
    }
}

class Population {
    constructor(numSpecimens) {
        this.population = []
        this.generation = 1
        let traits = []
        for (let i = 0; i < 5; i++)
            traits.push(String.fromCharCode(97 + Math.random() * (122 - 97) | 0))
        for (let i = 0; i < numSpecimens; i++)
            this.population.push(new Specimen(null, traits))
    }

    advance(chars, epochs) {
        // First, let specimens behave and rank accordingly
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].behavior(epochs)
            this.population[i].rank(chars)
        }

        // Then, sort where score == distance from target
        this.population.sort((a, b) => { return b.score - a.score })
    }

    repopulate(keepers = 1) {
        for (let i = keepers - 1; i < this.population.length; i++) {
            let half = this.population.length / 2
            if (i < half)
                this.population[i] = new Specimen([this.population[i + (Math.random() * half / 2 | 0)], this.population[i - 1]], null) // Best
            else {
                let traits = []
                for (let i = 0; i < 5; i++)
                    traits.push(String.fromCharCode(97 + Math.random() * (122 - 97) | 0))
                this.population[i] = new Specimen(null, traits) // Worst
            }
        }
        this.generation += 1
    }

    print() {
        console.log(`========== Generation ${this.generation} ==========\n`)
        for (let i = 0; i < 10; i++) {
            // console.log(`X: ${this.population[i].location.x}, Y: ${this.population[i].location.y}`)
            console.log(`Specimen #${i}: ${this.population[i].score}\n---------------------------`)
        }
        console.log(`${this.population[0].traits[0]}${this.population[0].traits[1]}${this.population[0].traits[2]}${this.population[0].traits[3]}${this.population[0].traits[4]}`)

        // for (let i = 10; i < this.population.length; i += 10) {
        //     // console.log(`X: ${this.population[i].location.x}, Y: ${this.population[i].location.y}`)
        //     console.log(`Specimen #${i}: ${this.population[i].score}\n---------------------------`)
        // }
    }
}

module.exports = {
    Population,
    Specimen
}