import { useRef, memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, TextField, Button, Flex, Text, Section } from "@radix-ui/themes";
import { toast } from "react-toastify";

import { SaveModalProps } from "@/client/components/SaveModal/SaveModal.type";
import { saveGame } from "@/client/utils/api";

const SaveModal = ({isOpen, game, onClose}: SaveModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [isSaving, setSaving] = useState(false);
  const navigate = useNavigate();

  const onSave = useCallback(async () => {
    if (!nameRef.current?.value) {
      toast.error("Should input name to save game.");
      return;
    }
    try {
      await saveGame({ ...game, name: nameRef.current.value });
      toast.success("Save game successfullt");
      navigate(`/game/${game.id}`);
      onClose();
    } catch (error) {
      toast.error(error?.toString());
      console.error(error);
    }
    finally {
      setSaving(false);
    }
  }, [game]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content>
        <Dialog.Title>Input Game Name</Dialog.Title>

        <Section size="1">
          <Text>Name:</Text>
          <TextField.Root ref={nameRef} />
        </Section>

        <Flex className="justify-end gap-4">
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onSave} loading={isSaving}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default memo(SaveModal);
