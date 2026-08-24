'use client';

/**
 * Adaptado de Lightswind UI (https://lightswind.com/components/3d-image-ring).
 * Cambio respecto al original: cada cara del anillo monta una <img> centrada con
 * object-fit:contain y marco (en vez de background-image:cover a pantalla completa),
 * para no recortar certificados con proporciones y contenido variable.
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RingItem {
  src: string;
  alt: string;
}

export interface ThreeDImageRingProps {
  items: RingItem[];
  width?: number;
  perspective?: number;
  imageDistance?: number;
  initialRotation?: number;
  animationDuration?: number;
  staggerDelay?: number;
  hoverOpacity?: number;
  containerClassName?: string;
  ringClassName?: string;
  backgroundColor?: string;
  draggable?: boolean;
  mobileBreakpoint?: number;
  mobileScaleFactor?: number;
  inertiaPower?: number;
  inertiaTimeConstant?: number;
  inertiaVelocityMultiplier?: number;
  frameColor?: string;
  onOpen?: (index: number) => void;
  onActiveChange?: (index: number) => void;
}

export function ThreeDImageRing({
  items,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.2,
  staggerDelay = 0.06,
  hoverOpacity = 0.45,
  containerClassName,
  ringClassName,
  backgroundColor,
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.72,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
  frameColor = '#3A3A3A',
  onOpen,
  onActiveChange,
}: ThreeDImageRingProps) {
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const dragMoved = useRef<boolean>(false);
  const velocity = useRef<number>(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / items.length, [items.length]);

  const reportActive = (rot: number) => {
    if (!onActiveChange) return;
    const norm = (((180 - rot) % 360) + 360) % 360;
    const idx = Math.round(norm / angle) % items.length;
    onActiveChange(idx);
  };

  useEffect(() => {
    const unsubscribe = rotationY.on('change', (latest) => {
      currentRotationY.current = latest;
      reportActive(latest);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotationY, angle]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      setCurrentScale(viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
    reportActive(initialRotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    dragMoved.current = false;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) ringRef.current.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX = 'touches' in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    if (Math.abs(deltaX) > 3) dragMoved.current = true;
    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = 'grab';
      currentRotationY.current = rotationY.get();
    }
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    animate(initial, initial + velocityBoost, {
      type: 'inertia',
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => rotationY.set(latest),
    });
    velocity.current = 0;
  };

  const itemVariants = {
    hidden: { y: 160, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className={cn('w-full h-full overflow-hidden select-none relative', containerClassName)}
      style={{ backgroundColor, transform: `scale(${currentScale})`, transformOrigin: 'center center' }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.15}px`,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn('w-full h-full absolute', ringClassName)}
          style={{ transformStyle: 'preserve-3d', rotateY: rotationY, cursor: draggable ? 'grab' : 'default' }}
        >
          <AnimatePresence>
            {showImages &&
              items.map((item, index) => (
                <motion.div
                  key={item.src}
                  className="w-full h-full absolute flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    rotateY: index * -angle,
                    z: -imageDistance * currentScale,
                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={itemVariants}
                  transition={{ delay: index * staggerDelay, duration: animationDuration, ease: easeOut }}
                  whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                  onHoverStart={() => {
                    if (isDragging.current || !ringRef.current) return;
                    Array.from(ringRef.current.children).forEach((el, i) => {
                      if (i !== index) (el as HTMLElement).style.opacity = `${hoverOpacity}`;
                    });
                  }}
                  onHoverEnd={() => {
                    if (isDragging.current || !ringRef.current) return;
                    Array.from(ringRef.current.children).forEach((el) => {
                      (el as HTMLElement).style.opacity = '1';
                    });
                  }}
                >
                  <button
                    type="button"
                    aria-label={`Ampliar: ${item.alt}`}
                    onClick={() => {
                      if (!dragMoved.current) onOpen?.(index);
                    }}
                    className="ringframe"
                    style={{ '--frame-c': frameColor } as React.CSSProperties}
                  >
                    <span className="ringmat">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.src} alt={item.alt} draggable={false} />
                    </span>
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .ringframe { display: block; border: none; padding: 0; background: none; cursor: pointer; pointer-events: auto; }
        .ringmat { display: inline-block; padding: 6px; background: #fdfdfc; border: 4px solid var(--frame-c);
          box-shadow: 0 16px 32px -18px rgba(0,0,0,0.55); }
        .ringmat img { display: block; height: min(38vw, 210px); width: auto; max-width: 60vw; user-select: none; -webkit-user-drag: none; }
      `}</style>
    </div>
  );
}

export default ThreeDImageRing;
