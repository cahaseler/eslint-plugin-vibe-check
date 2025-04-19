// This is a sample file to test the max-file-lines rule
// This file has exactly 301 lines, which should trigger the default max of 300

'use strict';

// The rest of the file is just filler content to create 301 lines
function exampleFunction() {
  console.log('This is an example function');
}

const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

class ExampleClass {
  constructor() {
    this.value = 0;
  }

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  getValue() {
    return this.value;
  }
}

// Generate a lot of lines to hit our 301 line count
const generateLines = (count) => {
  for (let i = 0; i < count; i++) {
    // Each line below adds to our total
    console.log(`Line ${i + 1}`);
  }
};

// Calling with a large number to generate many lines
generateLines(270); // This will generate 270 lines in this location