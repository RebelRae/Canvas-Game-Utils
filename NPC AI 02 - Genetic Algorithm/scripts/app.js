const ga = require('./Genetic')

const chars = 'hello'

let population = new ga.Population(100)
population.advance(chars, 10)
population.print()

for (let i = 0; i < 199; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 300; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 500; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 1000; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 1000; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 1000; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 1000; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()
for (let i = 0; i < 1000; i++) {
    population.repopulate(4)
    population.advance(chars, 10)
}
population.print()