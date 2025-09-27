import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useGetCustomerByIdQuery } from "./customersApi";
import { useGetLeadsQuery } from "../leads/leadsApi";
import AddEditLeadModal from "../leads/AddEditLeadModal";

export default function CustomerDetailsScreen({ route }) {
  const { customerId } = route.params;

  // Customer data
  const { data: customer, isLoading, isError } = useGetCustomerByIdQuery(customerId);

  // Leads data
  const { data: leads = [], refetch } = useGetLeadsQuery(customerId);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Status filter state
  const [statusFilter, setStatusFilter] = useState("all");

  if (isLoading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (isError) return <Text>Error loading customer</Text>;

  // Filter leads based on status
  const filteredLeads =
    statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Customer Info */}
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{customer.name}</Text>
      <Text>{customer.email}</Text>

      {/* Add Lead Button */}
      <Button
        title="Add Lead"
        onPress={() => {
          setSelectedLead(null);
          setModalVisible(true);
        }}
      />

      {/* Status Filter */}
      <SegmentedButtons
        value={statusFilter}
        onValueChange={setStatusFilter}
        buttons={[
          { value: "all", label: "All" },
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
        ]}
        style={{ marginVertical: 10 }}
      />

      {/* Leads List */}
      <FlatList
        data={filteredLeads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title="Edit"
              onPress={() => {
                setSelectedLead(item);
                setModalVisible(true);
              }}
            />
          </View>
        )}
      />

      {/* Add/Edit Lead Modal */}
      <AddEditLeadModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          refetch(); // refresh leads after adding/editing
        }}
        customerId={customerId}
        lead={selectedLead}
      />
    </View>
  );
}
