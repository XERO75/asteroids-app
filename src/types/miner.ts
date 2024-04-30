export interface Miner {
  _id: string;
  name: string;
  planet: string;
  x: number;
  y: number;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number;
  __v: number;
  target: string;
  targetType: string;
}

interface BaseShowMiner {
  showName?: string;
  showPlanet?: string;
  showCarryCapacity?: string;
  showPosition?: string;
  showStatus?: string;
}
export interface ShowMiner extends Miner, BaseShowMiner {}

export interface ShowMinerOfPlanet
  extends Miner,
    Pick<BaseShowMiner, 'showName' | 'showCarryCapacity' | 'showPosition' | 'showStatus'> {}
export function statusToStr(status: number) {
  let ret = `${status}`;
  switch (status) {
    case 0:
      ret = 'Idle';
      break;
    case 1:
      ret = 'Traveling';
      break;
    case 2:
      ret = 'Mining';
      break;
    case 3:
      ret = 'Transferring minerals to planet';
      break;
  }

  return ret;
}
