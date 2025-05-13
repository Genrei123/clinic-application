import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Trash2 } from 'lucide-react';

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
}

export function Table<T>({ title, columns, data, selector }: TableProps<T>) {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<[]>([]);

  const handleDelete = (item: T[]) => {
    // Handle delete action here
    alert(`Delete item:', ${selectedItems}`);
  }

  const handleSelect = (item: T) => {
    // Push the selected item to the selectedItems array
    selectedItems?.push();
  }

  return (
    <div className="overflow-x-auto rounded border border-gray-700 shadow-sm bg-gray-800">
      <div className = "flex justify-between items-center bg-gray-700 rounded-t">
        <h2 className="text-xl p-4 text-white border-b border-gray-700">{title}</h2>
        <Trash2 
          className="text-gray-400 hover:text-gray-200 cursor-pointer mr-4"
          onClick={() => handleDelete(selectedItems)}
          />
      </div>


      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            {selector && (
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                Select
              </th>
            )}

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
                {selector && (
                  <td className="border-t border-gray-700 px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => handleSelect(item)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                )}
                
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