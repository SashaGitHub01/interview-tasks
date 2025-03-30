import React, {useEffect, useState, useMemo} from "react";

// 1. any[] повсеместно
// 2. onClick с useCallback([]) Замыкает устаревший isVisible
// 3. scroll-listener — не удаляется, Потенциальная утечка памяти
// 4. List фильтрует в useEffect - Использовать useMemo
// 5. <input /> — неконтролируемый

const getItemsRequest = async () => {
  return new Promise<any[]>((res) => {
    setTimeout(() => {
      res([
        {id: "1", name: "Jake"},
        {id: "2", name: "Will"},
        {id: "3", name: "Emmy"},
        {id: "4", name: "Nick"},
        {id: "5", name: "Jill"},
        {id: "6", name: "Andy"},
        {id: "7", name: "Bill"},
        {id: "8", name: "Jason"},
        {id: "9", name: "Billinton"},
        {id: "10", name: "Jar"},
        {id: "11", name: "Jack"},
      ]);
    }, 2000);
  });
};

const checkMetrics = () => {
  console.log("checkMetrics()");
};

// Отрефакторить код компонента
export default function App() {
  const [items, setItems] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const onClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isVisible) return;

    window.addEventListener("scroll", checkMetrics);

    return () => {
      window.removeEventListener("scroll", checkMetrics);
    };
  }, [isVisible]);

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

function List({items}: {items: any[]}) {
  const [search, setSearch] = useState("");

  const filtredItems = useMemo(() => {
    return items.filter((item) => item.name.toLowerCase().includes(search));
  }, [items, search]);

  return (
    <>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filtredItems.map((item) => {
          return (
            <div key={item.id} className="item">
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
