

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, className = '' }: ToggleProps) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={`
          block w-14 h-8 rounded-full transition-colors duration-300
          ${checked ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}
        `}></div>
        <div className={`
          absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md
          ${checked ? 'transform translate-x-6' : ''}
        `}></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-[var(--color-text-primary)]">{label}</span>}
    </label>
  );
}
