import type { SocketPlanet } from './socketData';

export interface ShowPlanetTitle {
  showName?: string;
  showMinerals?: string;
}

export interface ShowPlanet extends SocketPlanet, ShowPlanetTitle {}
