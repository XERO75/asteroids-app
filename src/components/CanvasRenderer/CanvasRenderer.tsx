import React, { useEffect, useMemo, useRef } from 'react';
import { SocketData } from '../../types/socketData';

interface CanvasRendererProps {
  socketData: SocketData;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({ socketData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const asteroidImage = useMemo(() => {
    const img = new Image();
    img.src = '/images/asteroid.svg';
    return img;
  }, []);
  const minerImage = useMemo(() => {
    const img = new Image();
    img.src = '/images/miner.svg';
    return img;
  }, []);
  const planetImages = useMemo(
    () =>
      ['/images/pl1.svg', '/images/pl3.svg', '/images/pl2.svg'].map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      }),
    [],
  );
  const bgImg = useRef(new Image());
  const draw = (ctx: CanvasRenderingContext2D, bgImg: HTMLImageElement) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);

    socketData.planets.forEach((planet, index) => {
      const planetImg = planetImages[index];
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
      if (asteroidImage.complete) {
        ctx.drawImage(asteroidImage, asteroid.position.x - 15, asteroid.position.y - 15, 50, 50);
      }
    });

    socketData.miners.forEach((miner) => {
      if (minerImage.complete) {
        ctx.save(); // save the drawing state
        ctx.translate(miner.x, miner.y); // translate to the center of the canvas
        const adjustedAngle = ((miner.angle - 90 + 180) * Math.PI) / 180; // rotate to the correct angle
        ctx.rotate(adjustedAngle); // rotate the canvas
        ctx.drawImage(minerImage, -16, -16, 32, 32);
        ctx.restore();
      }
    });
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      draw(context, bgImg.current);
    }
  }, [socketData]);
  useEffect(() => {
    bgImg.current.src = '/images/bg.svg';
    bgImg.current.onload = () => {
      const context = canvasRef.current?.getContext('2d');
      if (context) {
        draw(context, bgImg.current);
      }
    };
  }, []);
  return <canvas ref={canvasRef} width={1000} height={1000} />;
};

export default CanvasRenderer;
