const beforeLoad = 'beforeLoad';
const loading = 'loading';
const loaded = 'loaded';

//const isLoading = (state: string) => state === loading;
//console.log(isLoading('dog'));

// Enumeration
enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}

// define a key using enum
const englishLoadingStates = {
  [LoadingState.beforeLoad]: 'Before Load',
};

const isLoading = (state: LoadingState) => state === loading;
console.log(isLoading(LoadingState.beforeLoad));

// Literal Types
function rollDice(dice: number): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5 + 1);
  }
  return pip;
}

console.log(rollDice(4));

// Numeric literal: Constrain that number down to 1,2,3 only
function rollDice1(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5 + 1);
  }
  return pip;
}

//console.log(rollDice1(4));
console.log(rollDice1(3));

// String literals
function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 98378937 });
