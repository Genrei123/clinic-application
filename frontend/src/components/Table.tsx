import React from 'react';

// Define prop types for the Table component
interface TableProps<T> {
  title: string;
  // Define columns with header text and a render function to display data for that column
  columns: {
    key: string; // Unique key for the column (good practice for mapping headers)
    header: string; // Text to display in the table header
    render: (item: T) => React.ReactNode; // Function to render the cell content for each data item
    headerClassName?: string; // Optional class for the th
    cellClassName?: string; // Optional class for the td
  }[];
  data: T[]; // Array of data objects
  // Add a key prop suggestion if mapping over items in tbody, though index is used below for simplicity
}

// Generic component using type T for data items
export function Table<T>({ title, columns, data }: TableProps<T>) {
  return (
    // This outer div and its classes (`overflow-x-auto`, border, shadow, bg) were in your dashboard
    <div className="overflow-x-auto rounded border border-gray-700 shadow-sm bg-gray-800">
      {/* Table Title */}
      <h2 className="text-xl p-4 text-white border-b border-gray-700">{title}</h2>

      {/* Table Element */}
      <table className="min-w-full text-white">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-700">
            {columns.map((column, index) => (
              // Render table headers based on the 'columns' prop
              <th
                key={column.key || index} // Use key from column or index as fallback
                className={`px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${column.headerClassName || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {/* Render table rows based on the 'data' prop */}
          {/* Use a unique identifier from your data items if available, otherwise index */}
          {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}> {/* Using index as key - replace with item.id if available */}
                  {/* Render table cells for each column using the render function */}
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key || colIndex} // Use column key or index
                      className={`border-t border-gray-700 px-4 py-2 text-sm text-gray-300 ${column.cellClassName || ''}`}
                    >
                      {column.render(item)} {/* Call the render function for the cell content */}
                    </td>
                  ))}
                </tr>
              ))
           ) : (
            // Optional: Show a message if there's no data
            <tr>
                <td colSpan={columns.length} className="border-t border-gray-700 px-4 py-4 text-sm text-gray-400 text-center">
                    No data available.
                </td>
            </tr>
           )}
        </tbody>
      </table>
    </div>
  );
}