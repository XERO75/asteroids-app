import React from 'react';
import { ShowMiner } from '../../types/miner';
import { MinerController } from '../../utils/minerController';
import Table from '../Table/Table';

interface MinersTableProps {
  miners: ShowMiner[];
  onShowMinerHistory: (miner: ShowMiner) => void;
}

const MinersTable: React.FC<MinersTableProps> = ({ miners, onShowMinerHistory }) => {
  const renderMinerCell = (item: ShowMiner, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showName':
        return (
          <a className="border-b hover:cursor-pointer" onClick={() => onShowMinerHistory(item)}>
            {item.showName}
          </a>
        );
      case 'showCarryCapacity':
        return (
          <span className={item.minerals === item.carryCapacity ? 'text-green' : ''}>{item.showCarryCapacity}</span>
        );
      case 'showStatus':
        return <div className="text-gray w-60">{item.showStatus}</div>;
      default:
        return <div className="text-gray">{item[columnKey as keyof ShowMiner]}</div>;
    }
  };

  return (
    <Table
      headers={MinerController.ShowTitles}
      showHeaders={MinerController.Titles}
      data={miners}
      renderCell={renderMinerCell}
    />
  );
};

export default MinersTable;
