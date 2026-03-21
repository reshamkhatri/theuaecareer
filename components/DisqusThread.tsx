'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (config: { reload: boolean; config: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}

export default function DisqusThread({
  identifier,
  title,
  url,
}: {
  identifier: string;
  title: string;
  url: string;
}) {
  const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

  useEffect(() => {
    if (!shortname) {
      return;
    }

    window.disqus_config = function disqusConfig() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).page.url = url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).page.identifier = identifier;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).page.title = title;
    };

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: window.disqus_config || (() => undefined),
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', Date.now().toString());
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [identifier, shortname, title, url]);

  if (!shortname) {
    return null;
  }

  return <div id="disqus_thread" />;
}
