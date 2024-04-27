import type { ShowPlanet } from '../types/planet';
import type { SocketPlanet } from '../types/socketData';

export class PlanetController {
  public static readonly Titles = ['Name', 'Miners', 'Minerals', ' '];
  public static readonly ShowTitles = ['showName', 'miners', 'showMinerals', 'control'];

  public static mergePlanetsValue(planets: Array<SocketPlanet>) {
    const ret: Array<ShowPlanet> = [];
    planets.forEach((ast: SocketPlanet) => {
      const m: ShowPlanet = {
        ...ast,
        showName: `P${ast.name.split(' ')[1]}`,
        showMinerals: `${ast.minerals}/1000`,
      };

      ret.push(m);
    });

    return ret;
  }
}
