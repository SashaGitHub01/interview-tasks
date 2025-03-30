import React, { useEffect, useState, useCallback } from "react";

const getItemsRequest = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        { id: "1", name: "Jake" },
        { id: "2", name: "Will" },
        { id: "3", name: "Emmy" },
        { id: "4", name: "Nick" },
        { id: "5", name: "Jill" },
        { id: "6", name: "Andy" },
        { id: "7", name: "Bill" },
        { id: "8", name: "Jason" },
        { id: "9", name: "Billinton" },
        { id: "10", name: "Jar" },
        { id: "11", name: "Jack" },
      ]);
    }, 2000);
  });
};

const checkMetrics = () => {
  console.log("checkMetrics()");
};

// Отрефакторить код компонента
export default function App() {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const onClick = useCallback(() => {
    setIsVisible(!isVisible);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => checkMetrics());
  }, []);

  useEffect(() => {
    getItemsRequest().then((res) => {
      setItems(res);
    });
  }, []);

  return (
    <div>
      <button onClick={onClick}>{isVisible ? "Hide" : "Show"} list</button>
      {isVisible && <List items={items} />}
    </div>
  );
}

function List({ items }) {
  const [search, setSearch] = useState("");
  const [filtredItems, setFiltredItems] = useState([]);

  useEffect(() => {
    const newItems = items.filter((item) => item.name.includes(search));
    setFiltredItems(newItems);
  }, [search]);

  return (
    <>
      <div>
        <input type="text" />
        {filtredItems.map((item) => {
          return <div className="item">{item.name}</div>;
        })}
      </div>
    </>
  );
}
