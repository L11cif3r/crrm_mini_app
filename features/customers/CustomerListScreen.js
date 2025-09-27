import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useGetCustomersQuery } from "./customersApi";
import AddEditCustomerModal from "./AddEditCustomerModal";

export default function CustomerListScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // for editing

  const { data = [], isLoading, isError, refetch } = useGetCustomersQuery({ page, limit: 10, search });

  // Update local list when query changes
  useEffect(() => {
    if (page === 1) setCustomers(data);
    else setCustomers((prev) => [...prev, ...data]);
  }, [data]);

  const handleSearch = () => {
    setPage(1); // reset to first page on new search
    refetch();
  };

  const loadMore = () => {
    if (data.length > 0) setPage((prev) => prev + 1);
  };

  const handleAdd = () => {
    setSelectedCustomer(null); // adding new customer
    setModalVisible(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer); // editing existing customer
    setModalVisible(true);
  };

  if (isLoading && page === 1) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (isError) return <Text>Error loading customers</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Search Customers"
        value={search}
        onChangeText={setSearch}
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleSearch} style={{ marginBottom: 10 }}>
        Search
      </Button>

      <Button mode="contained" onPress={handleAdd} style={{ marginBottom: 10 }}>
        Add Customer
      </Button>

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button onPress={() => handleEdit(item)}>Edit</Button>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && page > 1 ? <ActivityIndicator /> : null}
      />

      <AddEditCustomerModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          refetch(); // refresh list after add/edit
        }}
        customer={selectedCustomer} // null = add, object = edit
      />
    </View>
  );
}
