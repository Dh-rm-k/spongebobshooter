const grid = document.querySelector('.grid');
window.alert("play on your computer i havent set up the controls for mobile phone but i will if i feel like it.")
let aliensRemoved = []
let width = 20;
for(let i=0;i<400;i++){
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));
let killed = 0;
var howMany = 4;
var alienInvaders = [
0,1,2,3,4,5,6,7,8,9,
20,21,22,23,24,25,26,27,28,29,
40,41,42,43,44,45,46,47,48,49,
60,61,62,63,64,65,66,67,68,69

]

let image = new Image();
image.setAttribute('id','invimg')
image.src = 'https://media4.giphy.com/media/3og0IvyFkwRv0kbtmg/200w.webp?cid=ecf05e47fmqheeat67qgexedokehbd52l5kxsccumyy7onaq&rid=200w.webp&ct=s'
function draw() {
   
    for (let i=0; i<alienInvaders.length;i++){
        if(!aliensRemoved.includes(i)){
            let photo = image.cloneNode();
            squares[alienInvaders[i]].classList.add('invader');
            squares[alienInvaders[i]].appendChild(photo);

        }
    }
 
}
   
// document.querySelectorAll('.invader').style.color= "red";
draw();

function remove() {
    let incinarate = document.querySelectorAll('#invimg');
    for (let i=0;i<alienInvaders.length;i++) {
        squares[alienInvaders[i]].classList.remove('invader')
        // incinarate[i].remove();
    }
    for(let i=0;i<incinarate.length;i++){
        incinarate[i].remove();
    }
}
currShooterIndex = 399;

squares[currShooterIndex].classList.add('shooter');

let sponge = new Image();
sponge.setAttribute('id','sponge')
sponge.src = 'https://media0.giphy.com/media/ctgHlxEJ7og9iduUmD/giphy.webp?cid=ecf05e47kmf2ea6x57wwxuyr0uiuoungrdkpf8yt6fhvy2gu&rid=giphy.webp&ct=s';
squares[currShooterIndex].appendChild(sponge);
function moveShooter(e){
    if(lost||won){
        return;
    }
    let clonebob = sponge.cloneNode();
    squares[currShooterIndex].classList.remove('shooter');
    let killBob = document.querySelectorAll('#sponge');
    for(let i=0;i<killBob.length;i++)
        killBob[i].remove();
    switch(e.key){
        case 'ArrowLeft':
            if (currShooterIndex % width !==0)
            currShooterIndex -=1;
            break;
        case 'ArrowRight':
            if(currShooterIndex%width <width-1)
            currShooterIndex += 1;
            break;
    }
    squares[currShooterIndex].classList.add('shooter');
    squares[currShooterIndex].appendChild(clonebob)
}
document.addEventListener('keydown',moveShooter)
let goRight = true;
let direction = 1;
let won,lost;
function moveInvaders() {
    if(alienInvaders.length>0 && alienInvaders[alienInvaders.length-1]>379){
        clearInterval(invadersId);
        console.log(alienInvaders)
        for (let i=0;i<alienInvaders.length;i++){
            alienInvaders[i].classList.remove('invader');
            // alienInvaders[i].remove(image)
            alienInvaders[i].classList.add('boom');
            setTimeout(()=> alienInvaders[i].classList.remove('boom'), 10);
        }  
        return;
    }
    const low = alienInvaders[0]%width===0;
    const high = alienInvaders[alienInvaders.length-1]%width===width-1;
    remove();
    if (high && goRight){
        for(let i=0;i<alienInvaders.length;i++){
            alienInvaders[i]+=(width+1);
        }    
        direction= -1;
        goRight = false;
    }
    if (low && !goRight){direction = 1;
        for(let i=0;i<alienInvaders.length;i++){
            alienInvaders[i]+=(width-1);
        }   
        goRight=true;
    }
    for(let i=0;i<alienInvaders.length;i++){
        alienInvaders[i]+= direction;
    }
    draw();
    lost = false;
    let display = document.getElementById('result')
    if (squares[currShooterIndex].classList.contains('invader','shooter')){
        // display.innerHTML = 'GAME OVER';
        lost = true;
        clearInterval(invadersId);
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] >= 380) {
        //   display.innerHTML = 'GAME OVER'
        lost = true;
          clearInterval(invadersId)
        }
      }
      won = false;
      if (aliensRemoved.length === alienInvaders.length) {
        // display.innerHTML = 'YOU WIN';
        // won = true;
        // clearInterval(invadersId)
        howMany+=1;
        let cntNumber = 0;
        for(let i=0;i<howMany;i++){
            for(let j=0;j<10;j++){
                alienInvaders.push(cntNumber);
                cntNumber++;
            }
            // cntNumber+=10;
        }
        aliensRemoved = [];
        for (let i=0; i<alienInvaders.length;i++){
            if(!aliensRemoved.includes(i)){
                let photo = image.cloneNode();
                squares[alienInvaders[i]].classList.add('invader');
                squares[alienInvaders[i]].appendChild(photo);
    
            }
        }
      }
      let render = killed;
      if(won) {
        grid.classList.remove('playing');
        grid.classList.add('won');
        setTimeout(()=>squares[currShooterIndex].classList.remove('shooter'),500)
        render = "ADDING NEW LEVELS SOON! THANKS FOR PLAYING";}
      else if(lost){
        // squares[currShooterIndex].classList.remove('invader','shooter');
        squares[currShooterIndex].classList.add('boom')
        squares[currShooterIndex].remove();
        setTimeout(()=>squares[currShooterIndex].classList.remove('boom','shooter'),500);

        console.log(alienInvaders)
        let kill = document.querySelectorAll('#invimg');
        for(let i=0;i<kill.length;i++)kill[i].remove();
        for(let i=0;i<alienInvaders.length;i++){
            squares[alienInvaders[i]].classList.add('boom');

            setTimeout(()=>squares[alienInvaders[i]].classList.remove('boom','invader'),100);
            // setTimeout(()=> squares[alienInvaders[i]].classList.remove('boom'), 1000);
        }
        
        // document.querySelectorAll('.grid').classList.remove('color--grid');
        grid.classList.add('lost');
        render="YOU LOST";}
      document.getElementById('result').innerHTML = render;
      if(won)alert("YOU WON");
  
}

invadersId =setInterval(moveInvaders, 550)
function shoot(e) {
    let laserId;
    let currLaserIndex = currShooterIndex;
    // squares[currLaserIndex].classList.add('laser');
    function moveLaser() {
        if(currLaserIndex <= 0 || currLaserIndex == null || currLaserIndex == NaN ){
           clearInterval(laserId);
           return;
        }
        // console.log(currLaserIndex);
        
        squares[currLaserIndex].classList.remove('laser');
        currLaserIndex-= width;
        if(currLaserIndex <= 0 || currLaserIndex == null || currLaserIndex == NaN ){
            clearInterval(laserId);
            return;
         }
        squares[currLaserIndex].classList.add('laser');

        if(squares[currLaserIndex].classList.contains('invader')){
            let kill = document.querySelectorAll('#invimg')
            for(let i=0;i<kill.length;i++){
                if(kill[i].parentElement.classList.contains('laser')){
                    kill[i].remove();
                }
            }
            squares[currLaserIndex].classList.remove('invader');
            squares[currLaserIndex].classList.add('boom');
            console.log(squares[currLaserIndex])
            killed += 1;
            aliensRemoved.push(alienInvaders.indexOf(currLaserIndex));
            // setTimout(()=>squares[currLaserIndex].classList.remove('laser'),200);
            setTimeout(()=> squares[currLaserIndex].classList.remove('boom','laser'), 200);
            clearInterval(laserId);
            
            console.log(aliensRemoved);
        }
    }
    switch(e.key){
        case 'ArrowUp':
            laserId=setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown',shoot);



