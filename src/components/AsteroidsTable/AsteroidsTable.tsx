import React from 'react';
import Table from '../../components/Table/Table';
import { ShowAsteroid, ShowAsteroidTitle } from '../../types/asteroid';

interface IAsteroidsTableProps {
  title: string[];
  showTitle: string[];
  data: ShowAsteroid[];
}

const AsteroidsTable: React.FC<IAsteroidsTableProps> = ({ title, showTitle, data }) => {
  const renderMinerCell = (item: ShowAsteroid, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showMinerals':
        return <span className={item.minerals === 0 ? 'text-red' : ''}>{item.showMinerals}</span>;
      default:
        return <div className="text-gray">{item[columnKey as keyof ShowAsteroidTitle]}</div>;
    }
  };

  return (
    <Table
      className="w-[543px] max-h-[747px]"
      headers={showTitle}
      showHeaders={title}
      data={data}
      renderCell={renderMinerCell}
    />
  );
};

export default AsteroidsTable;
