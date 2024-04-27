import React, { useEffect, useState } from 'react';
import AsteroidsTable from '../../components/AsteroidsTable/AsteroidsTable';
import { WS_URL } from '../../config';
import { useSocket } from '../../hooks/useSocket';
import type { SocketData } from '../../types//socketData';
import { ShowAsteroid } from '../../types/asteroid';
import { AsteroidController } from '../../utils/asteroidController';

const AsteroidsPage: React.FC = () => {
  const { socket } = useSocket(WS_URL);
  const [asteroids, setAsteroids] = useState<ShowAsteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleTick = (data: SocketData) => {
      const { asteroids, miners } = data;
      const showData = AsteroidController.mergeAstroidsValue(asteroids, miners);
      setAsteroids(showData);
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
        <AsteroidsTable title={AsteroidController.Titles} showTitle={AsteroidController.ShowTitles} data={asteroids} />
      )}
    </div>
  );
};

export default AsteroidsPage;
