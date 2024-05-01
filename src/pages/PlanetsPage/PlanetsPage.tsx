import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { getPlanetsList } from '../../api/planets';
import PlanetsTable from '../../components/PlanetsTable/PlanetsTable';
import { socketDataAtom } from '../../states/socketDataAtom';
import { ShowPlanet } from '../../types/planet';
import { PlanetController } from '../../utils/planetController';

const PlanetsPage: React.FC = () => {
  const [planets, setPlanets] = useState<ShowPlanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [socketData] = useAtom(socketDataAtom);
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await getPlanetsList();
        const showData = PlanetController.mergePlanetsValue(res);
        setPlanets(showData);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (initialLoadComplete) {
      const showData = PlanetController.mergePlanetsValue(socketData.planets);
      setPlanets(showData);
    }
  }, [socketData.planets, initialLoadComplete]);

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
