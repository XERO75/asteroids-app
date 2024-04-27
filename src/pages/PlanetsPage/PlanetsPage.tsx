import React, { useEffect, useState } from 'react';
import PlanetsTable from '../../components/PlanetsTable/PlanetsTable';
import { WS_URL } from '../../config';
import { useSocket } from '../../hooks/useSocket';
import type { SocketData } from '../../types//socketData';
import { ShowPlanet } from '../../types/planet';
import { PlanetController } from '../../utils/planetController';

const PlanetsPage: React.FC = () => {
  const { socket } = useSocket(WS_URL);
  const [planets, setPlanets] = useState<ShowPlanet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleTick = (data: SocketData) => {
      const { planets } = data;
      const showData = PlanetController.mergePlanetsValue(planets);
      setPlanets(showData);
      setLoading(false);
    };

    socket.current?.on('tick', handleTick);

    return () => {
      socket.current?.off('tick', handleTick);
    };
  }, []);

  return (
    <div className="flex justify-center pt-10">
      {loading && <div className="text-center">Loading...</div>}
      {!loading && (
        <PlanetsTable title={PlanetController.Titles} showTitle={PlanetController.ShowTitles} data={planets} />
      )}
    </div>
  );
};

export default PlanetsPage;
