import React from 'react'
import HeadApp from '../components/Head/HeadApp'

export default function Layout({ children, head, display = '' }) {
  return (
    <>
      <HeadApp title={head} />
      <div className={`mt-6 container ${display}`}>
        {children}
      </div>
    </>
  )
}
