import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormLabel, FormControl, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InputApp from '../Input/InputApp'

export default function ModalAddress({ isOpen, onClose, setAddressAdded, userName }) {

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      firstname: '',
      address: '',
      zipCode: '',
      city: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        name: values.name,
        lastname: values.lastname,
        firstname: values.firstname,
        address: values.address,
        zipCode: values.zipCode,
        city: values.city,
        userName: userName
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_API}/addresses/addAddress`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          }
        })
        const response = await res.json()
        console.log(response)
        resetForm()
        setAddressAdded(true)
      } catch(err) {
        console.log(err)
      }
    },
    validationSchema: yup.object({
      name: yup.string().min(5, "trop petit").max(40, "trop long!").required("Le nom est obligatoire"),
      lastname: yup.string().min(2, "trop petit").max(30, "trop long!").required("Le nom est obligatoire"),
      firstname: yup.string().min(2, "trop petit").max(30, "trop long!").required("Le prénom est obligatoire"),
      address: yup.string().min(2, "trop petit").max(30, "trop long!").required("L'adresse est obligatoire"),
      zipCode: yup.string().min(5, "trop petit").max(5, "trop long!").required("Le code postal est obligatoire"),
      city: yup.string().min(5, "trop petit").max(30, "trop long!").required("La ville est obligatoire"),
    })
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Ajouter une adresse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl pb={1}>
              <InputApp 
                label="Nom de l'adresse"
                placeholder="Nom de l'adresse"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : false}
                name="name"
              />
            </FormControl>
            <FormControl pb={1}>
              <InputApp 
                label="Nom de famille"
                placeholder="Nom de famille"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : false}
                name="lastname"
              />
            </FormControl>
            <FormControl pb={1}>
              <InputApp 
                label="Prénom"
                placeholder="Prénom"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : false}
                name="firstname"
              />
            </FormControl>
            <FormControl pb={1}>
              <InputApp 
                label="Adresse"
                placeholder="Adresse"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && formik.errors.address ? formik.errors.address : false}
                name="address"
              />
            </FormControl>
            <FormControl pb={1}>
              <InputApp 
                label="Code postal"
                placeholder="Code postal"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && formik.errors.zipCode ? formik.errors.zipCode : false}
                name="zipCode"
              />
            </FormControl>
            <FormControl pb={1}>
              <InputApp 
                label="Ville"
                placeholder="Ville"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && formik.errors.city ? formik.errors.city : false}
                name="city"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <div className="buttons">
              <button type="button" className="button is-danger" onClick={onClose}>Annuler</button>
              <button type="submit" className='button is-link'>Ajouter</button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
