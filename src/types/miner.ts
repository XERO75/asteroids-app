/**
 * { _id: '6602592183f15ad5e26645f9', name: 'Miner 1', planet: '6602592183f15ad5e26645db', x: 274.0273224294391, y: 762.2360830269155, angle: 11, carryCapacity: 2, travelSpeed: 24, miningSpeed: 128, status: 1, minerals: 0, __v: 0, target: '6602592183f15ad5e26645cb', targetType: 'Asteroid' }
 */

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

export interface ShowMiner extends Miner {
  showName?: string;
  showPlanet?: string;
  showCarryCapacity?: string;
  showPosition?: string;
  showStatus?: string;
}

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
