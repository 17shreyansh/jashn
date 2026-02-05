import { HTMLAttributes, ReactNode, createElement } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  decorative?: boolean
  centered?: boolean
}

export function Heading({ level = 2, children, decorative = false, centered = false, className = '', ...props }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {createElement(Tag, { className: `font-serif ${centered ? 'mx-auto' : ''}`, ...props }, children)}
      {decorative && (
        <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-luxury to-primary ${centered ? 'mx-auto' : ''}`} />
      )}
    </div>
  )
}
