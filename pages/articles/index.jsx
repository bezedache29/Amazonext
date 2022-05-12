import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HeadApp from '../../components/Head/HeadApp'
import Layout from '../../template/Layout'

export default function Articles({ articlesList }) {
  console.log(articlesList)
  return (
    <Layout head='Articles'>
      <h1 className="mt-80 has-text-centered is-size-1 has-text-weight-bold">Liste des Artciles</h1>
      <div className="columns mt-4 is-flex is-flex-wrap-wrap">
        {articlesList.length > 0 ? articlesList.map(article => (
          <div className="column is-one-quarter" key={article.id}>
            <div className="card p-1">
              <div className="card-image">
                <figure className="image is-4by3">
                  <Image 
                    src={require(`../../assets/images/articles/${article.image}`)}
                    layout='fill'
                    objectFit='contain'
                    alt={`Image de ${article.title}`}
                  />
                </figure>
              </div>
              <div className="card-content pt-1">
                <div className='h-80 is-flex is-justify-content-center is-align-items-center'>
                  <h2 className='is-size-4 has-text-centered has-text-weight-bold '>{article.title}</h2>
                </div>
                <hr className='mt-2 mb-4'/>
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-32x32">
                      <img className='is-rounded' src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-6">{article.userName}</p>
                    <p className="subtitle is-7">{article.createdAt}</p>
                  </div>
                </div>

                <div className="content">
                  <p className="is-truncated">
                    {article.description}
                  </p>
                  <div className="is-flex">
                    <a href="#" className='mx-1'>#css</a> <a href="#" className='mx-1'>#responsive</a>
                  </div>
                  <div className="mt-2 is-flex is-align-items-center">
                    <p className='m-0 is-size-3'>{article.price} €</p>
                    <div className='ml-auto'>
                      <Link href={'/'}>
                        <a className='button is-link'>Détails</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <h2>Pas d'articles</h2>
        )}
      </div>
    </Layout>
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
