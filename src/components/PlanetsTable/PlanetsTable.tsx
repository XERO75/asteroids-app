import React, { useState } from 'react';
import Modal from '../../components//Modal/Modal';
import Table from '../../components/Table/Table';
import { ShowPlanet, ShowPlanetTitle } from '../../types/planet';
interface IPlanetsTableProps {
  title: string[];
  showTitle: string[];
  data: ShowPlanet[];
}

const PlanetsTable: React.FC<IPlanetsTableProps> = ({ title, showTitle, data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalTitle = 'Create a miner';
  const renderMinerCell = (item: ShowPlanet, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showMinerals':
        return <span className={item.minerals >= 1000 ? 'text-green-dark' : ''}>{item.showMinerals}</span>;
      case 'control':
        return (
          <div className="text-blue text-sm hover:cursor-pointer" onClick={() => setModalOpen(true)}>
            <i className="iconfont icon-add pr-2" />
            <span>Create a miner</span>
          </div>
        );

      default:
        return <div className="text-gray">{item[columnKey as keyof ShowPlanetTitle]}</div>;
    }
  };

  return (
    <>
      <Table className="w-[543px]" headers={showTitle} showHeaders={title} data={data} renderCell={renderMinerCell} />
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <span>WIP</span>
      </Modal>
    </>
  );
};

export default PlanetsTable;
