// initial declaration ov variable
let songlengthinsec = null;
let box = document.querySelector('#myCanvas');
let screensize=box.offsetWidth
var elemLeft = null;

var context = null;
var e = null;

let a = 1;
let audio = document.getElementById("audio");

songlengthinsec = audio.duration||227;
var store = [];


// added to onlaod creating bargraph using canvas
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


//implented bar graph onclick functionality
function dispaly(event,second) {
    
    if (second) {
       var xVal = second;
    }
    else {
        var xVal = parseInt(event.pageX - elemLeft)
       
        let audioSetTime = xVal * (songlengthinsec / screensize);
      
        audio.currentTime = audioSetTime;
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

//on click play pause btn functionality
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

//clear time interval,
let timer = null;
function color() {
 
    timer = setInterval(() => {
       
        dispaly("event",a)
        a += screensize/songlengthinsec;
    }, 1000);

}

//on pause stroting the curent-media-time
audio.onpause = function (e) {
    console.log(e);
    clearInterval(timer)
    a = parseInt(audio.currentTime)*20;
}




//refresh the page  on change screen size
window.onresize = function(){ location.reload(); }
