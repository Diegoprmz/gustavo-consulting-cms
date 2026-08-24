'use client';

/**
 * Adaptado de Lightswind UI (https://lightswind.com/components/3d-image-ring).
 * Cambio respecto al original: cada cara del anillo monta una <img> centrada con
 * object-fit:contain y marco (en vez de background-image:cover a pantalla completa),
 * para no recortar certificados con proporciones y contenido variable.
 */

import React, { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RingItem {
  src: string;
  alt: string;
}

export interface ThreeDImageRingHandle {
  /** Gira una posición hacia adelante (1) o atrás (-1). */
  step: (dir: 1 | -1) => void;
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

/** Ancho aproximado (px) de una cara del anillo (marco + certificado), usado para separar las caras sin que se encimen. */
const FACE_WIDTH = 750;

export const ThreeDImageRing = forwardRef<ThreeDImageRingHandle, ThreeDImageRingProps>(function ThreeDImageRing({
  items,
  width = 900,
  perspective,
  imageDistance,
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
}: ThreeDImageRingProps, ref) {
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const dragMoved = useRef<boolean>(false);
  const velocity = useRef<number>(0);
  const stepTransitionTimeout = useRef<number | undefined>(undefined);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / items.length, [items.length]);

  // Radio mínimo para que las caras adyacentes no se encimen: cuerda >= ancho de cara.
  const effectiveDistance = useMemo(() => {
    // *1.08 deja un respiro mínimo entre caras contiguas — a cuerda exacta se ven pegadas.
    const minDistance = (FACE_WIDTH * 1.08) / (2 * Math.sin(Math.PI / items.length));
    return Math.max(imageDistance ?? 0, minDistance, 400);
  }, [items.length, imageDistance]);
  const effectivePerspective = perspective ?? Math.max(2000, effectiveDistance * 1.6);

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

  useImperativeHandle(ref, () => ({
    step: (dir: 1 | -1) => {
      rotationY.stop();
      const target = Math.round(currentRotationY.current / angle) * angle + dir * angle;
      if (ringRef.current) ringRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
      rotationY.set(target);
      window.clearTimeout(stepTransitionTimeout.current);
      stepTransitionTimeout.current = window.setTimeout(() => {
        if (ringRef.current) ringRef.current.style.transition = '';
      }, 470);
    },
  }), [angle, rotationY]);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    dragMoved.current = false;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    window.clearTimeout(stepTransitionTimeout.current);
    if (ringRef.current) {
      ringRef.current.style.cursor = 'grabbing';
      ringRef.current.style.transition = '';
    }
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
          perspective: `${effectivePerspective}px`,
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
                    z: -effectiveDistance * currentScale,
                    transformOrigin: `50% 50% ${effectiveDistance * currentScale}px`,
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
          box-shadow: 0 6px 16px -6px rgba(0,0,0,0.28); }
        .ringmat img { display: block; height: 640px; width: auto; max-width: 700px; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      `}</style>
    </div>
  );
});

export default ThreeDImageRing;
