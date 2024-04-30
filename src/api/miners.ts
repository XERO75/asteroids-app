import { Miner } from '../types//miner';
import { HTTPMethods, requestAPI } from './fetcher';

export interface MinerData {
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
  target: string;
  targetType: string;
}

export const getMinersList = async () => {
  try {
    const res = await requestAPI('/miners');
    return res as Array<Miner>;
  } catch (error) {
    console.error(error);
  }
};

export const minerHistory = async (minerID: string) => {
  try {
    const res = await requestAPI(`/history?minerId=${minerID}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createMiner = async (data: MinerData) => {
  try {
    const res = await requestAPI('/miners', HTTPMethods.POST, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
