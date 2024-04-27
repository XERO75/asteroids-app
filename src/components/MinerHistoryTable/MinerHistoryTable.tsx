import React from 'react';
import { ShowMinerHistory, ShowMinerHistoryTitle } from '../../types/minerHistory';
import { MinerHistoryController } from '../../utils/minerHistoryController';
import Table from '../Table/Table';

interface MinerHistoryTableProps {
  minerHistoryData: ShowMinerHistory[];
}

const MinerHistoryTable: React.FC<MinerHistoryTableProps> = ({ minerHistoryData }) => {
  const renderMinerHistoryCell = (item: ShowMinerHistory, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showCarryCapacity':
        return (
          <span className={item.capacity.current === item.capacity.max ? 'text-green' : ''}>
            {item.showCarryCapacity}
          </span>
        );
      case 'showStatus':
        return <div className="text-gray w-60">{item.showStatus}</div>;
      default:
        return <div className="text-gray">{item[columnKey as keyof ShowMinerHistoryTitle]}</div>;
    }
  };

  return (
    <Table
      headers={MinerHistoryController.ShowTitles}
      showHeaders={MinerHistoryController.Titles}
      data={minerHistoryData}
      renderCell={renderMinerHistoryCell}
    />
  );
};

export default MinerHistoryTable;
