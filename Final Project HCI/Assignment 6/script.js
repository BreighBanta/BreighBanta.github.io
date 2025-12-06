var names=["Red","Orange","Yellow","Green","Blue","Purple","Pink","White"];
var info={
    Red: "Passion, excitement, love",
    Orange: "Warm",
    Yellow: "Positivity, enthusiasm, happiness",
    Green: "Growth",
    Blue: "Sadness",
    Purple: "Cool",
    Pink: "Fresh",
    White: "Truth"
};
var wheel= document.getElementById("wheel");
var spinBtn=document.getElementById("spinBtn");
var result=document.getElementById("result");
var total=0;
var current=0;
var slice=360/names.length;
var picked=0;
var spins = 5 * 360;
const spinSound=document.getElementById('spinSound');//sound variable

function mod360(x){
    var r=x%360;
    return r<0?(r+360):r;
}

function centerAngle(i) {
    return i*slice + slice/2;
}

spinBtn.onclick=function(){
    picked=Math.floor(Math.random()*names.length);
    var target=centerAngle(picked);
    var baseDelta=mod360(360-target-current);
    total=total+baseDelta+spins;
    current=mod360(total);
    result.textContent="Spinning...";
    spinBtn.disabled=true;
    wheel.style.transform = "rotate("+total+"deg)";
    
    spinSound.play();//added sound
};

wheel.addEventListener("transitionend", function(){
    var colorname=names[picked];
    result.textContent= colorname +":"+" "+ info[colorname];//had trouble getting this to display right
    spinBtn.disabled=false;
})


