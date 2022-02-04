const tower = document.getElementsByClassName('tower')
const pillars = document.getElementsByClassName('pillar')
const disks = document.getElementsByClassName('disk')
const difficulty = document.getElementsByClassName('difficulty')
const body = document.getElementsByTagName('body')[0]
const footer = document.getElementsByTagName('footer')[0]
const resetBtn = document.getElementsByClassName('reset')[0]
const selectedDisk = document.getElementsByClassName('upAndBeyond')
const head = document.getElementsByTagName('header')[0]
let minimumMovementsValue = Math.pow(2, disks.length) - 1
let countMovements = 0
let clicks = 0

//Cria os pilares
function createTower() {

  const hanoi = document.createElement('div')
  hanoi.classList.add('hanoi')

  for (let i = 0; i < 3; i++) {
    const createTower = document.createElement('div')
    createTower.classList.add('tower')
    const createPillar = document.createElement('div')
    createPillar.classList.add('pillar')

    body.appendChild(hanoi)
    hanoi.appendChild(createTower)
    createTower.appendChild(createPillar)
  }
}
createTower()

//Cria os discos no pilar 1
function createDisks(num) {
  pillars[0].innerHTML = ' '
  for (let i = 0; i <= num; i++) {
    const createDisks = document.createElement('div')
    createDisks.classList.add('disk')
    createDisks.classList.add('disk' + (i + 1))
    createDisks.id = (i + 1)

    pillars[0].appendChild(createDisks)
  }
}
createDisks()

//Movimentos
const countMinimumMovements = document.createElement('p')

function minimumMovements() {
  countMinimumMovements.classList.add('minimum')
  countMinimumMovements.innerText = `Movimentos mínimos: ${minimumMovementsValue}`
  body.appendChild(countMinimumMovements)
}
minimumMovements()

//Contador de movimentos
function diskMovementsCount() {
  const clickCount = document.createElement('p')
  clickCount.innerText = `${countMovements} movimentos`
  clickCount.classList.add('movements')

  body.appendChild(clickCount)
}
diskMovementsCount()

const clickCount = document.getElementsByClassName('movements')[0]

function click() {
  clicks += 1
}

for (let i = 0; i < pillars.length; i++) {
  pillars[i].addEventListener('click', click)
}

//Texto de fim de jogo
const victory = document.createElement('p')
victory.classList.add('victory', 'hidden')
head.appendChild(victory)

//Reseta os discos
function resetGame() {
  for (let i = 0; i < pillars.length; i++) {
    footer.appendChild(resetBtn)
    pillars[i].innerHTML = ''
    clicks = 0
    clickCount.innerText = `${clicks} movimentos`
    countMinimumMovements.innerText = 'Movimentos mínimos: 0'
    countMovements = 0
    victory.innerText = ''
    victory.classList.add('hidden')
  }
}
resetBtn.addEventListener('click', resetGame)

//Cria os discos de acordo com a dificuldade
for (let i = 0; i < difficulty.length; i++) {
  difficulty[i].addEventListener('click', () => {
    for (let i = 0; i < pillars.length; i++) {
      pillars[i].innerHTML = ''
      clicks = 0
      clickCount.innerText = `${clicks} movimentos`
      countMovements = 0
      victory.innerText = ''
    }
    createDisks(i + 2)
    countMinimumMovements.innerText = `Movimentos mínimos: ${Math.pow(2, disks.length) - 1}`

  })
}

//Levanta a peça e adiciona ao pilar
for (let i = 0; i < pillars.length; i++) {
  pillars[i].addEventListener('click', function playGame() {

    if (pillars[i].innerHTML === '' || pillars[i].lastElementChild === null) {
      countMovements += 1
      clickCount.innerText = `${countMovements} movimentos`

      pillars[i].appendChild(selectedDisk[0])
      selectedDisk[0].classList.remove('upAndBeyond')
      selectedDisk[0].classList.add('wayDownWeGo')
    }

    if (pillars[i].innerHTML !== '' && selectedDisk.length === 0) {
      pillars[i].lastElementChild.classList.remove('wayDownWeGo')
      pillars[i].lastElementChild.classList.add('upAndBeyond')
    }

    if (selectedDisk[0].clientWidth < pillars[i].lastElementChild.clientWidth) {
      pillars[i].appendChild(selectedDisk[0])
      pillars[i].lastElementChild.classList.remove('upAndBeyond')
      pillars[i].lastElementChild.classList.add('wayDownWeGo')
      countMovements += 1
    }

    clickCount.innerText = `${countMovements} movimentos`

    if (pillars[2].childElementCount === disks.length) {
      victory.classList.remove('hidden')
      victory.innerText = 'Fim de Jogo!'
      victory.appendChild(resetBtn)
    }
  })
}