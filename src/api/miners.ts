import { Miner } from '../types//miner';

import { requestAPI } from './fetcher';

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
