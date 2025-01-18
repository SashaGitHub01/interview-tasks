type MyReturnType<F extends Function> = F extends (...args) => infer R
  ? R
  : never;

type MyOmit<T extends object, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type MyPick<T extends object, K extends keyof T> = {
  [Key in K]: T[Key];
};

type TestOmit = MyOmit<{a: string; b: string; c: number}, "c" | "b">;
type TestPick = MyPick<{a: string; b: string; c: number}, "c" | "b">;

