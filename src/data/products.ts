export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  imagePath: string;
  features: string[];
  specifications: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "ace-5",
    name: "SequrePlus Ace",
    description: "A connected security controller that works with compatible configured sensors, activates a loud siren, and calls registered contacts when an event is detected.",
    price: "₹XX,XXX",
    imagePath: "/images/products/ace-5/ace-5.png",
    features: [
      "Works with compatible configured sensors",
      "Activates a loud siren for configured events",
      "Calls up to five registered contact numbers",
      "Connectivity and sensor options vary by system configuration",
    ],
    specifications: [
      { label: "Connectivity", value: "GSM, Wi-Fi, or GSM + Wi-Fi options" },
      { label: "Sensor connection", value: "Wired, wireless, or hybrid options" },
      { label: "Alert response", value: "Configured siren and contact calls" },
      { label: "Registered contacts", value: "Up to five phone numbers" },
    ],
  },
    {
    id: "Ace X",
    name: "SequrePlus X",
    description: "A connected security controller that works with compatible configured sensors, activates a loud siren, and calls registered contacts when an event is detected.",
    price: "₹XX,XXX",
    imagePath: "/images/products/ace-5/ace-5.png",
    features: [
      "Works with compatible configured sensors",
      "Activates a loud siren for configured events",
      "Calls up to five registered contact numbers",
      "Connectivity and sensor options vary by system configuration",
    ],
    specifications: [
      { label: "Connectivity", value: "GSM, Wi-Fi, or GSM + Wi-Fi options" },
      { label: "Sensor connection", value: "Wired, wireless, or hybrid options" },
      { label: "Alert response", value: "Configured siren and contact calls" },
      { label: "Registered contacts", value: "Up to five phone numbers" },
    ],
  },
    {
    id: "Rootz",
    name: "SequrePlus Rootz",
    description: "A connected security controller that works with compatible configured sensors, activates a loud siren, and calls registered contacts when an event is detected.",
    price: "₹XX,XXX",
    imagePath: "/images/products/ace-5/ace-5.png",
    features: [
      "Works with compatible configured sensors",
      "Activates a loud siren for configured events",
      "Calls up to five registered contact numbers",
      "Connectivity and sensor options vary by system configuration",
    ],
    specifications: [
      { label: "Connectivity", value: "GSM, Wi-Fi, or GSM + Wi-Fi options" },
      { label: "Sensor connection", value: "Wired, wireless, or hybrid options" },
      { label: "Alert response", value: "Configured siren and contact calls" },
      { label: "Registered contacts", value: "Up to five phone numbers" },
    ],
  },
];
