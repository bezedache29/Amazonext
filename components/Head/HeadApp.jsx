import React from 'react'
import Head from "next/head"

export default function HeadApp({ title }) {
  return (
    <Head>
      <meta name="description" content={'AmazoNext' + title} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
      <title>AmazoNext - {title}</title>
    </Head>
  )
}
