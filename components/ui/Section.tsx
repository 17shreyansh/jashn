import { HTMLAttributes, ReactNode } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  container?: boolean
}

export function Section({ children, container = true, className = '', ...props }: SectionProps) {
  return (
    <section className={`section-spacing ${className}`} {...props}>
      {container ? (
        <div className="container-custom">{children}</div>
      ) : children}
    </section>
  )
}
