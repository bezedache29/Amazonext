import React, {useState, useEffect} from 'react'
import AuthButton from '../../components/AuthButton/AuthButton'
import InputApp from '../../components/Input/InputApp'
import Layout from '../../template/Layout'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'

export default function Register() {

  const [emailError, setEmailError] = useState(false)
  const [pseudoError, setPseudoError] = useState(false)

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      pseudo: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        email: values.email,
        pseudo: values.pseudo,
        password: values.password
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_API}/auth/register`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          }
        })
        const response = await res.json()
        console.log(response)

        setEmailError(false)
        setPseudoError(false)
        
        if (response.message) {
          if (response.message === "L'email existe déjà") {
            setEmailError(response.message)
          } else {
            setPseudoError(response.message)
          }
        } else {
          resetForm()
          router.push('/auth/login')
        }
      } catch(err) {
        console.log(err)
      }
    },
    validationSchema: yup.object({
      email: yup.string().email().min(5, "trop petit").max(40, "trop long!").required("L'email est obligatoire"),
      pseudo: yup.string().min(2, "trop petit").max(30, "trop long!").required("Le pseudo est obligatoire"),
      password: yup.string().min(6, "trop petit").max(30, "trop long!").required("Le mot de passe est obligatoire"),
      passwordConfirm: yup.string().min(6, "trop petit").max(30, "trop long!").required("La confirmation de mot de passe est obligatoire").oneOf([yup.ref("password"), null], "Le mot de passe de confirmation ne correspond pas"),
    })
  })

  return (
    <Layout head="S'enregistrer">
      <div className="columns mt-150">
        <div className="column is-half mx-auto box">
          <h1 className="has-text-centered is-size-1 has-text-weight-bold">Enregistrement</h1>
          <form onSubmit={formik.handleSubmit} className="is-flex is-flex-direction-column mt-5 w-100">

            <div className="columns">
              <div className="field column is-half">
                <InputApp 
                  type="email"
                  label="Email"
                  placeholder="Entrez votre email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email ? formik.errors.email : false}
                  otherError={emailError}
                  name="email"
                />
              </div>
              <div className="field column is-half">
                <InputApp 
                  type="text"
                  label="Pseudo"
                  placeholder="Entrez votre pseudo"
                  value={formik.values.pseudo}
                  onChange={formik.handleChange}
                  error={formik.touched.pseudo && formik.errors.pseudo ? formik.errors.pseudo : false}
                  otherError={pseudoError}
                  name="pseudo"
                />
              </div>
            </div>

            <div className="columns">
              <div className="field column is-half">
                <InputApp 
                  type="password"
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && formik.errors.password ? formik.errors.password : false}
                  name="password"
                />
              </div>
              <div className="field column is-half">
                <InputApp 
                  type="password"
                  label="Confirmez le mot de passe"
                  placeholder="Confirmez le mot de passe"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  error={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? formik.errors.passwordConfirm : false}
                  name="passwordConfirm"
                />
              </div>
            </div>

            <AuthButton>S'enregistrer</AuthButton>
          </form>
        </div>
      </div>
    </Layout>
  )
}
