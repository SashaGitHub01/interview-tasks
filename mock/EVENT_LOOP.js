// ================ 1
{
  setTimeout(function timeout() {
    console.log("Таймаут");
  }, 0);

  let p = new Promise(function (resolve, reject) {
    console.log("Создание промиса");
    resolve();
  });

  p.then(function () {
    console.log("Обработка промиса");
  });

  console.log("Конец скрипта");

  // Создание промиса
  // Конец скрипта
  // Обработка промиса
  // Таймаут
}

// ================ 2
{
  console.log(1);

  setTimeout(() => console.log(2));

  Promise.resolve().then(() => console.log(3));

  Promise.resolve().then(() => setTimeout(() => console.log(4)));

  Promise.resolve().then(() => console.log(5));

  setTimeout(() => console.log(6));

  console.log(7);

  // 1
  // 7
  // 3
  // 5
  // 2
  // 6
  // 4
}

// ================ 3
{
  console.log(1);

  setTimeout(function timeout() {
    console.log("Таймаут");
  }, 0);

  new Promise(function (resolve, reject) {
    console.log("Promise");
    setTimeout(() => {
      console.log(777);
      resolve();
    }, 0);
  })
    .then(() => {
      console.log("then1");
    })
    .then(() => {
      console.log("then2");
    });

  console.log(4);

  setTimeout(() => {
    console.log("timeOut2");
  }, 0);

  // 1
  // Promise
  // 4
  // Таймаут
  // 777
  // then1
  // then2
  // timeOut2
}

// ================ 4
{
  console.log(1);

  setTimeout(() => console.log(2));

  Promise.reject(3).catch(console.log);

  new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));

  Promise.resolve(5).then(console.log);

  console.log(6);

  setTimeout(() => console.log(7), 0);

  // 1
  // 6
  // 3
  // 5
  // 2
  // 4
  // 7
}

// =================== 5
{
  console.log(1);

  new Promise((resolve, reject) => {
    console.log(2);

    setTimeout(() => {
      resolve();
      console.log(3);
    }, 0);
  })
    .then(() => console.log(4))
    .then(() => console.log(5));

  setTimeout(() => {
    console.log(6);
  }, 0);

  console.log(7);

  // 1
  // 2
  // 7
  // 3
  // 4
  // 5
  // 6
}

{
  // ================ 6
  // что из этого заблокирует поток
  while (true) {}

  const loop1 = () => new Promise((res) => res(1)).then(loop1);
  loop1();

  const loop2 = () => setTimeout(loop2, 0);
  loop2();

  // 1.  while (true) {} бесконечный синхронный цикл.
  // Он занимает главный поток полностью, не позволяя браузеру или Node.js выполнять ничего другого:

  // 2. Блочит, т.к. event loop не переходит к след. итерации и очередям пока очередь микрозадач забита

  // 3. Не блокирует, за итерацию ~1 макротаска
}

// 1
{
  const run = () => {
    new Promise((res, rej) => {
      rej("error");
    })
      .then(
        (val) => {
          console.log(1);
          return val;
        },
        () => {
          console.log(2);
          throw new Error("test");
        }
      )
      .finally(() => console.log(3))
      .catch((err) => {
        console.log(4, err);
        return err;
      })
      .finally(() => console.log(5))
      .then((val) => {
        console.log(6);
        return val;
      });
  };

  //   run();

  // 1.
  // 2.
  // 3.
  // ...

  // 2 3 4 5 6
}

// 2
{
  const run = () => {
    console.log(1);

    setTimeout(function () {
      console.log(2);
    }, 0);

    Promise.resolve()
      .then(function () {
        console.log(3);
      })
      .then(function () {
        console.log(4);
      });

    console.log(5);
  };

  // run();

  // 1 5 3 4 2
}

// 3
{
  const run = () => {
    console.log("begins");

    new Promise((res) => {
      console.log("promise executor");
      res("");
    }).then(() => {
      console.log("promise 1");
    });

    setTimeout(() => {
      console.log("setTimeout 1");

      Promise.resolve().then(() => {
        console.log("promise 2");
      });
    }, 0);

    new Promise(function (resolve) {
      console.log("promise 3");

      setTimeout(function () {
        console.log("setTimeout 2");
        resolve("");
      }, 0);
    }).then((res) => {
      console.log("dot then 1");

      setTimeout(() => {
        console.log("then setTimeout 1");
      }, 0);
    });

    console.log("end");
  };

  // run();

  // 1.
  // 2.
  // 3.
  // ...
}
