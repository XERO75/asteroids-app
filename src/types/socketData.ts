interface Position {
  x: number;
  y: number;
}

export interface SocketData {
  miners: SocketMiner[];
  asteroids: SocketAsteroid[];
  planets: SocketPlanet[];
}

export interface SocketAsteroid {
  position: Position;
  _id: string;
  name: string;
  minerals: number;
  status: number;
  currentMiner: string;
  __v: number;
}

export interface SocketPlanet {
  position: Position;
  _id: string;
  name: string;
  minerals: number;
  miners: number;
  __v: number;
}

export interface SocketMiner {
  _id: string;
  name: string;
  planet: SocketPlanet;
  x: number;
  y: number;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number;
  __v: number;
  target: SocketAsteroid;
  targetType: string;
}
