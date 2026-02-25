import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { cvData } from "../data";

export function CVExperience() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      {cvData.experience.map((job, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.company}>{job.company}</Text>
              <Text style={styles.role}> | {job.role}</Text>
            </View>
            <Text style={styles.period}>{job.period}</Text>
          </View>
          {job.highlights.map((highlight, hIndex) => (
            <Text key={hIndex} style={styles.highlight}>
              • {highlight}
            </Text>
          ))}
          <View style={styles.techTags}>
            {job.tech.map((tech, tIndex) => (
              <Text key={tIndex} style={styles.techTag}>
                {tech}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
