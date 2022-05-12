import React from 'react'

export default function Articles({ articlesList }) {
  console.log(articlesList)
  return (
    <div>index</div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/articles/getAllArticles')
  const articlesList = await data.json()

  return {
    props: {
      articlesList
    }
  }
}
