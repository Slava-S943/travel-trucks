import type { CamperForm, Engine, Transmission } from "@/types/camper";

export const camperForms: {
  label: string;
  value: CamperForm;
}[] = [
  {
    label: "Alcove",
    value: "alcove",
  },
  {
    label: "Panel Van",
    value: "panel_van",
  },
  {
    label: "Integrated",
    value: "integrated",
  },
  {
    label: "Semi Integrated",
    value: "semi_integrated",
  },
];

export const engines: {
  label: string;
  value: Engine;
}[] = [
  {
    label: "Diesel",
    value: "diesel",
  },
  {
    label: "Petrol",
    value: "petrol",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "Electric",
    value: "electric",
  },
];

export const transmissions: {
  label: string;
  value: Transmission;
}[] = [
  {
    label: "Automatic",
    value: "automatic",
  },
  {
    label: "Manual",
    value: "manual",
  },
];
