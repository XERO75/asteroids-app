import type { ShowMinerHistory } from '../types//minerHistory';
import { statusToStr } from '../types/miner';
import { formatDate } from './utils';

export class MinerHistoryController {
  public static readonly Titles = [
    'Date',
    'Year',
    'Planet',
    'carryCapacity',
    'travelSpeed',
    'miningSpeed',
    'Position',
    'Status',
  ];
  public static readonly ShowTitles = [
    'showDate',
    'year',
    'showPlanet',
    'showCarryCapacity',
    'showTravelSpeed',
    'showMiningSpeed',
    'showPosition',
    'showStatus',
  ];

  public static mergeMinersHistoryValue(orgData: Array<ShowMinerHistory>) {
    const ret = JSON.parse(JSON.stringify(orgData));
    ret.forEach((miner: ShowMinerHistory) => {
      miner.showDate = formatDate(miner.createdAt);
      miner.showPlanet = `Pl${miner.planet.split(' ')[1]}`;
      miner.showCarryCapacity = `${miner.capacity.current}/${miner.capacity.max}`;
      miner.showTravelSpeed = miner.speed.travel;
      miner.showMiningSpeed = miner.speed.mining;
      miner.showPosition = `${Math.round(miner.position.x)},${Math.round(miner.position.y)}`;
      miner.showStatus = statusToStr(miner.status);
    });

    return ret;
  }
}
