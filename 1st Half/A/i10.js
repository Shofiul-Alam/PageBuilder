//The For Loop

let testResults =[1.23, 1.10, 4.1];
for(let restResult of testResults){
  console.log(testResults);
}

//Template litetarals

let name = 'Max';

let description =`
  Hello, I'm ${name + '!!!'} 
`;
console.log(description);

// **Destructing Arrays

let numbers = [1, 2, "3"];
let [a ="Default", b, c, d ="default"] = numbers;

console.log(a);



let a =5;
let b = 10;

[b, a]= [a, b];
console.log(b);
console.log(a);


let numbers =[1,2,3 ];

let [a, , c] =numbers;
console.log(a, c);

let [a, b] =[1, 2, 3];
console.log(a, b);

// **Destructing Object


let obj={
    name: 'Max',
    age: 27,
    greet: function(){
      console.log('Hello there!');
    }
  };
  let {name, greet} = obj;
  greet();