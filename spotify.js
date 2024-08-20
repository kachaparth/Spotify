

var song = [];
var preplay = 0;
var current = [];
var next = [];
var live = -1;
var listof;
// var ele;
var state = 0;
async function fech() {
    let ap = await fetch("http://127.0.0.1:3000/songs/")
    let response = await ap.text();


    let div = document.createElement("div");
    div.innerHTML = response;

    let link = div.getElementsByTagName("a");



    for (let i = 1; i < link.length; i++) {
        song.push(link[i].href);
    }
    for (let i = 1; i < song.length; i++) {
        let list = document.querySelector(".head-li");
        var ele = document.createElement("div");
        //  ele.innerHTML= link[i].innerText;
        let s = link[i].innerText;
        let st = s.substring(0, s.indexOf("."))
        ele.innerHTML = st;
        list.append(ele);
        ele.setAttribute("class", "songlist roboto-regular")

    }
    playsong();
    pauseplay();
    prebutton();
    nextbtn();
    autonext();

    //    setc();
}
fech();

function playsong() {
    listof = document.querySelectorAll(".songlist");
    let div = document.querySelectorAll(".songlist");
    console.log(listof);

    for (let i = 0; i < div.length; i++) {

        div[i].addEventListener("click", () => {
            if (preplay != 0) {
                preplay.pause();
                listof[live].removeAttribute("style");

                forprevious(live);
            }
            else {
                forprevious(i);

            }

            //  div[i].removeEventListener("cluck")
            let x = new Audio(song[i]);
            playaudio(x);
            live = i;
            listof[live].setAttribute("style", "color:#1dd65f;");
        })


    }

}
var btn = document.querySelector(".playp");
function playaudio(x) {

    preplay = x;
    tt();
    state = 1;
    x.play();
    btn.setAttribute("src", "./svg/pause.svg");
}
function pauseaudio(x) {
    //   let xxt= new Audio(x);
    btn.setAttribute("src", "./svg/playblack.svg ");
    state = 0;
    x.pause();

}


function pauseplay() {

    btn.addEventListener("click", () => {
        playbutton();
    })


    document.body.addEventListener("keypress", (evt) => {

        if (evt.key == " ") {
            playbutton();
        }

    })
    document.body.addEventListener("keydown", (evt) => {

        if (evt.key == "ArrowRight") {
            nextevent();
        }

    })

}
function playbutton() {
    if (state == 0) {
        if (preplay == 0) {
            let x = new Audio(song[0]);
            live = 0;
            listof[live].setAttribute("style", "color:#1dd65f;");
            playaudio(x);
        }
        else {
            playaudio(preplay);
            listof[live].setAttribute("style", "color:#1dd65f;");
        }

    }
    else {

        pauseaudio(preplay);
        listof[live].removeAttribute("style");
    }
}

var prebtn = document.querySelector(".prebtn");
function prebutton() {
    prebtn.addEventListener("click", () => {


        if (current.length != 0) {
            if (state == 1)
                preplay.pause();

            listof[live].removeAttribute("style");


            let indx = current[current.length - 1];

            // if(indx==live)
            current.pop()
            next.push(live);

            let x = new Audio(song[indx]);
            live = indx;
            playaudio(x);
            listof[live].setAttribute("style", "color:#1dd65f;");

        }

        console.log("current" + current)
        console.log("live = " + live)
        console.log("next" + next)
    })

}


function nextbtn() {
    var nxtbtn = document.querySelector(".nxtbtn")

    nxtbtn.addEventListener("click", () => {
        nextevent();
    })


}
function forprevious(inx) {
    if (current.length && current[current.length - 1] != inx) {
        current.push(inx);

    }
    else if (current.length == 0) {
        current.push(inx);
    }
    console.log(current);

}

function nextevent() {
    if (next.length) {
        let indx = next[next.length - 1];

        if (state == 1) {
            pauseaudio(preplay);
            listof[live].removeAttribute("style");
            forprevious(live);
        }
        else {
            forprevious(indx)
        }

        let x = new Audio(song[indx]);
        playaudio(x);
        live = indx;
        listof[live].setAttribute("style", "color:#1dd65f;");
        next.pop();
    }
    else {
        if (state == 1) {
            pauseaudio(preplay);
            listof[live].removeAttribute("style");

            forprevious(live);
        }
        else {
            forprevious(live + 1);
        }
        let x = new Audio(song[(live + 1) % song.length]);
        playaudio(x);
        live = live + 1;
        listof[live].setAttribute("style", "color:#1dd65f;");


    }
    console.log("current" + current)
    console.log("live = " + live)
    console.log("next" + next)
}

function autonext() {

    setInterval(() => {

        if (preplay.ended) {
            console.log("hwllo");
            nextevent();
        }
    }, 100);

}

// ()=>{
    // preplay.addEventListener("timeupdate" , ()=>{
    //     console.log("hijijishihsi")
    //   sett(preplay.timeUpdate(),preplay.duration() )
    // })
// }


function sett(a, b) {


    let tbox = document.querySelector(".time");
    tbox.innerText = `${(formatTime(a))}/${formatTime(b)}`
}
function formatTime(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Format seconds to always be two digits
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
    // Return the formatted time
    return `${Math.floor(minutes).toString().padStart(2,"0")}:${Math.floor(formattedSeconds).toString().padStart(2,"0")}`;
}

// setInterval(()=>{
//     if(preplay != 0 && !preplay.paused){

//         console.log("chodu");
//     }
// },100)

  var seek= document.querySelector(".seekbar");
  var seekgreen= document.querySelector(".finished");
  var crc = document.querySelector(".circle");
  let w = seek.clientWidth;
  
 
function tt()
{ 
      seek.addEventListener("click",(e)=>{
    console.log(e.offsetX/w  * preplay.duration)
    preplay.currentTime = e.offsetX/w  * preplay.duration;
    

 })
preplay.addEventListener('timeupdate', function() {
    // Update the display with the current time of the video
    sett(preplay.currentTime,preplay.duration)
    seekgreen.style.width=((preplay.currentTime/preplay.duration * 100) -0.7 )+ "%";
       crc.style.left = ((preplay.currentTime/preplay.duration * 100) -0.7 )+ "%" ;
});
}



