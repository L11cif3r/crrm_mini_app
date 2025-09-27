import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Modal, TextInput, Button } from "react-native-paper";
import { useAddLeadMutation, useUpdateLeadMutation } from "./leadsApi";

export default function AddEditLeadModal({ visible, onClose, customerId, lead }) {
  const [title, setTitle] = useState(lead?.title || "");
  const [status, setStatus] = useState(lead?.status || "open");
  const [addLead] = useAddLeadMutation();
  const [updateLead] = useUpdateLeadMutation();

  useEffect(() => {
    if (lead) {
      setTitle(lead.title);
      setStatus(lead.status);
    }
  }, [lead]);

  const handleSave = async () => {
    if (lead) {
      await updateLead({ id: lead.id, title, status, customerId });
    } else {
      await addLead({ title, status, customerId });
    }
    onClose();
  };

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{ padding: 20, backgroundColor: "white" }}>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Status" value={status} onChangeText={setStatus} />
      <Button mode="contained" onPress={handleSave} style={{ marginTop: 10 }}>
        Save
      </Button>
    </Modal>
  );
}
