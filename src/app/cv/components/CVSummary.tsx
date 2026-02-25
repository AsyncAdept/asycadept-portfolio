import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { cvData } from "../data";

export function CVSummary() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <Text style={styles.summary}>{cvData.summary}</Text>
    </View>
  );
}
