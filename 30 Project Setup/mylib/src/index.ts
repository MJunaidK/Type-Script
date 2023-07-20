export const introduceMyself = (first: string, last: string) =>
  `Hello ${last} ${first}`;

export const borgName = (): string => {
  const members = Math.round(5 + Math.random() * 5) + 1;
  const member = Math.floor(Math.random() * members) + 1;

  return `Your borg name is ${member} of ${members}`;
};

export const junaid = () => '';
