const hamburgerButton = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');

        hamburgerButton.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });

let slide =document.querySelectorAll('.slide');
var current=0;
function cls(){
    for(let i=0;i<slide.length;i++){
        slide[i].style.display="none";
    }
}
 
function next(){
    console.log('hi')
    cls();
    console.log('hi')
    if(current===slide.length-1)current=-1;
    current++;

    slide[current].style.display='block';
    slide[current].style.opacity=0.4;

    var x=0.4;
    var intX=setInterval(() => {
        x+=0.1;
        slide[current].style.opacity=x;
        if(x>=1){
            clearInterval(intX);
            x=0.4;
        }
    }, 100);
}

function prev(){
    console.log('hi')
    cls();
    console.log('hi')
    if(current===0)current=slide.length;
    current--;

    slide[current].style.display='block';
    slide[current].style.opacity=0.4;

    var x=0.4;
    var intX=setInterval(() => {
        x+=0.1;
        slide[current].style.opacity=x;
        if(x>=1){
            clearInterval(intX);
            x=0.4;
        }
    }, 100);
}

function start(){
    cls();
    slide[current].style.display="block";
}
start();



console.log(navbar)
window.addEventListener('scroll',function(){
    if(window.scrollY>=56){
        navbar.style.background="rgba(255, 254, 254, 0.837)";
        
    }else if(window.scrollY<56){
        navbar.style.background="transparent";
        
    }
});