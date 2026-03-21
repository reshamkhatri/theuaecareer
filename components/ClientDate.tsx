'use client';

import { useState, useEffect } from 'react';

export default function ClientDate({ date, prefix }: { date: string | Date; prefix?: string }) {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    setFormatted(new Date(date).toLocaleDateString());
  }, [date]);

  if (!formatted) return null;

  return <>{prefix ? `${prefix} ${formatted}` : formatted}</>;
}
