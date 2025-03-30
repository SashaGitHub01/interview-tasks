{
  // obj - это обьект, key - ключ, который должен быть только ключом, который есть в этом обьекте
  const getObjField = <T extends object>(obj: T, key: keyof T) => {
    return obj[key];
  };

  // getObjField({a: "1"}, "a");
}
{
  const getLength = <T extends {length: number}>(data: T): number => {
    return data.length;
  };

  getLength([1, 2, 3]);
  getLength({length: 777});
}

{
  // КАК МЫ МОЖЕМ  ПРОВЕРИТЬ ЧТО ОБЬЕКТ с типом unknown, принадлежит типу TUser, и вызвать его метод без ошибки
  // obj1.getName();
  type TUser = {
    name: string;
    getName: () => string;
  };

  const obj1: unknown = {
    name: "user1",

    getName() {
      return this.name;
    },
  };

  const isUser = (item: unknown): item is TUser => {
    return typeof item === "object" && item !== null && "name" in item;
  };

  if (isUser(obj1)) {
    obj1.getName();
  }
}

{
  type MyReturnType<F extends Function> = F extends (...args) => infer R
    ? R
    : never;

  type MyOmit<T extends object, K extends keyof T> = {
    [Key in keyof T as Exclude<Key, K>]: T[Key];
  };

  type MyPick<T extends object, K extends keyof T> = {
    [Key in K]: T[Key];
  };

  type TestOmit = MyOmit<{a: string; b: string; c: number}, "c" | "b">;
  type TestPick = MyPick<{a: string; b: string; c: number}, "c" | "b">;
}
