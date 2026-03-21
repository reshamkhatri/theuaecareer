'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  format?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'fluid';
  label?: string;
}

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const adsenseSlots = {
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE,
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
  skyscraper: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SKYSCRAPER,
  fluid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FLUID,
};

export default function AdPlaceholder({
  width = '100%',
  height,
  format = 'rectangle',
  label = 'Advertisement',
}: AdPlaceholderProps) {
  const presetHeight =
    height ||
    (format === 'leaderboard'
      ? '90px'
      : format === 'skyscraper'
        ? '600px'
        : format === 'fluid'
          ? 'auto'
          : '250px');
  const presetWidth = width;
  const slotId = adsenseSlots[format];

  useEffect(() => {
    if (!adsenseClient || !slotId || typeof window === 'undefined') {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Failed to initialize ad slot:', error);
    }
  }, [slotId]);

  if (!adsenseClient || !slotId) {
    return (
      <div
        style={{
          width: presetWidth,
          height: presetHeight,
          minHeight: format === 'fluid' ? '120px' : presetHeight,
          background: 'var(--bg-alt)',
          border: '1px dashed var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          fontWeight: 500,
          margin: '1rem 0',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <div
      style={{
        width: presetWidth,
        minHeight: format === 'fluid' ? '120px' : presetHeight,
        margin: '1rem 0',
        overflow: 'hidden',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: presetWidth,
          height: presetHeight,
          minHeight: format === 'fluid' ? '120px' : presetHeight,
        }}
        data-ad-client={adsenseClient}
        data-ad-slot={slotId}
        data-ad-format={format === 'fluid' ? 'auto' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}
