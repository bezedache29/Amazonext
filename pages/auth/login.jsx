import React, {useState} from 'react'
import AuthButton from '../../components/AuthButton/AuthButton'
import InputApp from '../../components/Input/InputApp'
import Layout from '../../template/Layout'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { setCookies } from 'cookies-next'
import { useStoreActions } from 'easy-peasy'

export default function Register() {

  const [error, setError] = useState(false)

  const router = useRouter()

  // STORE
  const userActions = useStoreActions((actions) => actions.user)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        email: values.email,
        password: values.password
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_API}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          }
        })
        const response = await res.json()

        console.log(response)
        setError(false)

        if (response.message) {
          if (response.message === 'Invalid Email or Password.') {
            setError('Mauvais Email et/ou Mot de passe')
          }
        } else {
          resetForm()
          setCookies('jwt', response.token)
          userActions.loadUser(response.user)
          router.push('/articles')
        }
      } catch(err) {
        console.log(err)
      }
    },
    validationSchema: yup.object({
      email: yup.string().email().min(5, "trop petit").max(40, "trop long!").required("L'email est obligatoire"),
      password: yup.string().min(6, "trop petit").max(30, "trop long!").required("Le mot de passe est obligatoire"),
    })
  })

  return (
    <Layout head="S'enregistrer">
      <div className="columns mt-150">
        <div className="column is-half mx-auto box">
          <h1 className="has-text-centered is-size-1 has-text-weight-bold">Connexion</h1>
          <form onSubmit={formik.handleSubmit} className="is-flex is-flex-direction-column mt-5 w-100">

            <div className="columns">
              <div className="field column is-full">
                <InputApp 
                  type="email"
                  label="Email"
                  placeholder="Entrez votre email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email ? formik.errors.email : false}
                  otherError={error}
                  name="email"
                />
              </div>
            </div>
            <div className="columns">
              <div className="field column is-full">
                <InputApp 
                  type="password"
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && formik.errors.password ? formik.errors.password : false}
                  otherError={error}
                  name="password"
                />
              </div>
            </div>

            <AuthButton>Se connecter</AuthButton>
          </form>
        </div>
      </div>
    </Layout>
  )
}

