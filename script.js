let order = []
let clickedOrder = []
let players = []
let player
let score = 0

const menu = document.querySelector(`.menu`)
const mainGame = document.querySelector(`.main-game`)
const placar = document.querySelector(`.placar`)

const blue = document.querySelector(`.blue`)
const yellow = document.querySelector(`.yellow`)
const red = document.querySelector(`.red`)
const green = document.querySelector(`.green`)

//ascende e apaga as casas
function lightColor(element){
        element.classList.toggle('selected')

}

//Envia as casas para ascenderem
function lightHome(index){
    if(index==0) return blue
    else if(index==1) return yellow
    else if(index==2) return red
    else if(index==3) return green
}

function ascends(index, number){
    number*=500
    let element = lightHome(index)
    setTimeout(()=>{
        lightColor(element)
    }, number)
    setTimeout(()=>{
        lightColor(element)
    }, number+500)
}

//Sorteia um numero aleatório
function sortColor(){
    let colorOrder = Math.floor(Math.random()*4)
    order.push(colorOrder)
    for(let i in order){
        ascends(order[i], Number(i)*1.5)
        if(i==(order.length-1))
            game=true
    }
}

//gaem over
function gameOver(){
    alert(`Game Over!!!\nSua pontuação foi ${score}\n Pressione OK para jogar novemente`)
    order = []
    score = 0
    menu.style.display = `flex`
    mainGame.style.display = `none`
}

//elimina os player
function winner(){
    players.splice(player,1)
    console.log(players[player])
    if(players.length==1){
        alert(`Parabens!!! Jogador ${players} venceu\nPressione OK para continuar`)
        order = []
        players = []
        player
        menu.style.display = `flex`
        mainGame.style.display = `none`
    }else
        start()
}

//muda o jogador
function changePlayer(){
    player++
    if(player>players.length-1)
        player=0
    placar.innerHTML = `<h2>Jogador: ${players[player]}</h2>`
}

//checa as cores
function check(click, sort){
    if(click != sort){
        if(players.length==1)
            gameOver()
        else
            winner()
    }else if(players.length==1){
        score = score+1
        placar.innerHTML = `<h2>Score: ${score}</h2>`
    }
}

//clicando nas casas
function clicked(index){
    clickedOrder.push(index)
    let element = lightHome(index)
    lightColor(element)    
    setTimeout(()=>{
        lightColor(element)    
    }, 250)
    console.log()
    check(index, order[(clickedOrder.length)-1])
    setTimeout(()=>{
        if(clickedOrder.length==order.length)
            start()
    }, clickedOrder.length*500)
    
}

//inicia o game
function start(){
    clickedOrder = []

    if(players.length>=2){
        changePlayer()
    }

    sortColor()
}

//define a quantidade de players
function numberPlayers(index){
    for(let i=1; i<=index; i++)
        players.push(i)

    player = players.length
    setTimeout(()=>{
        start()
    },250)
}

//inicia o jogo
function play(index){
    menu.style.display = `none`
    mainGame.style.display = `flex`

    numberPlayers(index)
}
