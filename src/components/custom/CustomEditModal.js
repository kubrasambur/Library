import React from "react";
import { Modal, Button, FormControl, Input } from "native-base";

const CustomEditModal = ({
  isOpen,
  setOpen,
  value,
  onChangeText,
  handleOnPress,
  bookName,
  author,
  publisher,
  category,
  publishYear,
  pages,
  authorVal,
  onChangeAuthorText,
  publisherVal,
  onChangePublisherText,
  categoryVal,
  onChangeCategoryText,
  publishYearVal,
  onChangePublishYearText,
  pagesVal,
  onChangePagesText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
      <Modal.Content
        maxWidth="350"
        style={{ marginBottom: "auto", marginTop: 0 }}
      >
        <Modal.CloseButton />
        <Modal.Header>Edit book</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label mt={-3} _text={{ fontSize: 11 }}>
              {bookName}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={value}
              onChangeText={onChangeText}
            />
            <FormControl.Label _text={{ fontSize: 11 }}>
              {author}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={authorVal}
              onChangeText={onChangeAuthorText}
            />
            <FormControl.Label _text={{ fontSize: 11 }}>
              {publisher}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={publisherVal}
              onChangeText={onChangePublisherText}
            />
            <FormControl.Label _text={{ fontSize: 11 }}>
              {category}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={categoryVal}
              onChangeText={onChangeCategoryText}
            />
            <FormControl.Label _text={{ fontSize: 11 }}>
              {publishYear}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={publishYearVal}
              onChangeText={onChangePublishYearText}
            />
            <FormControl.Label _text={{ fontSize: 11 }}>
              {pages}
            </FormControl.Label>
            <Input
              p={0}
              pl={2}
              size="sm"
              value={pagesVal}
              onChangeText={onChangePagesText}
            />
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
  );
};

export default CustomEditModal;
