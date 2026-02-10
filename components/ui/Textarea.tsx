import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-base font-bold text-text-dark mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-5 py-4 text-base font-semibold rounded-xl border-2 border-luxury/30 focus:border-primary focus:outline-none transition-colors resize-none ${error ? 'border-red-500' : ''} ${className}`}
          rows={4}
          {...props}
        />
        {error && (
          <p className="mt-1 text-base font-semibold text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
