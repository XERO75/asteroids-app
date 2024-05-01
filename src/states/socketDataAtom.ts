import { atom } from 'jotai';
import { SocketData } from '../types/socketData';

export const socketDataAtom = atom<SocketData>({
  miners: [],
  asteroids: [],
  planets: [],
});
