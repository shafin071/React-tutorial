// typescript does not run in the browser
// it is compiled to JS and then run in the browser
// to compile ts file type this command  in the terminal:
// npx tsc with-typescript.ts
function add(a, b) {
    return a + b;
}
var result = add(2, 5);
console.log(result);
