import React from 'react';
import './table.scss';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowData = Record<string, any>;

interface ITableProps {
  headers: string[];
  showHeaders: string[];
  data: RowData[];
  renderCell: (item: RowData, columnKey: string) => React.ReactNode;
}

const Table: React.FC<ITableProps> = ({ headers, showHeaders, data, renderCell }) => {
  return (
    <div className="w-4/6">
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
