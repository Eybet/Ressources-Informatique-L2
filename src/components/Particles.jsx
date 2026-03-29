import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils"; // Adjusted path to your utils

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

export const Particles = ({
  className,
  children,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff", 
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const animationRef = useRef();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  function hexToRgb(hex) {
    let normalized = hex.replace("#", "");
    if (normalized.length === 3) {
      normalized = normalized.split("").map(char => char + char).join("");
    }
    const hexInt = parseInt(normalized, 16);
    return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
  }

  const rgb = hexToRgb(color);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [color]);

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  }, [mousePosition.x, mousePosition.y]);

  const initCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const circleParams = () => {
    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0, translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  };

  const drawCircle = (circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) circles.current.push(circle);
    }
  };

  const animate = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      circles.current.forEach((circle, i) => {
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
        
        
        circle.alpha += (circle.alpha < circle.targetAlpha) ? 0.01 : 0;

        drawCircle(circle, true);

        if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
            circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
          circles.current.splice(i, 1);
          drawCircle(circleParams());
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  return (
    <div ref={canvasContainerRef} className={cn("fixed inset-0 -z-10 bg-black", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {children}
    </div>
  );
};