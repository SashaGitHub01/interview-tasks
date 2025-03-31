import React, {PropsWithChildren} from "react";

// Порядок логов:
// A1 B1 B2 A2 useLayoutEffect B1, useLayoutEffect B2, useLayoutEffect A1, useLayoutEffect A2, useEffect B1, useEffect B2, useEffect A1, useEffect A2

// A1
// B1
// B2
// A2
// useLayoutEffect B1
// useLayoutEffect B2
// useLayoutEffect A1
// useLayoutEffect A2
// useEffect B1
// useEffect B2
// useEffect A1
// useEffect A2

// force update
// A1
// B1
// B2
// A2
// cleanup useLayoutEffect A1 0
// useLayoutEffect A1
// cleanup A1 0
// useEffect A1

export default function App() {
  const [num, setNum] = React.useState(0);
  window.forceUpdate = () => setNum((prev) => prev + 1);

  return (
    <div className="App">
      <A1 num={num}>
        <B1 />
        <B2 />
      </A1>
      <A2 />
    </div>
  );
}

export const A1 = ({children, num}) => {
  console.log("A1");

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect A1");

    return () => {
      console.log("cleanup useLayoutEffect A1", num);
    };
  }, [num]);

  React.useEffect(() => {
    console.log("useEffect A1");

    return () => {
      console.log("cleanup A1", num);
    };
  }, [num]);

  return <div>{children}</div>;
};

export const B1 = () => {
  console.log("B1");

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect B1");

    return () => {
      console.log("cleanup useLayoutEffect B1");
    };
  }, []);

  React.useEffect(() => {
    console.log("useEffect B1");

    return () => {
      console.log("cleanup B1");
    };
  }, []);

  return <div />;
};

export const B2 = () => {
  console.log("B2");

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect B2");

    return () => {
      console.log("cleanup useLayoutEffect B2");
    };
  }, []);

  React.useEffect(() => {
    console.log("useEffect B2");

    return () => {
      console.log("cleanup B2");
    };
  }, []);

  return <div />;
};

export const A2 = () => {
  console.log("A2");

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect A2");

    return () => {
      console.log("cleanup useLayoutEffect A2");
    };
  }, []);

  React.useEffect(() => {
    console.log("useEffect A2");

    return () => {
      console.log("cleanup A2");
    };
  }, []);

  return <div />;
};
