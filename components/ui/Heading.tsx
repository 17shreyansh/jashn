import { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  decorative?: boolean
  centered?: boolean
}

export function Heading({ level = 2, children, decorative = false, centered = false, className = '', ...props }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <Tag className={`font-serif ${centered ? 'mx-auto' : ''}`} {...props}>
        {children}
      </Tag>
      {decorative && (
        <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-luxury to-primary ${centered ? 'mx-auto' : ''}`} />
      )}
    </div>
  )
}
