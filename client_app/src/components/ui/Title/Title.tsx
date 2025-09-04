import React from 'react'

const Title = ({children, className} : {
    children: string | React.ReactNode,
    className?: string
} ) => {
  return (
    <div className={`text-4xl font-bold text-foreground ${className}`}>
      {children}
    </div>
  )
}

export default Title