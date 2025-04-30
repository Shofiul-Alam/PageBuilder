// Hoisting in ES6


let age ;
age =27 ;
console.log(age);

function dosSmth(){
    age = 27;
}

let age;
dosSmth();
console.log(age);


