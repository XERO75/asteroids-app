import React from 'react';
import './table.scss';

interface ITableProps<T> {
  headers: string[];
  showHeaders: string[];
  data: T[];
  renderCell: (item: T, columnKey: string) => React.ReactNode;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({
  headers,
  showHeaders,
  data,
  renderCell,
  className,
}: ITableProps<T>) => {
  return (
    <div className={`max-h-[500px] overflow-y-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr>
            {showHeaders.map((header, index) => (
              <th key={index} className="py-3 pr-6 border-b border-gray text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, headerIndex) => (
                <td key={headerIndex} className="py-4 pr-6 border-b border-gray">
                  {renderCell(row, header)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
