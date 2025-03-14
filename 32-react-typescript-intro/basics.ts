// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;  //can be int or float

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];


// type alias
// this is a type definition
type Person = {
        name: string;
        age: number;
};

let person: Person;   // creating an object to type Person

person = {
        name: 'Max',
        age: 32
};

// person = {
//   isEmployee: true
// };


// let people: {
//         name: string;
//         age: number;
// }[];  // an array of objects

// With type alising, you can redefine the above commented object as this:
let people: Person[];


// Type inference
// let course = 'React - The Complete Guide';
// course = 12341;   // results in error because in the previous line TS infers that course is string type.

// Union types: means it can be string or number
let course: string | number = 'React - The Complete Guide';
course = 12341;


// Functions & types
function add(a: number, b: number) {
        return a + b;  // this is also type inference as the TS infers the return type of this function
}

function print(value: any) {  // "any" type is OK here since we are only printing the input
        console.log(value);
}

// Generics
// <T> means generic type. you can make the type whatever inside the <>
// This makes the function type-safe and flexible
function insertAtBeginning<T>(array: T[], value: T) {
        const newArray = [value, ...array];
        return newArray;
}

const demoArray = [1, 2, 3];

// Now TS understands updatedArray is number[]
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

// Now TS understands updatedArray is string[]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')

// this will error because the types don't match
// in insertAtBeginning we defined both inputsto be of type T
// const testArray =  insertAtBeginning(['a', 'b', 'c'], 1)  

// updatedArray[0].split(''); // this gives a warning because TS knows updatedArray is number[] and split won't work on it