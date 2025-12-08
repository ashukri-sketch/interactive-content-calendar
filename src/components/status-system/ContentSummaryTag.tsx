/**
 * STATUS SYSTEM - Content Summary Tag
 * Multi-line editable description with compact/expanded variants
 */

interface ContentSummaryTagProps {
  value: string;
  onChange?: (value: string) => void;
  darkMode: boolean;
  variant?: 'compact' | 'expanded';
  editable?: boolean;
}

export function ContentSummaryTag({
  value,
  onChange,
  darkMode,
  variant = 'compact',
  editable = false
}: ContentSummaryTagProps) {
  const isCompact = variant === 'compact';

  return (
    <div className={`
      p-3 rounded-lg
      ${darkMode
        ? 'bg-white/5 border border-white/10'
        : 'bg-neutral-50 border border-neutral-200'
      }
    `}>
      <label className={`
        text-xs font-medium mb-1.5 block
        ${darkMode ? 'text-white/60' : 'text-neutral-600'}
      `}>
        Post Topic / Description
      </label>

      {editable ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={isCompact ? 2 : 4}
          className={`
            w-full bg-transparent outline-none text-sm resize-none
            ${darkMode ? 'text-white' : 'text-neutral-900'}
          `}
          placeholder="Describe the content..."
        />
      ) : (
        <p className={`
          text-sm whitespace-pre-wrap
          ${darkMode ? 'text-white' : 'text-neutral-900'}
          ${isCompact ? 'line-clamp-2' : ''}
        `}>
          {value}
        </p>
      )}
    </div>
  );
}
