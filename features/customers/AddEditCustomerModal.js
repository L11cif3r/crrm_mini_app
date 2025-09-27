import React, { useEffect, useState } from "react";
import { Button, Modal, TextInput } from "react-native-paper";
import { useAddCustomerMutation, useUpdateCustomerMutation } from "./customersApi";

export default function AddEditCustomerModal({ visible, onClose, customer }) {
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
    }
  }, [customer]);

  const handleSave = async () => {
    console.log("handleSave called", { name, email, customer });
    if (customer) {
      await updateCustomer({ id: customer.id, name, email });
    } else {
      await addCustomer({ name, email });
    }
    onClose();
  };

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{ padding: 20, backgroundColor: "white" }}>
      <TextInput label="Name" value={name} onChangeText={setName} />
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <Button mode="contained" onPress={handleSave} style={{ marginTop: 10 }}>
        Save
      </Button>
    </Modal>
  );
}
