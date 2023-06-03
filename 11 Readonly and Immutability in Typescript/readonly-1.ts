// Readonly in Interfaces
interface Cat1 {
  readonly name: string;
  breed: string;
}

function makeCat1(name: string, breed: string): Cat1 {
  return {
    name,
    breed,
  };
}

interface Cat {
  name: string;
  breed: string;
}

// Readonly utility type
type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const usul = makeCat('Usul', 'Tabby');
//usul.name = 'Piter';

// Readonly tuples
function makeCoordinates(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinates(10, 20, 30);
c1[0] = 50;

// Immutable Arrays
const reallyConst = [1, 2, 3] as const;
reallyConst[0] = 50;
