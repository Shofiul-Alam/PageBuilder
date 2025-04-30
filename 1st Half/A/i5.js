
//Fat Arrow Function and This Keyword //

setTimeout(()=> console.log('Hello9'), 1000);

function fn(){
    console.log(this);
}
//fn();


var button = document.querySelector('button');
var fn2 =()=> console.log(this);

function fn(){
    console.log(this);
}
button.addEventListener('click', fn2);