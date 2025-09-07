import React from 'react'

const SecondaryTitle = ({children, className} : {
    children : string | React.ReactNode,
    className ?: string
}) => {
  return (
    <div className={`text-2xl font-semibold ${className}`}>
      {children}
    </div>
  )
}

export default SecondaryTitle