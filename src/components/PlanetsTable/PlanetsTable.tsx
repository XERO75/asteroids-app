import React, { useState } from 'react';
import Modal from '../../components//Modal/Modal';
import Table from '../../components/Table/Table';
import { ShowPlanet, ShowPlanetTitle } from '../../types/planet';
import CreateMinerForm, { CreateMinerFormProps } from '../CreateMinerForm/CreateMinerForm';
interface IPlanetsTableProps {
  title: string[];
  showTitle: string[];
  data: ShowPlanet[];
}

const PlanetsTable: React.FC<IPlanetsTableProps> = ({ title, showTitle, data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState<CreateMinerFormProps>({
    planet: {
      id: '',
      name: '',
    },
    minerals: 0,
  });
  const modalTitle = 'Create a miner';

  const handleCreateMiner = (item: ShowPlanet) => {
    console.log(item);
    const planet = {
      id: item._id,
      name: item.name,
    };
    setCurrentPlanet({
      planet,
      minerals: item.minerals,
    });
    setModalOpen(true);
  };

  const renderMinerCell = (item: ShowPlanet, columnKey: string): React.ReactNode => {
    const creatableFlag = item.minerals >= 1000;
    const ctaText = 'Create a miner';
    switch (columnKey) {
      case 'showMinerals':
        return <span className={creatableFlag ? 'text-green-dark' : ''}>{item.showMinerals}</span>;
      case 'control':
        return (
          <div
            className={`text-sm ${creatableFlag ? 'hover:cursor-pointer text-blue' : ''}`}
            onClick={() => creatableFlag && handleCreateMiner(item)}
          >
            <i className="iconfont icon-add pr-2" />
            <span>{ctaText}</span>
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
        <CreateMinerForm planet={currentPlanet.planet} minerals={currentPlanet.minerals} />
      </Modal>
    </>
  );
};

export default PlanetsTable;
