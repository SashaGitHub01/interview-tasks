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

function myPromiseAll<T>(promises: (Promise<T> | T)[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const result: T[] = [];
    let completed = 0;

    // Обрабатываем каждый промис
    promises.forEach((promise, index) => {
      // Если это не промис, обрабатываем как обычное значение
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value; // Сохраняем результат в правильном порядке
          completed++;

          // Если все промисы выполнены, решаем новый промис
          if (completed === promises.length) {
            resolve(result);
          }
        },
        (error) => {
          // Если хотя бы один промис отклонён, отклоняем весь промис
          reject(error);
        }
      );
    });
  });
}

function any<T>(promises: (Promise<T> | T)[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let errors: any[] = [];
    let count = 0;

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors.push(error);
          count++;

          if (count === promises.length) {
            reject(new Error("All promises were rejected"));
          }
        });
    });
  });
}

function race<T>(promises: (Promise<T> | T)[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}
