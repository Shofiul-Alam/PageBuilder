//Iterator Basic

// let array = [1,2,3];
// let it = array[Symbol.iterator]();

// console.log(it.next())
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());


// //Iterator In Actions

// let array = [1,2,3];

// array[Symbol.iterator]= function(){

//   let nextValue = 10 ;
//   return{
//     next: function(){
//       nextValue++; 
//       return{
//         done: nextValue > 15? true :false,
//         value: nextValue
//       };
    
//      }
    
//   };

// }
// for (let element of array){
  
//   console.log(element);
// }

//Creating a Custom Iteratable Object

// let person = {
//     name: 'Max',
//     hobbies: ['Sports', 'Cooking'],
//     [Symbol.iterator]: function(){
//       let i =0; 
//       let hobbies = this.hobbies;
//       return {
//         next: function(){
//           let value = hobbies[i];
//           i++;
//         return {
//           done: i > hobbies.length ? true : false,
//           value: value
//           };
//         }
//       };
//     }
  
//   };
  
//   for(let hobby of person){
  
//     console.log(hobby);
//   }



// Generatic Basics
// function *select() {
  
//     yield 'House';
//     yield 'Garage';
   
    
//   }
//   let it = select();
//   console.log(it.next());
//   console.log(it.next());
//   console.log(it.next());
  


// Controlling Iterators with through and return

// let obj = {
  
//     [Symbol.iterator]: gen
//   }
//   function *gen(){
//     yield 1;
//     yield 2;
//   }
//   for (let element of obj){
//     console.log(element);
//   }
  
// // Controlling Iterators with through and return

// function *gen(end){
//     for(let i = 0; i <end; i++){
//       yield i;
//     }
      
//   }
//   let it = gen(2);
  
//   console.log(it.next());
//   console.log(it.return('An error ocurred'));
//   console.log(it.next());
//   console.log(it.next());
  



// let cardAce = {
//     name: 'Ace of Spades'
//   };
  
//   let cardKing ={
//     name: 'King of Clubs'
//   };
  
//   let deck = new Map();
//   deck.set('as', cardAce);
//   deck.set('kc', cardKing);

//Maps Managing Items



// let cardAce = {
//     name: 'Ace of Spades'
//   };
  
//   let cardKing ={
//     name: 'King of Clubs'
//   };
  
//   let deck = new Map();
//   deck.set('as', cardAce);
//   deck.set('kc', cardKing);
  
  
//   deck.clear('as');
  
//   console.log(deck.get('as'));
  

//Maps Looping throug maps



// let cardAce = {
//     name: 'Ace of Spades'
//   };
  
//   let cardKing ={
//     name: 'King of Clubs'
//   };
  
//   let deck = new Map();
//   deck.set('as', cardAce);
//   deck.set('kc', cardKing);
  
  
//   for(entry of deck.entries()){
//     console.log(entry);
//   }
  

//The WeakMap


// let cardAce = {
//     name: 'Ace of Spades'
//   };
  
//   let cardKing ={
//     name: 'King of Clubs'
//   };
  
//   let key1 = {a:1};
//   let key2 ={b:2};
  
  
  
  
//   let deck = new WeakMap();
//   deck.set(key1, cardAce);
//   deck.set(key2, cardKing);
  
//   console.log(deck.get(key1));

// let set = new Set([1, 1, 1]);

// set.add(2);

// for(element of set){
//   console.log(element);
// }


//Sets Managing items

// let set = new Set([1, 1, 1]);

// set.add(2);

// console.log(set.has(1));

// for(element of set){
//   console.log(element);
// }

//Sets Looping throug Sets

// let set = new Set([1, 1, 1]);

// set.add(2);


// for(element of set.values()){
//   console.log(element);
// }

//Sets Wrap Up

// let set = new Set([1, 1, 1]);

// set.add(2);


// for(element of set){
//   console.log(element);
// }




//The WeakSet


// let obj1 = {a:1};
// let obj2 = {b:2};


// let set = new WeakSet([obj1, obj2, obj2]);


// set.delete(obj2);

// console.log(set.has({b:2}));
// set.add(obj1);