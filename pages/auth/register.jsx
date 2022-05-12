import { Formik } from 'formik'
import React, {useState, useEffect} from 'react'
import AuthButton from '../../components/AuthButton/AuthButton'
import InputApp from '../../components/Input/InputApp'
import Layout from '../../template/Layout'
import { useFormik, yupToFormErrors } from 'formik'
import * as yup from 'yup'

export default function Register() {

  const formik = useFormik({
    initialValues: {
      email: '',
      pseudo: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        email: values.email,
        pseudo: values.pseudo,
        password: values.password
      }
      console.log(data)
      // resetForm()
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
                  error={formik.errors.email ? formik.errors.email : false}
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
                  error={formik.errors.pseudo ? formik.errors.pseudo : false}
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
                  error={formik.errors.password ? formik.errors.password : false}
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
                  error={formik.errors.passwordConfirm ? formik.errors.passwordConfirm : false}
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
