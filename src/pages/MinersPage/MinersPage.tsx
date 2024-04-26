import React, { useEffect, useState } from 'react';
import { minerHistory } from '../../api/miners';
import Modal from '../../components//Modal/Modal';
import Table from '../../components/Table/Table';
import { WS_URL } from '../../config';
import { useSocket } from '../../hooks/useSocket';
import type { SocketData } from '../../types//socketData';
import { ShowMiner } from '../../types/miner';
import { ShowMinerHistory, ShowMinerHistoryTitle } from '../../types/minerHistory';
import { MinerController } from '../../utils/minerController';
import { MinerHistoryController } from '../../utils/minerHistoryController';
const MinersPage: React.FC = () => {
  const { socket } = useSocket(WS_URL);
  const [isModalOpen, setModalOpen] = useState(false);
  const [miners, setMiners] = useState<ShowMiner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMiner, setCurrentMiner] = useState({
    id: '',
    name: '',
  });
  const [minerHistoryData, setMinerHistory] = useState<ShowMinerHistory[]>([]);

  useEffect(() => {
    const handleTick = (data: SocketData) => {
      const { miners } = data;
      const showData = MinerController.mergeMinersValue(miners);
      setMiners(showData);
      setLoading(false);
    };

    socket.current?.on('tick', handleTick);

    return () => {
      socket.current?.off('tick', handleTick);
    };
  }, []);

  async function showMinerHistroy(miner: ShowMiner) {
    const { _id: id } = miner;
    const name = `History of Mi${miner.name.split(' ')[1]}`;
    const historyMiner = await minerHistory(id);
    const showData = MinerHistoryController.mergeMinersHistoryValue(historyMiner);
    setCurrentMiner({ id, name });
    setMinerHistory(showData);
    setModalOpen(true);
  }

  const renderMinerCell = (item: ShowMiner, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showName':
        return (
          <a className="border-b hover:cursor-pointer" onClick={() => showMinerHistroy(item)}>
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
    <div className="flex justify-center pt-10">
      {loading && <div className="text-center">Loading...</div>}
      {!loading && (
        <>
          <Table
            headers={MinerController.ShowTitles}
            showHeaders={MinerController.Titles}
            data={miners}
            renderCell={renderMinerCell}
          />

          <Modal title={currentMiner.name} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <Table
              headers={MinerHistoryController.ShowTitles}
              showHeaders={MinerHistoryController.Titles}
              data={minerHistoryData}
              renderCell={renderMinerHistoryCell}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default MinersPage;
