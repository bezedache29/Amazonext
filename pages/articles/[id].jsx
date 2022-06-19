import React, { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../template/Layout'

export default function Show({ currentArticle }) {
  return (
    <Layout head={currentArticle.title}>
      <h1 className="mt-80 has-text-centered is-size-1 has-text-weight-bold">{currentArticle.title}</h1>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const id = context.params.id
  const response = await fetch(`${process.env.REACT_APP_URL_API}/articles/getAllArticles`)
  const articlesList = await response.json()

  const currentArticle = articlesList.find(article => article.id == id)

  if (!currentArticle) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      currentArticle
    }
  }
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/articles/getAllArticles`)
  const articlesList = await response.json()

  const paths = articlesList.map(item => ({
    params: {id: item.id.toString()}
  }))

  return {
    paths,
    fallback: false
  }
}
