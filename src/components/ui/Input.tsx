import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">{label}</label>}
        <input
          ref={ref}
          className={`
            w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3
            text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]
            focus-ring transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 h-full">
        {label && <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">{label}</label>}
        <textarea
          ref={ref}
          className={`
            w-full h-full min-h-[120px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3
            text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]
            focus-ring transition-all duration-200 resize-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
