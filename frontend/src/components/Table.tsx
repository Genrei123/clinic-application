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
  selector?: boolean;
  onDelete?: (item: T) => void;
  openModal?: (item: T) => void;
}

export function Table<T>({ title, columns, data, selector, onDelete, openModal }: TableProps<T>) {
  const navigate = useNavigate();

  // Calculate the number of visible columns (excluding navigation-only columns)
  const visibleColumns = columns.filter(col => !col.navigation).length;
  // Determine if we need an actions column
  const hasActions = selector || columns.some(col => col.navigation);

  return (
    <div className="overflow-x-auto rounded border border-gray-700 shadow-sm bg-gray-800">
      <div className="flex justify-between items-center bg-gray-700 rounded-t">
        <h2 className="text-xl p-4 text-white border-b border-gray-700">{title}</h2>
      </div>

      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            {columns
              .filter(col => !col.navigation) // Only show headers for non-navigation columns
              .map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${column.headerClassName || ''}`}
                >
                  {column.header}
                </th>
              ))}
            {hasActions && (
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns
                  .filter(col => !col.navigation) // Only render non-navigation columns
                  .map((column) => (
                    <td
                      key={column.key}
                      className={`border-t border-gray-700 px-4 py-2 text-sm text-gray-300 ${column.cellClassName || ''}`}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                {hasActions && (
                  <td className="border-t border-gray-700 px-4 py-2">
                    <div className="flex space-x-2">
                      {columns.map((column, idx) =>
                        column.navigation ? (
                          <Button
                            key={`nav-${idx}`}
                            label="View"
                            onClick={() => navigate(column.navigation!(item))}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          />
                        ) : null
                      )}
                      {selector && openModal && (
                        <Button
                          label="Edit"
                          onClick={() => openModal(item)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        />
                      )}
                      {selector && onDelete && (
                        <Button
                          label="Delete"
                          onClick={() => onDelete(item)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={visibleColumns + (hasActions ? 1 : 0)}
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