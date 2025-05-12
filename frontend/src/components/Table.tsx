import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface TableProps<T> {
  title: string;
  columns: {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
    headerClassName?: string;
    cellClassName?: string;
    navigation?: (item: T) => string;
  }[];
  data: T[];
}

export function Table<T>({ title, columns, data }: TableProps<T>) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded border border-gray-700 shadow-sm bg-gray-800">
      <h2 className="text-xl p-4 text-white border-b border-gray-700">{title}</h2>
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${column.headerClassName || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border-t border-gray-700 px-4 py-2 text-sm text-gray-300 ${column.cellClassName || ''}`}
                  >
                    {column.navigation ? (
                      <Button
                        label="View"
                        onClick={() => navigate(column.navigation!(item))}
                      />
                    ) : (
                      column.render(item)
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="border-t border-gray-700 px-4 py-4 text-sm text-gray-400 text-center"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}