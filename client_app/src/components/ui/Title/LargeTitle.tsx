import React from 'react'

const LargeTitle = ({ children, className } : {
    children: string | React.ReactNode,
    className?: string
}) => {
  return (
    <div className={`text-4xl lg:text-5xl font-bold ${className}`}>{children}</div>
  )
}

export default LargeTitle