import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { minerHistory } from '../../api/miners';
import MinerHistoryTable from '../../components/MinerHistoryTable/MinerHistoryTable';
import MinersTable from '../../components/MinersTable/MinersTable';
import Modal from '../../components/Modal/Modal';
import { socketDataAtom } from '../../states/socketDataAtom';
import { ShowMiner } from '../../types/miner';
import { ShowMinerHistory } from '../../types/minerHistory';
import { MinerController } from '../../utils/minerController';
import { MinerHistoryController } from '../../utils/minerHistoryController';

const MinersPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [socketData] = useAtom(socketDataAtom);
  const [miners, setMiners] = useState<ShowMiner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMiner, setCurrentMiner] = useState({
    id: '',
    name: '',
  });
  const [minerHistoryData, setMinerHistory] = useState<ShowMinerHistory[]>([]);

  useEffect(() => {
    const { miners } = socketData;
    const showData = MinerController.mergeMinersValue(miners);
    setMiners(showData);
    miners.length > 0 && setLoading(false);
  }, [socketData]);

  async function showMinerHistroy(miner: ShowMiner) {
    const { _id: id } = miner;
    const name = `History of Mi${miner.name.split(' ')[1]}`;
    const historyMiner = await minerHistory(id);
    const showData = MinerHistoryController.mergeMinersHistoryValue(historyMiner);
    setCurrentMiner({ id, name });
    setMinerHistory(showData);
    setModalOpen(true);
  }

  return (
    <div className="flex justify-center pt-10">
      {loading && <div className="text-center">Loading...</div>}
      {!loading && (
        <>
          <MinersTable miners={miners} onShowMinerHistory={showMinerHistroy} />

          <Modal title={currentMiner.name} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <MinerHistoryTable minerHistoryData={minerHistoryData} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default MinersPage;
