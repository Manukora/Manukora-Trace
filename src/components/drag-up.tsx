'use client';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isDesktop;
}

export default function DragUp({ open, onClose }: { open: boolean; onClose: () => void }) {
  const y = useMotionValue(0);
  const controls = useAnimation();
  const threshold = -100; // Negative for upward drag
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  // Auto-dismiss after 2 seconds
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      controls.start({ y: -window.innerHeight, transition: { duration: 0.3 } }).then(onClose);
    }, 1000);
    return () => clearTimeout(timer);
  }, [open, controls, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-55 bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{ y, touchAction: 'none' }}
      drag="y"
      dragConstraints={{ top: -window.innerHeight, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        // If dragged up past threshold or released with upward velocity, dismiss
        if (info.point.y < threshold || info.velocity.y < -500) {
          controls.start({ y: -window.innerHeight, transition: { duration: 0.3 } }).then(onClose);
        } else {
          controls.start({ y: 0, transition: { duration: 0.3 } });
        }
      }}
      animate={controls}
      initial={{ y: 0 }}
    >
      <Image
        src={isDesktop ? "/loading-desktop.png" : "/loading.png"}
        alt="Loading"
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
        width={1000}
        height={1000}
        style={{ position: 'absolute', inset: 0 }}
      />
      <div className="absolute top-0 w-full flex flex-col items-center z-10 pt-12">
        <h1 className="font-moretmnk text-5xl text-[#C9A14A] mb-2 text-center">Manukora</h1>
        <svg className="mb-2 text-center" width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="28" cy="28" r="27" stroke="white" strokeWidth="2"/>
<circle cx="28" cy="28" r="20" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M39.0814 23.2372C39.465 23.6345 39.4539 24.2675 39.0566 24.6512L26.2394 37.0274C25.8551 37.3986 25.2468 37.402 24.8583 37.0352L15.7271 28.414C15.3255 28.0348 15.3074 27.4019 15.6865 27.0004L18.0893 24.4554C18.4684 24.0539 19.1013 24.0357 19.5029 24.4148L24.8156 29.4308C25.2042 29.7976 25.8124 29.7942 26.1968 29.4231L35.2362 20.6946C35.6335 20.311 36.2665 20.3221 36.6502 20.7194L39.0814 23.2372Z" fill="#231F20"/>
</svg>

        <p className="font-moretmnk text-2xl text-[#C9A14A] text-center">
            {t('header_title')}
        </p>
      </div>
    </motion.div>
  );
}