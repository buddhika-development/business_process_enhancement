import React from 'react'

const SectionTitle = ({children, className} : {
    children: string | React.ReactNode,
    className?: string
}) => {
  return (
    <div>
        <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
    </div>
  )
}

export default SectionTitle