const obj1 = {
  name: 'John',
  age: 30,
  occupation: 'teacher',
};

const obj2 = {
  name: 'Jane',
  age: 30,
  occupation: 'teacher',
};

const updatedProperties = Object.keys(obj2);

console.log(updatedProperties);

// updatedProperties.forEach(element => {
//   console.log(obj1[element] === obj2[element]);
//   if (obj1[element] !== obj2[element]) {
//     validatedUpdates.push(element);
//   }
// });

// the filter() method has a return value, it doesnt just perform the operation
// on the existing array
const validatedUpdates = updatedProperties.filter(
  element => obj1[element] !== obj2[element]
);

console.log(validatedUpdates);
