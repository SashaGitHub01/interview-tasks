import React, {useEffect, useState} from "react";

// ========================== 1
{
  // Написать таймер, который можно останавливать
  function ReactInput() {
    const [time, setTime] = useState(0);

    return (
      <div className="App">
        <div>Time: {time}</div>
        <button>Start</button>
        <button>Stop</button>
      </div>
    );
  }
}

// ========================== 2
{
  // зарефакторить код
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

// ========================== 3
{
  // чему будет равен count после 1 клика
  // выведется ли в консоль Count-render после клика

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

// ========================== 4
{
  const useDebounce = (value) => {};

  // Сделать так, чтобы вызов API происходил не при каждом изменении текста.
  function ReactInput() {
    const [text, setText] = useState("");

    const onChange = (e) => {
      setText(e.target.value);
    };

    useEffect(() => {
      console.log("some API call with: ", text);
    }, [text]);

    return (
      <div className="App">
        <input onChange={onChange} type="text" value={text} />
      </div>
    );
  }
}
