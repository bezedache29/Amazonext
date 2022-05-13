import React, { useEffect, useState } from 'react'
import Layout from '../../template/Layout'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import ButtonForm from '../../components/Button/ButtonForm'

export default function Create() {

  const [categories, setCategories] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [image, setImage] = useState('')

  const [fileDataURL, setFileDataURL] = useState('')

  const formatValues = (categories) => {
    let formatValues = []
    categories.forEach((category) => {
      formatValues.push({
        value: category.name,
        label: category.name
      })
    })
    setCategories(formatValues)
  }

  const getAllCategories = async () => {
    const data = await fetch(`${process.env.REACT_APP_URL_API}/categories/getAllCategories`)
    const categories = await data.json()
    formatValues(categories)
  }

  const handleCreateItem = (item) => {
    setCategories((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    let fileReader, isCancel = false
    if(image !== '') {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(image)
    } 

    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [image])

  useEffect(() => {
    console.log(fileDataURL)
  }, [fileDataURL])

  const previewImage = (e) => {
    setImage(e.target.files[0])
  }

  const submitForm = () => {
    console.log(image)
    if (title !== '' && description !== '' && selectedItems.length > 0 && (price !== '' || price > 0)) {
      console.log('title', title)
      console.log('description', description)
      console.log('selectedItems', selectedItems)
      console.log('price', price)

      let newCategories = []
      selectedItems.forEach(item => {
        newCategories.push(item)
      })

      let data = {
        title,
        description,
        price,
        categories: newCategories
      }

      if (quantity !== '') {
        data = {
          ...data,
          quantity: +quantity
        }
      }

      if (image !== '') {
        data = {
          ...data,
          image
        }
      }

      console.log(data)

    } else {
      console.log('nope')
    }
  }

  return (
    <Layout head='Création article' display='is-max-desktop'>
      <div className="box mt-80 pt-1 mb-6">
        <h1 className='is-size-2 has-text-centered has-text-weight-bold mt-0'>Ajout d'un article</h1>
        <hr className='navbar-divider' />
        <form className="is-flex is-flex-direction-column mt-5 w-100" encType="multipart/form-data">

            <div className="columns">
              <div className="field column is-full">
                <label className={`label has-text-danger`}>Titre *</label>
                <div className="control">
                  <input type="text" className={`input`} name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Entrez le titre de l'article" autoFocus />
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="field column is-full">
                <label className="label">Description *</label>
                <textarea className="textarea" placeholder="Entrez la description de votre article" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div className="columns">
              <div className="field column is-full">
                {categories.length > 0 && (
                  <>
                    <CUIAutoComplete
                      label="Choisir la ou les catégorie(s) *"
                      placeholder="Rechercher une catégorie"
                      onCreateItem={handleCreateItem}
                      items={categories}
                      selectedItems={selectedItems}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemsChange(changes.selectedItems)
                      }
                    />
                    {/* <p>Errors</p> */}
                  </>
                )}
              </div>
            </div>

            <div className="columns">
              <div className="field column is-half">
                <label className={`label has-text-danger`}>Prix *</label>
                <div className="control">
                  <input type="number" className={`input`} name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Entrez le prix de l'article en euros" />
                </div>
              </div>
              <div className="field column is-half">
                <label className={`label`}>Quantité</label>
                <div className="control">
                  <input type="number" className={`input`} name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Entrez le quantité disponible" />
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="field column is-half my-auto">
                <div className="columns">
                  <div className="column is-half is-offset-one-quarter">
                    <label className='label has-text-centered'>Choisir une image</label>
                    <div className="file is-large is-boxed mx-auto">
                      <label className="file-label">
                        <input className="file-input" type="file" accept="image/*" name="image" onChange={(e) => previewImage(e)} />
                        <span className="file-cta">
                          <span className="file-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          </span>
                          <span className="file-label">
                            Parcourir ...
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field column is-half preview my-auto">
                {fileDataURL !== '' && <img className='preview-image' src={fileDataURL} alt="preview" />}
              </div>
            </div>

            <ButtonForm onClick={() => submitForm()}>Ajouter l'article</ButtonForm>
          </form>
      </div>
    </Layout>
  )
}
