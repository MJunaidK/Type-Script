let userName: string = 'Junaid';
let hasLoggedIn: boolean = true;

userName += ' Khan';
console.log(hasLoggedIn);

let myNumber: number = 10;

let myRegex = /foo/;

const names: string[] = userName.split('');

const myValues: Array<number> = [1, 2, 3];

const myPerson: {
  first: string;
  last: string;
} = { first: 'Junaid', last: 'Khan' };

interface Person {
  first: string;
  last: string;
}

const myPerson1: Person = {
  first: 'Mohammad',
  last: 'Khan',
};

const ids = {
  10: 'a',
  20: 'b',
};

ids[30] = 'c';

const ids1: Record<number, string> = {
  10: 'a',
  20: 'b',
};

ids1[30] = 'c';

if (ids1[30] === 20) {
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));

const out: number[] = [1, 2, 3].map((v) => v * 10);
