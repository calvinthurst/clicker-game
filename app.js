let clickers = [
  {
    name: 'handClicks',
    clicks: 1,
  },
  {
    name: 'autoClicks',
    clicks: 0,
  }
]

let upgrades = [
  {
    name: 'oneClick',
    cost: 10,
    quantity: 0,
    power: 1,
    does: "clicks added for every click"
  },
  {
    name: 'fiveClick',
    cost: 45,
    quantity: 0,
    power: 5,
    does: "clicks added for every click"

  },
  {
    name: 'autoDoer',
    cost: 100,
    quantity: 0,
    power: 3,
    does: `clicks added for every 3 seconds`
  },
  {
    name: 'easyDoer',
    cost: 1000,
    quantity: 0,
    power: 30,
    does: "clicks added for ever 3 seconds"
  },
  {
    name: 'prestige',
    cost: 100000,
    quantity: 0,
    power: '',
    does: 'prestige'
  },
  {
    name: 'Mystery',
    cost: 1000000,
    quantity: 0,
    power: '',
    does: 'MYSTERY? WHAT IS THIS'
  },
]

let bank = 0

let totalClicks = 0

let prestigelvl = 0

function clickBox(clickKind) {
  let numClicks = clickers.find(f => f.name == clickKind)
  Math.floor(bank += numClicks.clicks)
  totalClicks += numClicks.clicks
  drawBank()
  drawTotal()
}
function autoClick() {
  clickBox("autoClicks")
}
function update() {
  drawBank()
  drawClicks()
  drawShop()
  drawTotal()
  drawPrestige()
}

function drawTotal() {
  let template = totalClicks
  if (totalClicks <= 0) {
    totalClicks = 0
  }
  document.getElementById('total').innerText = Math.floor(template)
}

function drawBank() {
  let template = bank
  if (bank <= 0) {
    bank = 0
  }
  document.getElementById('click-count').innerText = Math.floor(template)
}
function drawPrestige() {
  let template = prestigelvl
  if (prestigelvl <= 0) {
    prestigelvl = 0
  }
  document.getElementById('prestiges').innerText = template
}

function drawClicks() {
  let clickHand = clickers.find(f => f.name == 'handClicks')
  let clickAuto = clickers.find(f => f.name == 'autoClicks')
  document.getElementById('handClicks').innerText = Math.floor(clickHand.clicks)
  document.getElementById('autoClicks').innerText = Math.floor(clickAuto.clicks)
}

function drawShop() {
  let template = ''
  upgrades.forEach(f => {
    if (f.quantity >= 0) {
      template += ` 
    <div class="col-4 text-center shadow-count justify-content-center align-items-center row p-0 my-0" onclick="buyOneClick('${f.name}')">
      <div class=" fw-3">${Math.floor(f.power)} ${f.does} cost: ${Math.floor(f.cost)}  amount: ${f.quantity}</div>
    </div>`
    }
    document.getElementById('upgrades').innerHTML = template
  })
}


// function drawShop() {
//   let oneCost = upgrades.find(f => f.name == 'oneClick')
//   let fiveCost = upgrades.find(f => f.name == 'fiveClick')
//   let autoCost = upgrades.find(f => f.name == 'autoDoer')
//   // let shopCost = upgrades.find(f => f.name == upgradesName)
//   document.getElementById('oneClick').innerHTML = oneCost.cost + oneCost.quantity
//   document.getElementById('fiveClick').innerText = fiveCost.cost + fiveCost.quantity
//   document.getElementById('autoDoer').innerText = autoCost.cost + autoCost.quantity
//   // document.getElementById(upgradesName).innerText = shopCost.cost
// }

function buyOneClick(upgradeName) {
  let clickKind = upgrades.find(c => c.name == upgradeName)
  if (bank < clickKind.cost) {
    window.alert('get to clicking')
    return
  } else {
    Math.floor(bank -= clickKind.cost)
    upgrade(clickKind.name),
      update()
  }
}

function upgradePrestige() {
  upgrades.forEach(i => {
    if (i.quantity >= 0) {
      i.power *= 2
      Math.floor(i.cost *= 0.2)
      i.quantity = 0
    }
  })
}

function upgradeMystery() {
  if (confirm('are you sure')) {
    window.close()
  } else {
    window.alert('good choice')
    bank += 1000000
  }
}

function upgrade(clickerName) {
  let upgradeKind = upgrades.find(f => f.name == clickerName)
  let handClick = clickers.find(n => n.name == 'handClicks')
  let autoClick = clickers.find(a => a.name == 'autoClicks')
  if (upgradeKind.name == 'oneClick') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      handClick.clicks += upgradeKind.power
    Math.floor(upgradeKind.power *= 1.1)
    update()
    return
  }
  if (upgradeKind.name == 'fiveClick') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      handClick.clicks += upgradeKind.power,
      Math.floor(upgradeKind.power *= 1.1)
    update()
    return
  }
  if (upgradeKind.name == 'autoDoer') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      autoClick.clicks += upgradeKind.power,
      Math.floor(upgradeKind.power *= 1.1)
    autostart = true,
      update()
    return
  }
  if (upgradeKind.name == 'easyDoer') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      autoClick.clicks += upgradeKind.power,
      Math.floor(upgradeKind.power *= 1.1)
    autostart = true,
      update()
    return
  }
  if (upgradeKind.name == 'prestige') {
    upgradePrestige(),
      prestigelvl++,
      upgradeKind.quantity = prestigelvl,
      bank = 0
    upgradeKind.cost = 100000
    handClick.clicks = 2 * prestigelvl
    autoClick.clicks = 1 * prestigelvl
    update()
  }
  if (upgradeKind.name == 'Mystery') {
    upgradeMystery()
  }

}
update()
setInterval(autoClick, 3000)