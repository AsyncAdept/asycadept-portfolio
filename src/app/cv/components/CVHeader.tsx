import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { styles } from "../styles";
import { cvData } from "../data";

export function CVHeader() {
  const { name, title, contact } = cvData;

  return (
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contact}>
        <Link src={`mailto:${contact.email}`} style={styles.contactItem}>
          {contact.email}
        </Link>
        <Text style={styles.contactDivider}>|</Text>
        <Text>{contact.location}</Text>
        <Text style={styles.contactDivider}>|</Text>
        <Link src={`https://${contact.website}`} style={styles.contactItem}>
          {contact.website}
        </Link>
        <Text style={styles.contactDivider}>|</Text>
        <Link
          src={`https://${contact.github}`}
          style={styles.contactItem}
        >
          {contact.github}
        </Link>
      </View>
    </View>
  );
}
