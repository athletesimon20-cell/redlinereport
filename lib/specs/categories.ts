import type { GearCategory } from "@/lib/taxonomy";

export interface SpecFieldDef {
  /** matches a key inside frontmatter `specs` */
  key: string;
  label: string;
  unit?: string;
  type: "string" | "number" | "boolean";
  /** drives "best in class" highlighting in the compare table */
  higherIsBetter?: boolean;
  group?: string;
}

export const gearCategorySpecs: Record<GearCategory, SpecFieldDef[]> = {
  helmets: [
    { key: "weightGrams", label: "Weight", unit: "g", type: "number", higherIsBetter: false, group: "Physical" },
    { key: "shellMaterial", label: "Shell material", type: "string", group: "Physical" },
    { key: "certification", label: "Certification", type: "string", group: "Safety" },
    { key: "fieldOfViewHorizontal", label: "Horizontal field of view", unit: "°", type: "number", higherIsBetter: true, group: "Visibility" },
    { key: "ventPorts", label: "Vent ports", type: "number", higherIsBetter: true, group: "Ventilation" },
    { key: "pinlockIncluded", label: "Pinlock included", type: "boolean", group: "Visibility" },
    { key: "sizes", label: "Sizes", type: "string", group: "Fit" },
  ],
  jackets: [
    { key: "material", label: "Material", type: "string", group: "Physical" },
    { key: "armorRating", label: "Armor rating", type: "string", group: "Safety" },
    { key: "waterproof", label: "Waterproof", type: "boolean", group: "Weather" },
    { key: "ventilationPanels", label: "Ventilation panels", type: "number", higherIsBetter: true, group: "Ventilation" },
    { key: "weightGrams", label: "Weight", unit: "g", type: "number", higherIsBetter: false, group: "Physical" },
    { key: "sizes", label: "Sizes", type: "string", group: "Fit" },
  ],
  gloves: [
    { key: "material", label: "Material", type: "string", group: "Physical" },
    { key: "knuckleProtection", label: "Knuckle protection", type: "string", group: "Safety" },
    { key: "waterproof", label: "Waterproof", type: "boolean", group: "Weather" },
    { key: "touchscreenCompatible", label: "Touchscreen compatible", type: "boolean", group: "Convenience" },
    { key: "sizes", label: "Sizes", type: "string", group: "Fit" },
  ],
  boots: [
    { key: "material", label: "Material", type: "string", group: "Physical" },
    { key: "ankleProtection", label: "Ankle protection", type: "string", group: "Safety" },
    { key: "waterproof", label: "Waterproof", type: "boolean", group: "Weather" },
    { key: "soleType", label: "Sole type", type: "string", group: "Physical" },
    { key: "sizes", label: "Sizes", type: "string", group: "Fit" },
  ],
  communicators: [
    { key: "intercomRiders", label: "Intercom riders", type: "number", higherIsBetter: true, group: "Connectivity" },
    { key: "rangeMeters", label: "Range", unit: "m", type: "number", higherIsBetter: true, group: "Connectivity" },
    { key: "batteryLifeHours", label: "Battery life", unit: "hrs", type: "number", higherIsBetter: true, group: "Battery" },
    { key: "waterproofRating", label: "Waterproof rating", type: "string", group: "Weather" },
    { key: "meshTech", label: "Mesh intercom", type: "boolean", group: "Connectivity" },
  ],
  luggage: [
    { key: "capacityLiters", label: "Capacity", unit: "L", type: "number", higherIsBetter: true, group: "Physical" },
    { key: "material", label: "Material", type: "string", group: "Physical" },
    { key: "mountingType", label: "Mounting type", type: "string", group: "Fit" },
    { key: "waterproof", label: "Waterproof", type: "boolean", group: "Weather" },
    { key: "lockable", label: "Lockable", type: "boolean", group: "Safety" },
    { key: "weightGrams", label: "Weight", unit: "g", type: "number", higherIsBetter: false, group: "Physical" },
  ],
  suits: [
    { key: "suitType", label: "Type", type: "string", group: "Physical" },
    { key: "material", label: "Material", type: "string", group: "Physical" },
    { key: "armorRating", label: "Armor rating", type: "string", group: "Safety" },
    { key: "humpIncluded", label: "Race hump included", type: "boolean", group: "Safety" },
    { key: "waterproof", label: "Waterproof", type: "boolean", group: "Weather" },
    { key: "weightGrams", label: "Weight", unit: "g", type: "number", higherIsBetter: false, group: "Physical" },
    { key: "sizes", label: "Sizes", type: "string", group: "Fit" },
  ],
};

export const bikeSpecs: SpecFieldDef[] = [
  { key: "engineCc", label: "Engine displacement", unit: "cc", type: "number", higherIsBetter: true, group: "Engine" },
  { key: "horsepower", label: "Horsepower", unit: "hp", type: "number", higherIsBetter: true, group: "Engine" },
  { key: "torqueNm", label: "Torque", unit: "Nm", type: "number", higherIsBetter: true, group: "Engine" },
  { key: "weightKg", label: "Wet weight", unit: "kg", type: "number", higherIsBetter: false, group: "Physical" },
  { key: "seatHeightMm", label: "Seat height", unit: "mm", type: "number", group: "Physical" },
  { key: "fuelCapacityLiters", label: "Fuel capacity", unit: "L", type: "number", higherIsBetter: true, group: "Physical" },
  { key: "priceUSD", label: "MSRP", unit: "$", type: "number", higherIsBetter: false, group: "Value" },
];

export function formatSpecValue(value: string | number | boolean | undefined, field: SpecFieldDef): string {
  if (value === undefined || value === null) return "—";
  if (field.type === "boolean") return value ? "Yes" : "No";
  if (field.type === "number") {
    const num = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(num)) return String(value);
    const formatted = num.toLocaleString("en-US");
    return field.unit ? `${formatted}${field.unit === "$" ? "" : " " + field.unit}` : formatted;
  }
  return String(value);
}
