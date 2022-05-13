import React from 'react'

export default function ButtonForm({ color = 'is-primary', children, onClick }) {
  return (
    <p className={`button ${color} is-size-5`} onClick={onClick}><strong>{children}</strong></p>
  )
}
