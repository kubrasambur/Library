import React from 'react'
import { Modal, Button, FormControl, Input } from "native-base";

const CustomEditModal = ({ isOpen,
    setOpen,
    value,
    onChangeText,
    handleOnPress,
    title,}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
    <Modal.Content maxWidth="350">
      <Modal.CloseButton />
      <Modal.Body>
        <FormControl>
          <FormControl.Label>{title}</FormControl.Label>
          <Input value={value} onChangeText={onChangeText} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={setOpen}>
            Close
          </Button>
          <Button onPress={handleOnPress}>Edit</Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}

export default CustomEditModal