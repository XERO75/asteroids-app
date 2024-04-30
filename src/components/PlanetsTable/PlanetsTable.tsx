import React, { useState } from 'react';
import { minersOfPlanet } from '../../api/miners';
import Modal from '../../components//Modal/Modal';
import Table from '../../components/Table/Table';
import { ShowMiner, ShowMinerOfPlanet } from '../../types/miner';
import { ShowPlanet, ShowPlanetTitle } from '../../types/planet';
import { MinerController } from '../../utils/minerController';
import CreateMinerForm, { CreateMinerFormProps } from '../CreateMinerForm/CreateMinerForm';
import './PlanetsTable.scss';
interface IPlanetsTableProps {
  title: string[];
  showTitle: string[];
  data: ShowPlanet[];
}

const PlanetsTable: React.FC<IPlanetsTableProps> = ({ title, showTitle, data }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccesslModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [minersList, setMinersList] = useState<ShowMiner[]>([]);
  const [currentPlanet, setCurrentPlanet] = useState<CreateMinerFormProps>({
    planet: {
      id: '',
      name: '',
      x: 0,
      y: 0,
    },
    minerals: 0,
  });
  const [detialLoading, setDetailLoding] = useState(false);
  const modalTitle = 'Create a miner';
  const createdText = 'Miner was successfully created';

  const handleCreateMiner = (item: ShowPlanet) => {
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
    setCreateModalOpen(true);
  };

  const onShowMinerDetials = async () => {
    const { id } = currentPlanet.planet;
    setDetailModalOpen(true);
    setDetailLoding(true);
    const res = await minersOfPlanet(id);
    const showData = MinerController.mergeMinersOfPlanetValue(res);
    setMinersList(showData);
    setDetailLoding(false);
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

  const renderMinerOfPlanetCell = (item: ShowMiner, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showCarryCapacity':
        return (
          <span className={item.minerals >= item.carryCapacity && item.minerals !== 0 ? 'text-green-dark' : ''}>
            {item.showCarryCapacity}
          </span>
        );

      default:
        return <div className="text-gray">{item[columnKey as keyof ShowMinerOfPlanet]}</div>;
    }
  };

  return (
    <>
      <Table className="w-[543px]" headers={showTitle} showHeaders={title} data={data} renderCell={renderMinerCell} />
      <Modal title={modalTitle} isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <CreateMinerForm
          planet={currentPlanet.planet}
          minerals={currentPlanet.minerals}
          onCreateSuccess={() => {
            setCreateModalOpen(false);
            setSuccesslModalOpen(true);
          }}
        />
      </Modal>
      <Modal
        title=""
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setSuccesslModalOpen(false);
          onShowMinerDetials();
          setDetailModalOpen(true);
        }}
      >
        <div className="px-12 py-3">{createdText}</div>
      </Modal>
      {isDetailModalOpen && (
        <Modal
          title={`List of miners of ${`Pl${currentPlanet.planet.name.split(' ')[1]}`}`}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setMinersList([]);
          }}
        >
          {detialLoading && (
            <div className="flex justify-center items-center w-[500px]">
              <i className="iconfont icon-loader text-3xl spin"></i>
            </div>
          )}
          {!detialLoading && (
            <Table
              headers={MinerController.ShowMinersOfPlanetTitles}
              showHeaders={MinerController.MinersOfPlanetTitles}
              data={minersList}
              renderCell={renderMinerOfPlanetCell}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default PlanetsTable;
