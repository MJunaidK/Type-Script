// Defining functions
function addNumbers(a: number, b: number): number {
  return a + b;
}
// exports
export default addNumbers;

// const functions
export const addStrings = (str1: string, str2: string = ''): string =>
  `${str1} ${str2}`;

// union types
export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

// void functions
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

// promise functions
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

// Rest parameters
function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(' ')}`;
}

// typescript only enforces types at compile time not at run time
export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? 'first'} ${user?.last ?? 'second'}`;
}
