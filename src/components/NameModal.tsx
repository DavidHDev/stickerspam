import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { setUserName } from '../utils';

import logo from '../assets/logo.svg';

const NameModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  return (
    <Modal size="sm" placement="center" backdrop='blur' isOpen={isOpen} onClose={onClose} isDismissable={false} hideCloseButton={true} radius="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center py-8 bg-purple-100">
              <img width={300} src={logo} alt="stickerspam logo" />
            </ModalHeader>
            <ModalBody>
              <p className="bg-purple-100 p-4 rounded-2xl text-sm mt-4">
                Pick and place one of four stickers each second.
              </p>
              <p className="bg-green-100 p-4 rounded-2xl text-sm mt-.5">
                Whoever places the 33rd sticker wins the round.
              </p>
            </ModalBody>
            <ModalFooter className="flex flex-col">
              <Input onChange={(e) => setName(e.target.value)} radius="lg" color="default" variant="bordered" maxLength={10} label="Enter a name to join" />
              <Button isDisabled={!name || name.length < 3} radius="lg" fullWidth variant="shadow" color="secondary" onPress={() => {
                setUserName(name);
                onClose();
              }}>
                Join Game
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NameModal;