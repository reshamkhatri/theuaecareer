'use client';

import { useState } from 'react';
import { FiCheck, FiLink } from 'react-icons/fi';

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <button className="btn btn-secondary btn-sm" type="button" onClick={handleCopy}>
      {copied ? <FiCheck /> : <FiLink />} {copied ? 'Copied' : 'Copy Link'}
    </button>
  );
}
