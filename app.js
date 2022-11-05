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
    does: "+1 click for every click"
  },
  {
    name: 'fiveClick',
    cost: 45,
    quantity: 0,
    does: "+5 clicks for every click"

  },
  {
    name: 'autoDoer',
    cost: 100,
    quantity: 0,
    does: "+1 click every 3 seconds"
  },
  {
    name: 'easyDoer',
    cost: 1000,
    quantity: 0,
    does: "+10 click ever 3 seconds"
  }
]

let bank = 10000

let totalClicks = 0

let autostart = false

function clickBox(clickKind) {
  let numClicks = clickers.find(f => f.name == clickKind)
  bank += numClicks.clicks
  totalClicks += numClicks.clicks
  drawBank()
}

function autoClick() {
  clickBox("autoClicks")
}
function update() {
  drawBank()
  drawClicks()
  drawShop()
}

function drawBank() {
  let template = bank
  if (bank <= 0) {
    bank = 0
  }
  document.getElementById('click-count').innerText = template
}

function drawClicks() {
  let clickHand = clickers.find(f => f.name == 'handClicks')
  let clickAuto = clickers.find(f => f.name == 'autoClicks')
  document.getElementById('handClicks').innerText = clickHand.clicks
  document.getElementById('autoClicks').innerText = clickAuto.clicks
}

function drawShop() {
  let template = ''
  upgrades.forEach(f => {
    if (f.quantity >= 0) {
      template += ` 
    <div class="col-2 text-center shadow-count justify-content-center align-items-center row p-0 my-0" onclick="buyOneClick('${f.name}')">
      <div class=" fw-3">${f.does} cost: $${f.cost} & amount: ${f.quantity}</div>
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
  // console.log(clickKind.cost)
  if (bank < clickKind.cost) {
    window.alert('get to clicking')
    return
  } else {
    bank -= clickKind.cost
    upgrade(clickKind.name),
      update()
  }
}

function upgrade(clickerName) {
  let upgradeKind = upgrades.find(f => f.name == clickerName)
  let handClick = clickers.find(n => n.name == 'handClicks')
  let autoClick = clickers.find(a => a.name == 'autoClicks')
  if (upgradeKind.name == 'oneClick') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      handClick.clicks += 1
    update()
    return
  }
  if (upgradeKind.name == 'fiveClick') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      handClick.clicks += 5,
      update()
    return
  }
  if (upgradeKind.name == 'autoDoer') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      autoClick.clicks += 3,
      autostart = true,
      update()
    return
  }
  if (upgradeKind.name == 'easyDoer') {
    Math.floor(upgradeKind.cost *= 1.2),
      upgradeKind.quantity++,
      autoClick.clicks += 30,
      autostart = true,
      update()
    return
  }

}
update()
setInterval(autoClick, 3000)