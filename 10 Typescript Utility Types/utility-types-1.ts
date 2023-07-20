// Partial<Type> : Constructs a type with all properties of Type set to optional.
interface MyUser {
  name: string;
  id: number;
  email?: string;
}

/*interface MyUserOptionals {
  name?: string;
  id?: string;
  email?: string;
}*/

type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: 'Junaid',
      id: 2,
      email: 'ju@junaid.com',
    },
    {
      email: 'khan@junaid.com',
    }
  )
);

// Required<Type>: Constructs a type consisting of all properties of Type set to required. The opposite of Partial.

type RequiredMyUser = Required<MyUser>;

// Pick<Type, Keys>: Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.

type JustEmailAndName = Pick<MyUser, 'name' | 'email'>;

// Record<Keys, Type>: Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

const mapById = (users: MyUser[]): Record<string, MyUser> => {
  return users.reduce((a, v) => {
    console.log('test ' + a, v);
    console.log('test ' + [v.id]);
    console.log(typeof [v.id]);
    console.log({
      ...a,
      [v.id]: v, // destructuring MyUser object id on the left with square bracket
    });
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};
declare const x: Record<'a', string>;
console.log(
  mapById([
    {
      id: 1,
      name: 'Junaid',
    },
    {
      id: 2,
      name: 'khan',
    },
  ])
);

// Omit<Type, Keys> Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals). The opposite of Pick.

type UserWithoutId = Omit<MyUser, 'id'>;
const mapById1 = (users: MyUser[]): Record<string, UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById1([
    {
      id: 1,
      name: 'Junaid',
    },
    {
      id: 2,
      name: 'khan',
    },
  ])
);

// Types from fields
const mapById2 = (users: MyUser[]): Record<MyUser['id'], UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById2([
    {
      id: 1,
      name: 'Junaid',
    },
    {
      id: 2,
      name: 'khan',
    },
  ])
);
