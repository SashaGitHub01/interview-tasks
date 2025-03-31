import React, {useMemo, useState} from "react";

export const Table = ({data, columns}) => {
  const [sort, setSort] = useState({key: null, direction: null});
  const [filters, setFilters] = useState({});

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.every((col) => {
        if (!col.filterable || !filters[col.key]) return true;
        const val = item[col.key] + "";
        return val.toLowerCase().includes(filters[col.key].toLowerCase());
      })
    );
  }, [data, columns, filters]);

  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      if (typeof aVal === "number") return aVal - bVal;
      return String(aVal).localeCompare(String(bVal));
    });
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sort]);

  const toggleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return {key, direction: "asc"};
      if (prev.direction === "asc") return {key, direction: "desc"};
      return {key: null, direction: null};
    });
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => ({...prev, [key]: value}));
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && toggleSort(col.key)}
              style={{cursor: col.sortable ? "pointer" : "default"}}>
              {col.title}
              {sort.key === col.key &&
                (sort.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>
              {col.filterable && (
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters[col.key] || ""}
                  onChange={(e) => handleFilter(col.key, e.target.value)}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>No data</td>
          </tr>
        ) : (
          sortedData.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
