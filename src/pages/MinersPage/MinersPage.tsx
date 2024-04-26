import React, { useEffect, useState } from 'react';
import Modal from '../../components//Modal/Modal';
import Table, { RowData } from '../../components/Table/Table';
import { WS_URL } from '../../config';
import { useSocket } from '../../hooks/useSocket';
import type { SocketData } from '../../types//socketData';
import { ShowMiner } from '../../types/miner';
import { MinerController } from '../../utils/minerController';
const MinersPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { socket } = useSocket(WS_URL);
  const [miners, setMiners] = useState<ShowMiner[]>([]);
  const [loading, setLoading] = useState(true);

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

  const renderCell = (item: RowData, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case 'showName':
        return (
          <a className="border-b hover:cursor-pointer" onClick={() => setModalOpen(!isModalOpen)}>
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
        return <div className="text-gray">{item[columnKey]}</div>;
    }
  };

  return (
    <div className="flex justify-center pt-10">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <Table
            headers={MinerController.ShowTitles}
            showHeaders={MinerController.Titles}
            data={miners}
            renderCell={renderCell}
          />

          <Modal title="for test" isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <span>test modal</span>
          </Modal>
        </>
      )}
    </div>
  );
};

export default MinersPage;
