import React, { useEffect, useState } from 'react';
import { getAsteriodsList } from '../../api/asteroids';
import { getMinersList } from '../../api/miners';
import AsteroidsTable from '../../components/AsteroidsTable/AsteroidsTable';
import { ShowAsteroid } from '../../types/asteroid';
import { AsteroidController } from '../../utils/asteroidController';
const AsteroidsPage: React.FC = () => {
  const [asteroids, setAsteroids] = useState<ShowAsteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetAsteroids = async () => {
      const asteroidsList = await getAsteriodsList();
      const minersList = await getMinersList();
      const showData = AsteroidController.mergeAstroidsValue(asteroidsList, minersList);
      setAsteroids(showData);
      setLoading(false);
    };
    fetAsteroids();

    const intervalId = setInterval(fetAsteroids, 1000);

    return () => {
      clearInterval(intervalId);
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
