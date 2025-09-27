import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { PieChart, BarChart } from "react-native-chart-kit";
import { selectLeadsByStatus, selectTotalConvertedValue } from "../leads/leadsSelectors";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const leadsByStatus = useSelector(selectLeadsByStatus);
  const totalConverted = useSelector(selectTotalConvertedValue);

  if (!leadsByStatus) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  const pieData = Object.entries(leadsByStatus).map(([status, count], i) => ({
    name: status,
    population: count,
    color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][i % 4],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Dashboard</Text>

      <Text style={{ marginBottom: 10 }}>Leads by Status</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={{ marginVertical: 20 }}>
        Total Converted Value: ${totalConverted}
      </Text>
    </ScrollView>
  );
}
