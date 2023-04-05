import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Select,
  Box,
  CheckIcon,
} from "native-base";

export default function CustomAddModal({
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
}) {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
      <Modal.Content
        maxWidth="350"
        style={{ marginBottom: "auto", marginTop: 0 }}
      >
        <Modal.CloseButton />
        <Modal.Header>Add book</Modal.Header>
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
            <FormControl.Label _text={{ fontSize: 11 }}>
              {category}
            </FormControl.Label>
          </FormControl>
          <Select
            style={{ height: 30 }}
            selectedValue={categoryVal}
            minWidth="200"
            accessibilityLabel="Choose Service"
            _selectedItem={{
              bg: "teal.300",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => onChangeCategoryText(itemValue)}
          >
            <Select.Item label="Horror" value="Horror" />
            <Select.Item label="Action " value="Action " />
            <Select.Item label="Comic book" value="Comic book" />
            <Select.Item label="Historical" value="Historical" />
            <Select.Item label="Classics" value="Classics" />
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={setOpen}>
              Close
            </Button>
            <Button onPress={handleOnPress}>Add</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
