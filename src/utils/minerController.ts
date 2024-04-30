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
  public static readonly MinersOfPlanetTitles = [
    'Name',
    'carryCapacity',
    'travelSpeed',
    'miningSpeed',
    'Position',
    'Status',
  ];
  public static readonly ShowMinersOfPlanetTitles = [
    'showName',
    'showCarryCapacity',
    'travelSpeed',
    'miningSpeed',
    'showPosition',
    'showStatus',
  ];
  public static mergeMinersValue(socketMiners: SocketMiner[] = []): ShowMiner[] {
    return socketMiners.map((miner) => this.createShowMiner(miner, true));
  }
  public static mergeMinersOfPlanetValue(socketMiners: SocketMiner[]): ShowMiner[] {
    return socketMiners.map((miner) => this.createShowMiner(miner, false));
  }
  private static createShowMiner(miner: SocketMiner, includePlanet: boolean): ShowMiner {
    const {
      planet: { name: planetName },
      target: { name: targetName },
      ...minerProps
    } = miner;

    const originalMiner: Miner = {
      ...minerProps,
      planet: planetName,
      target: targetName,
    };

    const showMiner: ShowMiner = {
      ...originalMiner,
      showName: miner.name.split(' ')[1] ? `Mi${miner.name.split(' ')[1]}` : miner.name,
      showCarryCapacity: `${miner.minerals}/${miner.carryCapacity}`,
      showPosition: `${Math.floor(miner.x)},${Math.floor(miner.y)}`,
      showStatus: statusToStr(miner.status),
    };

    if (includePlanet) {
      showMiner.showPlanet = `Pl${planetName.split(' ')[1]}`;
    }

    return showMiner;
  }
}
