import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Trash2 } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

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

  const handleDelete = (item:any) => {
    // Handle delete action here
    console.log('Delete item:', item);
    // Check if it's medicine or patient
    if (item.MedicineID) {
      // Handle delete for medicine
      console.log('Deleting medicine with ID:', item.MedicineID);

      const response = async () => {
        try {
          await axiosInstance.delete(`/medicine/${item.MedicineID}/`);
          alert('Medicine deleted successfully');
        } catch (error) {
          console.error('Error deleting medicine:', error);
        }
      }
      response();
      
    } else if (item.ClientNumber) {
      // Handle delete for patient
      console.log('Deleting patient with ClientNumber:', item.ClientNumber);
    }
  }

  const handleSelect = () => {
    // Push the selected item to the selectedItems array
    
    
  }

  return (
    <div className="overflow-x-auto rounded border border-gray-700 shadow-sm bg-gray-800">
      <div className = "flex justify-between items-center bg-gray-700 rounded-t">
        <h2 className="text-xl p-4 text-white border-b border-gray-700">{title}</h2>
        
      </div>


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

            {selector && (
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

                {selector && (
                  <td className="border-t border-gray-700 px-4 py-2">
                    <Button
                      label="Delete"
                      onClick={() => handleDelete(item)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    />
                  </td>
                )}
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