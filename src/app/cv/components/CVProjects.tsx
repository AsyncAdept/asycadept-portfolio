import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { cvData } from "../data";

export function CVProjects() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Key Projects</Text>
      {cvData.projects.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectLine}>
            <Text style={styles.projectLabel}>Challenge:</Text>{" "}
            {project.challenge}
          </Text>
          <Text style={styles.projectLine}>
            <Text style={styles.projectLabel}>Solution:</Text>{" "}
            {project.solution}
          </Text>
          <Text style={styles.projectLine}>
            <Text style={styles.projectLabel}>Impact:</Text>{" "}
            {project.impact}
          </Text>
        </View>
      ))}
    </View>
  );
}
