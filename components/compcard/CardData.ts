export const MODEL = {
  fullName: "Alessandra Voss",
  firstName: "Alessandra",
  lastName: "V.",
  city: "New York, NY",
  website: "pholio.co/alessandrav",
  year: "2026",
  agency: "Metro Models",
  email: "alessandra@pholio.co",
  phone: "+1 (212) 000-0000",
};

export const MEASUREMENTS: [string, string][] = [
  ["Height", "5'10\""],
  ["Bust",   "34\""],
  ["Waist",  "25\""],
  ["Hips",   "36\""],
  ["Shoe",   "9 US"],
  ["Eyes",   "Brown"],
];

export const PHOTOS = {
  primary:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop&crop=face",
  secondary: [
    "https://i.pravatar.cc/300?img=47",
    "https://i.pravatar.cc/300?img=44",
    "https://i.pravatar.cc/300?img=25",
  ],
} as const;
