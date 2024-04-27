import type { SocketAsteroid } from './socketData';

export interface ShowAsteroidTitle {
  showName?: string;
  showMinerals?: string;
  showCurrentMiner?: string;
  showPosition?: string;
}

export interface ShowAsteroid extends SocketAsteroid, ShowAsteroidTitle {}
