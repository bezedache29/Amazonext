import React, { useEffect, useState } from 'react'
import Layout from '../../template/Layout'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import ButtonForm from '../../components/Button/ButtonForm'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Create() {

  const [categories, setCategories] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const [loader, setLoader] = useState(true)

  const [file, setFile] = useState('')
  const [image, setImage] = useState(false)
  const [fileDataURL, setFileDataURL] = useState('')

  const [categoriesError, setCategoriesError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const router = useRouter();

  useEffect(() => {
    getAllCategories()
  }, [])

  // Permet de récupérer toutes les catégories 
  const getAllCategories = async () => {
    const data = await fetch(`${process.env.REACT_APP_URL_API}/categories/getAllCategories`)
    const categories = await data.json()
    formatValues(categories)
  }

  // Permet de formter le tableau pour le select multiple
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

  useEffect(() => {
    if (categories.length > 0) {
      setLoader(false)
    }
  }, [categories])

  // Sert pour le select multiple
  const handleCreateItem = (item) => {
    setCategories((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  // Sert pour le select multiple
  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setCategoriesError(false)
      setSelectedItems(selectedItems)
    }
  }

  // Lorqu'on choisi ou non un fichier
  const handleImage = async (e) => {
    const fileInput = e.target.files[0]
    console.log(fileInput)

    // const formdata = new FormData();
    // formdata.append('file', fileInput)

    // const res = await fetch(`${process.env.REACT_APP_URL_API}/articles/addOneArticle`, {
    //   method: 'POST',
    //   body: formdata,
    //   // headers: {
    //   //   'Content-Type': 'multipart/form-data'
    //   // }
    // })

    if (fileInput && (fileInput.type === 'image/jpeg' || fileInput.type === 'image/png' || fileInput.type === 'image/webp' || fileInput.type === 'image/gif' || fileInput.type === 'image/bmp')) {
      setFile(fileInput)
      setImageError(false)
    } else {
      setFileDataURL('')
      setFile('')
      setImageError('Image uniquement')
    }
  }

  // Permet d'avoir une url file a afficher en preview
  useEffect(() => {
    let fileReader, isCancel = false
    if (file !== '') {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif' || file.type === 'image/bmp') {
        fileReader = new FileReader()
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURL(result)
          }
        }
        fileReader.readAsDataURL(file)
  
        setImage(file)
      }
    }

    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      quantity: ''
    },
    onSubmit: async (values, { resetForm }) => {

      let categoriesForDB = []

      selectedItems.forEach(cat => {
        categoriesForDB.push(cat.value)
      })

      const formdata = new FormData()
      formdata.append('title', values.title)
      formdata.append('description', values.description)
      formdata.append('price', values.price)
      formdata.append('quantity', values.quantity)
      formdata.append('categories', JSON.stringify(categoriesForDB))

      if (file !== '') {
        formdata.append('image', file)
      }

      // console.log(...formdata)

      try {
        const res = await fetch(`${process.env.REACT_APP_URL_API}/articles/addOneArticle`, {
          method: 'POST',
          body: formdata
        })
        const response = await res.json()
        if (response) {
          router.push('/articles')
          localStorage.setItem('addArticle', response.title)
        }
      } catch (err) {
        console.log(err)
      }
      // try {
      //   const res = await fetch(`${process.env.REACT_APP_URL_API}/auth/register`, {
      //     method: 'POST',
      //     body: JSON.stringify(data),
      //     headers: {
      //       "content-type": "application/json"
      //     }
      //   })
      //   const response = await res.json()
      //   console.log(response)

      //   setEmailError(false)
      //   setPseudoError(false)
        
      //   if (response.message) {
      //     if (response.message === "L'email existe déjà") {
      //       setEmailError(response.message)
      //     } else {
      //       setPseudoError(response.message)
      //     }
      //   } else {
      //     // resetForm()
      //     // router.push('/auth/login')
      //     console.log(response)
      //   }
      // } catch(err) {
      //   console.log(err)
      // }
    },
    validationSchema: yup.object({
      title: yup.string().min(5, "trop petit").max(40, "trop long!").required("Le titres est obligatoire"),
      description: yup.string().min(10, "trop petit").max(100, "trop long!").required("La description est obligatoire"),
      price: yup.number().min(1, "trop petit").max(9999, "trop long!").required("Le prix est obligatoire"),
      quantity: yup.number().min(1, "trop petit").max(999, "trop long!")
    })
  })

  // A la soumission du formulaire, on check qu'il y a des categories
  // Si c'est le cas on lance la soumission formik
  // Sinon on envoie une erreur
  const submitFormArticle = () => {
    setCategoriesError(false)
    let categoriesReadyToSubmit = false
    // let imageReadyToSubmit = false

    if (selectedItems.length > 0) {
      categoriesReadyToSubmit = true
    } else {
      setCategoriesError('Veuillez choisir au moins une catégorie')
    }

    // if (image) {
    //   imageReadyToSubmit = true
    // }

    if (categoriesReadyToSubmit) {
      console.log('ici')
      formik.handleSubmit()
    }
  }

  if (loader) {
    return <div></div>
  }

  return (
    <Layout head='Création article' display='is-max-desktop'>
      <div className="box mt-80 pt-1 mb-6">
        <h1 className='is-size-2 has-text-centered has-text-weight-bold mt-0'>Ajout d'un article</h1>
        <hr className='navbar-divider' />
        <form className="is-flex is-flex-direction-column mt-5 w-100" encType="multipart/form-data">

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
                    labelStyleProps={categoriesError ? { color: 'red' } : {fontWeight: 'bold'}}
                    inputStyleProps={categoriesError ? { borderColor: 'red' } : ''}
                  />
                  {categoriesError && <p className="help is-danger">{categoriesError}</p>}
                </>
              )}
            </div>
          </div>

          <div className="columns">
            <div className="field column is-full">
              <label className={formik.touched.title && formik.errors.title ? 'label has-text-danger' : 'label'}>Titre *</label>
              <div className="control">
                <input 
                  type="text" 
                  className={formik.touched.title && formik.errors.title ? 'input is-danger' : 'input'} 
                  name="title" 
                  value={formik.values.title} 
                  onChange={formik.handleChange} 
                  placeholder="Entrez le titre de l'article"
                />
                {(formik.touched.title && formik.errors.title) && <p className="help is-danger">{formik.errors.title}</p>}
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="field column is-full">
              <label className={formik.touched.description && formik.errors.description ? 'label has-text-danger' : 'label'}>Description *</label>
              <textarea className={formik.touched.description && formik.errors.description ? 'textarea is-danger' : 'textarea'} placeholder="Entrez la description de votre article" name="description" value={formik.values.description} onChange={formik.handleChange} />
              {(formik.touched.description && formik.errors.description) && <p className="help is-danger">{formik.errors.description}</p>}
            </div>
          </div>

          <div className="columns">
            <div className="field column is-half">
              <label className={formik.touched.price && formik.errors.price ? 'label has-text-danger' : 'label'}>Prix *</label>
              <div className="control">
                <input 
                  type="number" 
                  className={formik.touched.price && formik.errors.price ? 'input is-danger' : 'input'} 
                  name="price" 
                  value={formik.values.price} 
                  onChange={formik.handleChange} 
                  placeholder="Entrez le prix de l'article en euros"
                />
                {(formik.touched.price && formik.errors.price) && <p className="help is-danger">{formik.errors.price}</p>}
              </div>
            </div>
            <div className="field column is-half">
              <label className={formik.touched.quantity && formik.errors.quantity ? 'label has-text-danger' : 'label'}>Quantité</label>
              <div className="control">
                <input 
                  type="number" 
                  className={formik.touched.quantity && formik.errors.quantity ? 'input is-danger' : 'input'} 
                  name="quantity" 
                  value={formik.values.quantity} 
                  onChange={formik.handleChange} 
                  placeholder="Entrez le quantité disponible"
                />
                {(formik.touched.quantity && formik.errors.quantity) && <p className="help is-danger">{formik.errors.quantity}</p>}
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="field column is-half my-auto">
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                  <label className={imageError ? 'label has-text-centered has-text-danger' : 'label has-text-centered'}>
                    {imageError ? imageError : 'Choisir une image'}
                  </label>
                  <div className="file is-large is-boxed mx-auto">
                    <label className="file-label">
                      <input className="file-input" type="file" accept="image/*" name="image" onChange={handleImage} />
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
            <div className="field column is-half preview my-auto is-flex is-justify-content-center is-align-items-center">
              {fileDataURL !== '' && <img className='preview-image' src={fileDataURL} alt="preview" />}
              {imageError && <Image src={require('../../assets/images/errors/wrong-image.png')} className='preview-image' width="200" height="200" />}
              
            </div>
          </div>

          <ButtonForm onClick={() => submitFormArticle()}>Ajouter l'article</ButtonForm>
        </form>
      </div>
    </Layout>
  )
}
