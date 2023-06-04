import { Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

import React, { useEffect, useState } from 'react'

import { useNavigate} from 'react-router-dom'

export default function AgeConfirmation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
  
    // show the modal only if the user hasn't confirmed their age
    useEffect(() => {
      const userAgeConfirmed = localStorage.getItem('userAgeConfirmed');
      if (!userAgeConfirmed) {
        setIsModalOpen(true);
      }
    }, []);

    useEffect(() => {
        const userAgeConfirmed = localStorage.getItem('userAgeConfirmed');
        if (!userAgeConfirmed) {
          setIsModalOpen(true);
        }
    }, [isModalOpen]);
  
    const handleConfirm = () => {
      // store the confirmation in local storage
      localStorage.setItem('userAgeConfirmed', 'true');
      setIsModalOpen(false);
    };
  
    const onClose = () => {
        setIsModalOpen(false);
        navigate(-1);
    }
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Age Confirmation</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Are you over 21 years old?
      </ModalBody>
      <ModalFooter>
      <Button onClick={onClose}>
                No, take me back
              </Button>
              <Spacer />
        <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
          Yes, I'm over 21
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
