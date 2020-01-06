const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startJeu() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startJeu()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [{
    id: 1,
    text: '*Talkie Walkie* Hey Jamy! Tu m aides à terminer le labyrinthe?',
    options: [{
        text: 'Ok commençons par prendre en face',
        setState: {
          blueGoo: true
        },
        nextText: 2
      },
      {
        text: 'Allons par la droite !',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Ok j y suis!',
    options: [{
        text: 'Continue sur ta gauche',
        requiredState: (currentState) => currentState.blueGoo,
        setState: {
          blueGoo: false,
          sword: true
        },
        nextText: 3
      },
      {
        text: 'Va au bout tout à droite',
        requiredState: (currentState) => currentState.blueGoo,
        setState: {
          blueGoo: false,
          shield: true
        },
        nextText: 3
      },
      {
        text: 'Mmmh... en face',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Et ensuite ?',
    options: [{
        text: 'Je dirais à droite après le mur',
        nextText: 4
      },
      {
        text: 'A droite aussi, mais la 2eme sortie cette fois',
        nextText: 5
      },
      {
        text: 'A gauche',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'UN MONSTREEEEEEEE!!!!!!',
    options: [{
      text: '*dead*',
      nextText: -1
    }]
  },
  {
    id: 5,
    text: 'Oh non... une impasse',
    options: [{
      text: 'Demi tour !',
      nextText: -1
    }]
  },
  {
    id: 6,
    text: 'Ensuite ?',
    options: [{
      text: 'A droite, ta seul issue',
      nextText: 7
    }]
  },
  {
    id: 7,
    text: 'Je t ecoute',
    options: [{
        text: 'En face...',
        nextText: 8
      },
      {
        text: 'Prends à ta gauche',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Continue juste en face, à 5m',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Je crois voir la lumière du fond ...',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'C etait un cul-de-sac.',
    options: [{
      text: 'Demi-tour!',
      nextText: -1
    }]
  },
  {
    id: 9,
    text: '***BRROUUUUUU***',
    options: [{
      text: 'OH NON ! Un monstre !!!',
      nextText: -1
    }]
  },
  {
    id: 10,
    text: '... ATTENTION!!!!!',
    options: [{
      text: 'T es tombé dans un trou? Hee.. Ca va ???',
      nextText: -1
    }]
  },
  {
    id: 11,
    text: 'Félicitation ! Tu as gagner le labyrinthe',
    options: [{
      text: 'Recommencé le labyrinthe',
      nextText: -1
    }]
  }
]

startJeu()