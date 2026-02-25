import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { cvData } from "../data";

const skillCategories: Array<{ label: string; skills: string[] }> = [
  { label: "Frontend", skills: cvData.skills.frontend },
  { label: "Mobile", skills: cvData.skills.mobile },
  { label: "Cross-Platform", skills: cvData.skills.crossPlatform },
  { label: "Backend", skills: cvData.skills.backend },
  { label: "Data", skills: cvData.skills.data },
  { label: "Tools", skills: cvData.skills.tools },
];

export function CVSkills() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Technical Skills</Text>
      <View style={styles.skillsGrid}>
        {skillCategories.map((category) => (
          <View key={category.label} style={styles.skillCategory}>
            <Text style={styles.skillLabel}>{category.label}:</Text>
            <Text style={styles.skillList}> {category.skills.join(", ")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
