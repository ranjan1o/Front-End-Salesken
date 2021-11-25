
let songlengthinsec = null;

function fun1() {
    console.log("hi");
}
console.log("hi")
let box = document.querySelector('#myCanvas');
let screensize=box.offsetWidth
var elemLeft = null;
var elemTop = null;
var context = null;
var e = null;

let a = 1;
let audio = document.getElementById("audio");

songlengthinsec = audio.duration;


console.log(screensize);
var store = [];
function fun2(){
    e = document.getElementById('myCanvas')
    e.setAttribute("width",screensize)
    elemLeft = e.offsetLeft;
    context = e.getContext('2d');
    context.beginPath();
   
    for (let i = 0; i <= screensize; i += 10) {
        let random = Math.random() * 60;
       
        context.fillStyle = "grey";
        if (random < 40) {
            context.fillRect(i, 100, 8, -random);
        }
        else {
            context.fillRect(i, 80, 8, random);
        }
        store.push(random);
     
        
    } 
    context.stroke();
    e.addEventListener('click', dispaly,false);
}
function dispaly(event,second) {
     console.log(second,"second")
    if (second) {
       var xVal = second;
    }
    else {
        var xVal = parseInt(event.pageX - elemLeft)
        console.log(xVal, screensize,"clicked on graph");
        audio.currentTime = xVal*(songlengthinsec/screensize);
        a = xVal;
    }

    context.beginPath();

  
    let count = 0;
    for (let i = 0; i < screensize; i += 10){
       
        if (i < xVal) {
            context.fillStyle = "red";
            if (store[count] < 40) {
                context.fillRect(i, 100, 8, -store[count]);
            }
            else {
                context.fillRect(i, 80, 8, store[count]);
            }
            }
        else {
            context.fillStyle = "grey";
            if (store[count] < 40) {
                context.fillRect(i, 100, 8, -store[count]);
            }
            else {
                context.fillRect(i, 80, 8, store[count]);
            }
                
        }
        count++;
          
    }
     context.stroke();
       
    }


function fun3() {
    let btn = document.getElementById("playpause")
    
   
    if (btn.value === "0") {
        btn.innerHTML=`<i class="fas fa-play"></i>`
        btn.value="1"
        audio.pause();
    }
    else {
        btn.value = "0";
        btn.innerHTML=`<i class="fas fa-pause"></i>`
        audio.play()
      
        color();
        
    }
    
}


let timer = null;

function color() {
    console.log("hfdh")
    timer = setInterval(() => {
        console.log(a,"value of a");
        dispaly("jhk",a)
        a += screensize/songlengthinsec;
    }, 1000);

}


audio.onpause = function (e) {
    console.log(e);
    clearInterval(timer)
    a = parseInt(audio.currentTime)*20;
}


// audio.addEventListener("click", function (e) {
//     console.log(e);
//     console.log("hi")
// })


window.onresize = function(){ location.reload(); }
