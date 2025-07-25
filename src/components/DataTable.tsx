import React, { useEffect, useState } from "react";

interface DataTableProps {
  apiUrl: string;
}

const DataTable: React.FC<DataTableProps> = ({ apiUrl }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        // If the response is an object, convert to array
        if (Array.isArray(json)) {
          setData(json);
        } else if (typeof json === "object" && json !== null) {
          setData([json]);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data.length) return <div>No data found.</div>;

  // Get all unique keys from all objects (for dynamic columns)
  const columns = Array.from(
    data.reduce((cols, row) => {
      Object.keys(row).forEach((key) => cols.add(key));
      return cols;
    }, new Set<string>()),
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#f9f9f9",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  key={col}
                  style={{ border: "1px solid #eee", padding: "8px" }}
                >
                  {typeof row[col] === "object" && row[col] !== null
                    ? JSON.stringify(row[col])
                    : String(row[col] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
