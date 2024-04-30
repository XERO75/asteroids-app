import React, { useState } from 'react';
import Modal from '../../components//Modal/Modal';
import Table from '../../components/Table/Table';
import { useModal } from '../../hooks/useModal';
import { ShowPlanet, ShowPlanetTitle } from '../../types/planet';
import CreateMinerForm, { CreateMinerFormProps } from '../CreateMinerForm/CreateMinerForm';
interface IPlanetsTableProps {
  title: string[];
  showTitle: string[];
  data: ShowPlanet[];
}

const PlanetsTable: React.FC<IPlanetsTableProps> = ({ title, showTitle, data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { showModal } = useModal();
  const [currentPlanet, setCurrentPlanet] = useState<CreateMinerFormProps>({
    planet: {
      id: '',
      name: '',
      x: 0,
      y: 0,
    },
    minerals: 0,
  });
  const modalTitle = 'Create a miner';
  const createdText = 'Miner was successfully created';

  const handleCreateMiner = (item: ShowPlanet) => {
    console.log(item);
    const planet = {
      id: item._id,
      name: item.name,
      x: item.position.x,
      y: item.position.y,
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
          creatableFlag && (
            <div
              className={`text-sm ${creatableFlag ? 'hover:cursor-pointer text-blue' : ''}`}
              onClick={() => creatableFlag && handleCreateMiner(item)}
            >
              <i className="iconfont icon-add pr-2" />
              <span>{ctaText}</span>
            </div>
          )
        );

      default:
        return <div className="text-gray">{item[columnKey as keyof ShowPlanetTitle]}</div>;
    }
  };

  return (
    <>
      <Table className="w-[543px]" headers={showTitle} showHeaders={title} data={data} renderCell={renderMinerCell} />
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CreateMinerForm
          planet={currentPlanet.planet}
          minerals={currentPlanet.minerals}
          onCreateSuccess={() => {
            setModalOpen(false);
            showModal(<div className="px-12 py-3">{createdText}</div>, '');
          }}
        />
      </Modal>
    </>
  );
};

export default PlanetsTable;
