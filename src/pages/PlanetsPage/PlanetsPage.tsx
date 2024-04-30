import React, { useEffect, useState } from 'react';
import { getPlanetsList } from '../../api/planets';
import PlanetsTable from '../../components/PlanetsTable/PlanetsTable';
import { ShowPlanet } from '../../types/planet';
import { PlanetController } from '../../utils/planetController';
const PlanetsPage: React.FC = () => {
  const [planets, setPlanets] = useState<ShowPlanet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetPlanets = async () => {
      try {
        const res = await getPlanetsList();
        const showData = PlanetController.mergePlanetsValue(res);
        setPlanets(showData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetPlanets();

    const intervalId = setInterval(fetPlanets, 1000);

    return () => {
      clearInterval(intervalId);
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
