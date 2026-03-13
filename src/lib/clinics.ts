export interface Clinic {
  id: string;
  name: string;
  district: string;
  specialties: string[];
  waitMinutes: number;
  openNow: boolean;
}

const clinics: Clinic[] = [
  {
    id: "c1",
    name: "Downtown Urgent Care",
    district: "Central",
    specialties: ["General", "Respiratory"],
    waitMinutes: 35,
    openNow: true,
  },
  {
    id: "c2",
    name: "North Family Clinic",
    district: "North",
    specialties: ["General", "Pediatrics"],
    waitMinutes: 18,
    openNow: true,
  },
  {
    id: "c3",
    name: "Riverside Health Point",
    district: "West",
    specialties: ["General", "Cardio"],
    waitMinutes: 52,
    openNow: false,
  },
  {
    id: "c4",
    name: "East Community Medical",
    district: "East",
    specialties: ["General", "Trauma"],
    waitMinutes: 27,
    openNow: true,
  },
];

export function getClinics() {
  return clinics;
}

export function getRecommendedClinics(urgency: "low" | "medium" | "high") {
  const maxWait = urgency === "high" ? 30 : urgency === "medium" ? 45 : 60;

  return clinics
    .filter((clinic) => clinic.openNow && clinic.waitMinutes <= maxWait)
    .sort((a, b) => a.waitMinutes - b.waitMinutes);
}
