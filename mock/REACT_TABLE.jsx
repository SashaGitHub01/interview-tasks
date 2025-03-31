// Пример использования

import React from "react";

export default function App() {
  const data = [
    {id: 1, name: "Alice", age: 30},
    {id: 2, name: "Bob", age: 25},
    {id: 3, name: "Carol", age: 35},
  ];

  const columns = [
    {key: "id", title: "ID"},
    {key: "name", title: "Name"},
    {
      key: "age",
      title: "Age",
    },
  ];

  return <Table data={data} columns={columns} />;
}

export const Table = () => {};
