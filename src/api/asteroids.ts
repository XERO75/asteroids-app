import { requestAPI } from './fetcher';

export const getAsteriodsList = async () => {
  try {
    const res = await requestAPI('/asteroids');
    return res;
  } catch (error) {
    console.error(error);
  }
};
