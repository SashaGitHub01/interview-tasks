"use strict";

{
  {
    const obj = {
      name: "John",
      surname: "Wick",

      getName: () => {
        return this.name;
      },

      getFullName() {
        return `${this.name} ${this.surname}`;
      },
    };

    // console.log(obj.getName(), obj.getFullName());

    // ANS: undefined John Wick
  }

  {
    // ## this
    // Дело в том, что обычный объект не предоставляет свой собственный контекст, к которому стрелочная функция могла бы привязаться в момент создания
    // У класса, в отличие от объекта в JS, есть собственный контекст, к которому в момент создания стрелочная функция может привязаться
    // Когда вы создаете метод обычным способом, то он записывается в прототип класса, и когда вы создаете новый экземпляр, то он содержит ссылку на метод родителя, что экономит ресурсы. А если вы решили использовать стрелочную функцию, то она не будет записана в прототип, и будет копироваться каждый раз заново.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      getName() {
        console.log(this.name);
      }
      getAge = () => {
        console.log(this.age);
      };
    }

    const user = new User("Jake", 25);

    user.getName();
    user.getAge();
    const {getAge, getName} = user;
    getName();
    getAge();

    // ANS: Jake 25 !Err! 25
  }
}

{
  ///============= 0
  // var — function scoped, и к моменту вызова setTimeout(...), цикл уже завершён → i === 3.
  // Все колбэки замыкаются на одну и ту же переменную i, которая изменилась до 3

  for (var i = 0; i < 3; i++) {
    // setTimeout(() => console.log(i), 1000);
  }

  /**
  // Это значит, что setTimeout сохраняет копию значения i на момент вызова, и потом передаёт его как arg в твою функцию.

  for(var i = 0; i < 3; i++) {
    // setTimeout((arg) => console.log(arg) , 1000, i) 
}

//======
// Это значит, что setTimeout сохраняет копию значения i на момент вызова, и потом передаёт его как arg в твою функцию.

for(var i = 0; i < 3; i++) {
    (function(arg){
        // setTimeout(() => console.log(arg) , 1000) 
    })(i)
}
*/
}

// Part 2
//
//
//
//
//
//

// ======================== 1
{
  console.log(a); //
  console.log(b); //

  let b = 1;
  var a = 2;

  // ANS
  // undefined
  // ref err cant access before init
}
// ======================== 2
{
  const getter = (bool) => {
    if (bool) {
      var x = 10;
    }

    console.log(x);
  };

  getter(true); //
  getter(false); //

  // ANS: переменная, объявленная через var, существует в пределах всей функции, независимо от блока (if, for, {} и т.д.).
  // let const - нет.
  // 10 undefined
}
// ======================= 4
{
  const obj = {a: 1, b: 2};

  const obj2 = obj;
  obj2.name = "name1";
  obj2.a = 10;

  console.log(obj.name === obj2.name); //
  console.log(obj.name); //
  console.log(obj.a); //

  // ANS
  // true
  // name1
  // 10
}

{
  let obj = {a: 1};
  let array = [obj];
  obj = {...obj, b: 5};

  console.log(obj); //
  console.log(array); //

  //  ANS Spread ({ ...obj }) — создаёт новый объект, а не мутирует исходный.
  // Ссылки, сохранённые ранее (например, в массиве), остаются на старый объект.
  // {a:1, b:5}
  // [{a:1}]
}

// ===================== 1
{
  const object = {
    name: "Name",

    getName: () => {
      console.log(this.name);
    },

    getName2() {
      console.log(this.name);
    },
  };

  object.getName(); //
  object.getName2(); //

  const fn = object.getName2;
  fn(); //

  fn.call(object); //

  // undefined
  // Name
  // undefined
  // Name
}
// ===================== 2
{
  function Cat() {
    this.name = "cat";

    this.getNameArrow = () => {
      console.log(this.name);
    };

    this.getName = function () {
      console.log(this.name);
    };
  }

  const cat = new Cat();
  cat.getNameArrow(); //
  cat.getName(); //

  const {getName, getNameArrow} = cat;

  getName(); //
  getNameArrow(); //

  // ANS
  // cat
  // cat
  // undefined
  // cat
}

// ===================== 4
{
  function Pet(name) {
    this.fullName = name;
  }

  const pet = new Pet("Dog");

  pet.logName = function () {
    console.log(this.fullName);
  };

  pet.logName();

  // Dog
}

// ===================== 3
{
  function foo() {
    const x = 10;

    return {
      x: 20,

      bar() {
        console.log(this.x);
      },

      baz: () => {
        console.log(this.x);
      },
    };
  }

  const obj1 = foo();
  obj1.bar(); //
  obj1.baz(); //

  const obj2 = foo.call({x: 30});
  let y = obj2.bar;
  let x = obj2.baz;

  y(); //
  x(); //

  obj2.bar(); //
  obj2.baz(); //

  // ANS
  // 20;
  // undefined;
  // undefined;
  // 30;
  // 20;
  // 30;
}
