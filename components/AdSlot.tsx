'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() || '';

export default function AdSlot({
  slot,
  className = '',
  minHeight = 280,
  format = 'auto',
  fullWidthResponsive = true,
}: {
  slot?: string;
  className?: string;
  minHeight?: number;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
}) {
  const adRef = useRef<HTMLModElement | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!publisherId || !slot || !adRef.current || hasLoadedRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      hasLoadedRef.current = true;
    } catch {
      hasLoadedRef.current = false;
    }
  }, [slot]);

  if (!publisherId || !slot) {
    return null;
  }

  return (
    <div
      className={className}
      aria-label="Advertisement"
      style={{
        minHeight,
        width: '100%',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight, width: '100%' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}
