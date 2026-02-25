import React from "react";
import { Page, Document } from "@react-pdf/renderer";
import { styles } from "../styles";
import { CVHeader } from "./CVHeader";
import { CVSummary } from "./CVSummary";
import { CVSkills } from "./CVSkills";
import { CVExperience } from "./CVExperience";
import { CVProjects } from "./CVProjects";

export function CVDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <CVHeader />
        <CVSummary />
        <CVSkills />
        <CVExperience />
        <CVProjects />
      </Page>
    </Document>
  );
}
