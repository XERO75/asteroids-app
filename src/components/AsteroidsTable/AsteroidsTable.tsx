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
    return <div className="text-gray">{item[columnKey as keyof ShowAsteroidTitle]}</div>;
  };

  return <Table headers={showTitle} showHeaders={title} data={data} renderCell={renderMinerCell} />;
};

export default AsteroidsTable;
