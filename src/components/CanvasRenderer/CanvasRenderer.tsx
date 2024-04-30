import React, { useEffect, useRef } from 'react';
import { SocketData } from '../../types/socketData';

interface CanvasRendererProps {
  socketData: SocketData;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({ socketData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const asteroidImage = useRef(new Image());
  const minerImage = useRef(new Image());
  const planetImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    asteroidImage.current.src = '/images/asteroid.svg';
    minerImage.current.src = '/images/miner.svg';
    planetImages.current = [new Image(), new Image(), new Image()];
    planetImages.current[0].src = '/images/pl1.svg';
    planetImages.current[1].src = '/images/pl3.svg';
    planetImages.current[2].src = '/images/pl2.svg';
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, bgImg: HTMLImageElement) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);

    socketData.planets.forEach((planet, index) => {
      const planetImg = planetImages.current[index];
      if (planetImg && planetImg.complete) {
        const baseSize = 100;
        // increase size of planet by index * 10
        const planetSize = baseSize + index * 30;
        ctx.drawImage(
          planetImg,
          planet.position.x - planetSize / 2,
          planet.position.y - planetSize / 2,
          planetSize,
          index === 2 ? planetSize + 20 : planetSize,
        );
      }
    });

    socketData.asteroids.forEach((asteroid) => {
      if (asteroidImage.current.complete) {
        ctx.drawImage(asteroidImage.current, asteroid.position.x - 15, asteroid.position.y - 15, 50, 50);
      }
    });

    socketData.miners.forEach((miner) => {
      if (minerImage.current.complete) {
        ctx.save(); // save the current drawing state
        ctx.translate(miner.x, miner.y); // translate to the center of the canvas
        const adjustedAngle = ((miner.angle - 90 + 180) * Math.PI) / 180; // rotate to the correct angle
        ctx.rotate(adjustedAngle); // rotate the canvas
        ctx.drawImage(minerImage.current, -16, -16, 32, 32);
        ctx.restore();
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const bgImg = new Image();
    bgImg.src = '/images/bg.svg';
    bgImg.onload = () => {
      if (context) {
        draw(context, bgImg);
      }
    };
  }, [socketData]);

  return <canvas ref={canvasRef} width={1000} height={1000} />;
};

export default CanvasRenderer;
