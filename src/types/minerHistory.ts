interface Capacity {
  current: number;
  max: number;
}

interface Speed {
  travel: number;
  mining: number;
}

interface Position {
  x: number;
  y: number;
}

export interface MinerHistory {
  _id: string;
  capacity: Capacity;
  speed: Speed;
  position: Position;
  year: number;
  planet: string;
  status: number;
  miner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ShowMinerHistory extends MinerHistory {
  showDate?: string;
  showPlanet?: string;
  showCarryCapacity?: string;
  showTravelSpeed?: number;
  showMiningSpeed?: number;
  showPosition?: string;
  showStatus?: string;
}

export interface ShowMinerHistoryTitle {
  showDate?: string;
  showPlanet?: string;
  showCarryCapacity?: string;
  showTravelSpeed?: number;
  showMiningSpeed?: number;
  showPosition?: string;
  showStatus?: string;
}
