{
  // obj - это обьект, key - ключ, который должен быть только ключом, который есть в этом обьекте
  const getObjField = (obj, key) => {
    return obj[key];
  };

  // getObjField({a: "1"}, "a");
  // getObjField({a: "1"}, "test"); // ts err
}

{
  const getLength = (data) => {
    return data.length;
  };

  getLength([1, 2, 3]);
  getLength({length: 777});
  getLength({}); // ts error
}

{
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

  // КАК МЫ МОЖЕМ  ПРОВЕРИТЬ ЧТО ОБЬЕКТ с типом unknown, принадлежит типу TUser, и вызвать его метод без ошибки
  // obj1.getName();

  if (isUser(obj1)) {
    obj1.getName();
  }
}

{
  // type TOmited = MyOmit<{a: string; b: string; c: number}, "c" | "b">;
  // type TPicked = MyPick<{a: string; b: string; c: number}, "c" | "b">;
}
