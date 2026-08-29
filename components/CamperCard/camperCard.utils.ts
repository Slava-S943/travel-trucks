import type { Camper } from "@/types/camper";

export const formatForm = (form: Camper["form"]) => {
  const labels: Record<Camper["form"], string> = {
    alcove: "Alcove",
    panel_van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
  };

  return labels[form];
};

export const formatEngine = (engine: Camper["engine"]) => {
  return engine.charAt(0).toUpperCase() + engine.slice(1);
};

export const formatTransmission = (transmission: Camper["transmission"]) => {
  return transmission.charAt(0).toUpperCase() + transmission.slice(1);
};
