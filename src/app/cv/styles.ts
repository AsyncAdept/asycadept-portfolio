import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
  },
  contact: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 18,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactItem: {
    color: "#0ea5e9",
  },
  contactDivider: {
    marginHorizontal: 6,
    color: "#cbd5e1",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f172a",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.6,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillCategory: {
    width: "50%",
    marginBottom: 6,
  },
  skillLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 2,
  },
  skillList: {
    fontSize: 9,
    color: "#475569",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    fontWeight: 700,
    color: "#0f172a",
  },
  role: {
    fontSize: 10,
    color: "#0ea5e9",
    marginLeft: 4,
  },
  period: {
    fontSize: 9,
    color: "#64748b",
  },
  highlight: {
    fontSize: 9,
    color: "#475569",
    marginLeft: 8,
    marginBottom: 2,
  },
  techTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
    marginLeft: 8,
  },
  techTag: {
    fontSize: 8,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 2,
  },
  projectLine: {
    fontSize: 9,
    color: "#475569",
    marginLeft: 8,
    marginBottom: 1,
  },
  projectLabel: {
    fontWeight: 700,
    color: "#0f172a",
  },
});
