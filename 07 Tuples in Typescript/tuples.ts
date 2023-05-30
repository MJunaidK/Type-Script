// Defining a tuple
type ThreeDCoordinates = [x: number, y: number, z: number];

function add3DCoordinates(
  c1: ThreeDCoordinates,
  c2: ThreeDCoordinates
): ThreeDCoordinates {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinates([0, 0, 0], [10, 10, 10]));

// Tuples with different types
function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1getter, str1setter] = simpleStringState('hello');
const [str2getter, str2setter] = simpleStringState('Junaid');
console.log(str1getter());
console.log(str2getter());
str1setter('Welcome');
console.log(str1getter());
console.log(str2getter());
