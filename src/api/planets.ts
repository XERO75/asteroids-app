import { requestAPI } from './fetcher';

export const getPlanetsList = async () => {
  try {
    const res = await requestAPI('/planets');
    return res;
  } catch (error) {
    console.error(error);
  }
};
