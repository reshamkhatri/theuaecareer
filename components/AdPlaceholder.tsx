interface AdPlaceholderProps {
  width?: string;
  height?: string;
  format?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'fluid';
  label?: string;
}

export default function AdPlaceholder({ width = '100%', height, format = 'rectangle', label = 'AdSense Placeholder' }: AdPlaceholderProps) {
  // Preset sizes for common AdSense formats
  let presetHeight = height;
  let presetWidth = width;
  
  if (!height) {
    if (format === 'leaderboard') presetHeight = '90px'; // 728x90
    else if (format === 'skyscraper') presetHeight = '600px'; // 300x600
    else if (format === 'fluid') presetHeight = 'auto'; // in-feed or in-article
    else presetHeight = '250px'; // 300x250 rectangle
  }

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
        overflow: 'hidden'
      }}
    >
      {label} ({format})
    </div>
  );
}
