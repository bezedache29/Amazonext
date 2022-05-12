import React from 'react'

export default function AuthButton({ color = 'is-primary', children }) {
  return (
    <button className={`button ${color} is-size-5`} type="submit"><strong>{children}</strong></button>
  )
}
