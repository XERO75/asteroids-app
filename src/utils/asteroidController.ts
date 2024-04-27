import type { ShowAsteroid } from '../types/asteroid';
import type { SocketAsteroid, SocketMiner } from '../types/socketData';

export class AsteroidController {
  public static readonly Titles = ['Name', 'Minerals', 'Current miner', 'Position'];
  public static readonly ShowTitles = ['showName', 'showMinerals', 'showCurrentMiner', 'showPosition'];

  public static mergeAstroidsValue(asteroids: Array<SocketAsteroid>, miners: Array<SocketMiner>) {
    const ret: Array<ShowAsteroid> = [];
    asteroids.forEach((ast: SocketAsteroid) => {
      const m: ShowAsteroid = {
        ...ast,
        showName: `Ast${ast.name.split(' ')[1]}`,
        showMinerals: `${ast.minerals}`,
        showCurrentMiner: ast.currentMiner ? this.getMinerName(ast.currentMiner, miners) : '0',
        showPosition: `${Math.floor(ast.position.x)},${Math.floor(ast.position.y)}`,
      };

      ret.push(m);
    });

    return ret;
  }

  private static getMinerName(minerID: string, miners: Array<SocketMiner>) {
    const miner = miners.find((m) => m._id === minerID);
    if (miner) return miner.name;
    return '';
  }
}
