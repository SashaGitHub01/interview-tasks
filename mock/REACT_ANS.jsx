import React, {useEffect, useState} from "react";

{
  function ReactCounter() {
    const [time, setTime] = useState(0);
    const [isStopped, setIsStopped] = useState(true);

    useEffect(() => {
      if (isStopped) return;

      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, [isStopped]);

    return (
      <div className="App">
        <div>Time: {time}</div>
        <button onClick={() => setIsStopped(false)}>Start</button>
        <button onClick={() => setIsStopped(true)}>Stop</button>
      </div>
    );
  }
}

{
  // 1) useEffect не должен быть async — он ожидает, что ты вернёшь функцию очистки, а не Promise.
  // 2) heavyFunc() будет вызываться при каждом ререндере, даже если состояние не изменяется.
  //    Это может вызвать лишнюю нагрузку, особенно если функция действительно тяжёлая.
  //    useState(() => heavyFunc()) - Это гарантирует, что heavyFunc() вызовется один раз при маунте
  // 3) Анонимные функции в addEventListener/removeEventListener
  // 4) React использует key для отслеживания элементов между рендерами.
  // 5) массив вынести в глобальную область
  // 6) разделить логику на 2 юзеффекта
  // 7) семантическую верстку

  // import React, {useState} from "react";

  const fetchNumber = () => Promise.resolve(Math.random());

  const heavyFunc = () => {
    return Math.random();
  };

  const App = () => {
    const [number, setNumber] = useState();
    const [scroll, setScroll] = useState();

    const [data, setData] = useState(heavyFunc());

    React.useEffect(async () => {
      setNumber(await fetchNumber());

      window.addEventListener("scroll", () => setScroll(window.scrollY));

      return () => {
        window.removeEventListener("scroll", () => setScroll(window.scrollY));
      };
    }, []);

    return (
      <div>
        <div>{number}</div>
        <div>{scroll}</div>

        {[1, 2, 3, 4].map((el) => (
          <div>{el}</div>
        ))}
      </div>
    );
  };

  // export default App;
}

{
  //   Все три вызова setCount(count + 1) используют одно и то же значение count — текущее 0.
  // Поэтому фактически каждый вызов равен setCount(1).
  // React сгруппирует одинаковые обновления состояния и применит только одно.
  // Результат:
  // count === 1
  // Компонент перерендерится один раз

  // чему будет равен count после 1 клика?
  // выведется ли в консоль Count-render после клика?

  const Counter = () => {
    const [count, setCount] = useState(0);

    const onClick = () => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    };

    return (
      <div>
        <div>{count}</div>
        <button onClick={onClick}>increment</button>

        <Count />
      </div>
    );
  };

  const Count = () => {
    console.log("Count-render");

    return <div>Count component</div>;
  };
}

{
  const useDebounce = (value, timeout) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounced(value);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }, [value]);

    return debounced;
  };

  // Сделать так, чтобы вызов API происходил не при каждом изменении текста.
  function ReactInput() {
    const [text, setText] = useState("");

    const debounced = useDebounce(text, 700);

    const onChange = (e) => {
      setText(e.target.value);
    };

    useEffect(() => {
      console.log("some API call with: ", debounced);
    }, [debounced]);

    return (
      <div className="App">
        <input onChange={onChange} type="text" value={text} />
      </div>
    );
  }
}
