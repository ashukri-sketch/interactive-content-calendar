/**
 * STATUS SYSTEM - Campaign Name Tag
 * Editable text field with light neutral background
 */

interface CampaignNameTagProps {
  value: string;
  onChange?: (value: string) => void;
  darkMode: boolean;
  editable?: boolean;
}

export function CampaignNameTag({
  value,
  onChange,
  darkMode,
  editable = false
}: CampaignNameTagProps) {
  return (
    <div className={`
      px-3 py-1.5 rounded-lg
      ${darkMode
        ? 'bg-white/10 border border-white/20'
        : 'bg-neutral-100 border border-neutral-200'
      }
    `}>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`
            w-full bg-transparent outline-none text-sm font-medium
            ${darkMode ? 'text-white' : 'text-neutral-900'}
          `}
          placeholder="Campaign Name"
        />
      ) : (
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          {value}
        </span>
      )}
    </div>
  );
}
