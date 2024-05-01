import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { getAsteriodsList } from '../../api/asteroids';
import { getMinersList } from '../../api/miners';
import AsteroidsTable from '../../components/AsteroidsTable/AsteroidsTable';
import { socketDataAtom } from '../../states/socketDataAtom';
import { ShowAsteroid } from '../../types/asteroid';
import { AsteroidController } from '../../utils/asteroidController';
const AsteroidsPage: React.FC = () => {
  const [asteroids, setAsteroids] = useState<ShowAsteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [socketData] = useAtom(socketDataAtom);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const fetAsteroids = async () => {
      try {
        const [asteroidsList, minersList] = await Promise.all([getAsteriodsList(), getMinersList()]);
        const showData = AsteroidController.mergeAsteroidsValue(asteroidsList, minersList);
        setAsteroids(showData);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetAsteroids();
  }, []);

  useEffect(() => {
    if (initialLoadComplete) {
      const showData = AsteroidController.mergeAsteroidsValue(socketData.asteroids, socketData.miners);
      setAsteroids(showData);
    }
  }, [socketData.asteroids, socketData.miners, initialLoadComplete]);

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
