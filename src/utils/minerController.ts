import type { Miner, ShowMiner } from '../types/miner';
import { statusToStr } from '../types/miner';
import type { SocketMiner } from '../types/socketData';

export class MinerController {
  public static readonly Titles = [
    'Name',
    'Planet',
    'carryCapacity',
    'travelSpeed',
    'miningSpeed',
    'Position',
    'Status',
  ];
  public static readonly ShowTitles = [
    'showName',
    'showPlanet',
    'showCarryCapacity',
    'travelSpeed',
    'miningSpeed',
    'showPosition',
    'showStatus',
  ];

  public static mergeMinersValue(socketMiner: SocketMiner[]): ShowMiner[] {
    const ret: ShowMiner[] = [];

    socketMiner.forEach((miner: SocketMiner) => {
      const {
        planet: { name: planetName },
        target: { name: targetName },
        ...minerProps
      } = miner;
      const orgMiner: Miner = {
        ...minerProps,
        planet: planetName,
        target: targetName,
      };

      const m: ShowMiner = {
        ...orgMiner,
        showName: `Mi${miner.name.split(' ')[1]}`,
        showPlanet: `Pl${miner.planet.name.split(' ')[1]}`,
        showCarryCapacity: `${miner.minerals}/${miner.carryCapacity}`,
        showPosition: `${Math.floor(miner.x)},${Math.floor(miner.y)}`,
        showStatus: statusToStr(miner.status),
      };

      ret.push(m);
    });

    return ret;
  }
}
