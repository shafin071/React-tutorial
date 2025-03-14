// typescript does not run in the browser
// it is compiled to JS and then run in the browser
// to compile ts file type this command  in the terminal:
// npx tsc with-typescript.ts
// this compiles this code to JS and creates a .js version of this script.

function add(a: number, b: number) {
        return a + b;
      }
      
      const result = add(2, 5);
      
      console.log(result);