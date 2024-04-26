import React from 'react';
import './table.scss';

// 使用泛型 T 来定义数据行的类型
interface ITableProps<T> {
  headers: string[]; // 列头标识符数组
  showHeaders: string[]; // 显示给用户的列头数组
  data: T[]; // 数据数组，每一项都是类型 T
  renderCell: (item: T, columnKey: string) => React.ReactNode; // 渲染单元格的函数，接受数据项和列标识符
}

// 将 Table 组件也定义为泛型组件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({ headers, showHeaders, data, renderCell }: ITableProps<T>) => {
  return (
    <div className="max-h-[500px] overflow-y-auto">
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
