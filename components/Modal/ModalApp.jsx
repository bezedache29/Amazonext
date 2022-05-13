import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

export default function ModalApp({ isOpen, onClose, logout }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Déconnexion ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p className='mb-5 mt-3'>Etes vous sur de vouloir vous déconnecter ?</p>
        </ModalBody>

        <ModalFooter>
          <div className="buttons">
            <button className="button is-danger" onClick={onClose}>Annuler</button>
            <button className='button is-primary' onClick={logout}>Se deconnecter</button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
