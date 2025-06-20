export type ServiceItem = {
  name: string;
  duration?: string;
  price: string;
  note?: string;
};

export type ServiceCategory = {
  category: string;
  items: ServiceItem[];
  note?: string;
};

export const services: ServiceCategory[] = [
  {
    category: "Facials",
    items: [
      {
        name: "Revive Your Skin: Full Hydrafacial & Deep Hydration",
        price: "$50"
      },
      {
        name: "Get the Glow: Fruit Acid Peel",
        price: "$60"
      },
      {
        name: "Skin Renewal & Hyperpigmentation Treatment: Microneedling / Mesotherapy",
        price: "$70"
      },
      {
        name: "Lipolysis Double Chin (2 ml)",
        price: "$35"
      },
      {
        name: "Regenerate & Replenish: PRP",
        price: "$70"
      },
      {
        name: "Stay Young: MesoFiller / Mesobotox",
        price: "$100"
      },
      {
        name: "Restorative Skin Kick (Skin Booster)",
        price: "$120"
      },
      {
        name: "EXOSOMES",
        price: "$150"
      },
      {
        name: "NAD⁺",
        price: "$200"
      },
      {
        name: "Baby Rose Lips",
        price: "$30"
      },
      {
        name: "Eye Rejuvenation",
        price: "$30"
      }
    ]
  },
  {
    category: "Non-Surgical Facials",
    items: [
      {
        name: "HIFU Ultraformer 7D (Face Lifting & Body Firming)",
        price: "$250"
      },
      {
        name: "RF Microneedling (Pore Tightening, Skin Firming, Skin Whitening, Scar Reduction)",
        price: "$200"
      }
    ]
  },
  {
    category: "Laser Hair Removal",
    items: [
      { name: "Full Body", price: "$100" },
      { name: "Full Body (Including Back & Tummy)", price: "$150" },
      { name: "Full Arms", price: "$40" },
      { name: "Half Arms", price: "$30" },
      { name: "Underarms", price: "$20" },
      { name: "Full Face + Neck", price: "$20" },
      { name: "Upper Lip", price: "$10" },
      { name: "Bikini Line", price: "$15" },
      { name: "Full Bikini", price: "$30" },
      { name: "Full Bikini + Brazilian", price: "$35" },
      { name: "Full Legs", price: "$50" },
      { name: "Half Legs", price: "$40" },
      { name: "Back + Tummy", price: "$50" },
      { name: "Sideburns", price: "$15" },
      { name: "Chest or Back", price: "$50", note: "Men’s Laser" },
      { name: "Back & Chest", price: "$100", note: "Men’s Laser" },
      { name: "Beard Lining", price: "$20", note: "Men’s Laser" },
      { name: "Neck Lining", price: "$10", note: "Men’s Laser" }
    ]
  },
  {
    category: "Hair Therapy",
    items: [
      { name: "Hair PRP", price: "$70" },
      { name: "Hair Mesotherapy", price: "$70" },
      {
        name: "Euphoria Head Treat (Chinese Hair + Korean Scalp Massage, 60 mins; includes Face Mask, Neck & Décolleté Massage)",
        price: "$70"
      }
    ],
    note: "Package Offer: Buy any package of 4 Hair Therapy sessions and get 1 free session"
  },
  {
    category: "Body Therapy",
    items: [
      {
        name: "Divine Massage (90 mins; Moroccan Scrub + Swedish Massage + Reflexology)",
        price: "$100"
      },
      {
        name: "The Healing Touch Massage (Ayurveda & Hot Stones, 60 mins)",
        price: "$80"
      },
      {
        name: "Relax & Refresh Massage (50 mins; Swedish + Reflexology)",
        price: "$60"
      },
      {
        name: "Face Lift & Scalp Massage (40 mins)",
        price: "$50"
      },
      {
        name: "Manual Lymphatic Drainage Massage (60 mins)",
        price: "$60"
      },
      {
        name: "Cellulite Fit & Firm Maderotherapy (50 mins)",
        price: "$60"
      },
      {
        name: "Back, Neck & Shoulder Massage (40 mins)",
        price: "$50"
      },
      {
        name: "Mom to Be Massage (40 mins)",
        price: "$60"
      },
      {
        name: "Deep Tissue Massage (60 mins)",
        price: "$80"
      },
      {
        name: "Debloating Massage (20 mins)",
        price: "$30"
      },
      {
        name: "Foot or Hand Reflexology (20 mins)",
        price: "$30"
      }
    ]
  },
  {
    category: "Slimming Lipolysis",
    items: [
      { name: "Tummy – 5 ml", price: "$50" },
      { name: "Tummy – 10 ml", price: "$90" },
      { name: "Love Handles – 5 ml", price: "$50" },
      { name: "Love Handles – 10 ml", price: "$90" },
      { name: "Thighs – 5 ml", price: "$50" },
      { name: "Thighs – 10 ml", price: "$90" },
      { name: "Arms – 5 ml", price: "$50" },
      { name: "Arms – 10 ml", price: "$90" },
      { name: "Double Chin (2 ml)", price: "$30" },
      { name: "Sauna Bed (30 mins)", price: "$30" },
      { name: "Cavitation (50 mins)", price: "$50" },
      { name: "EMS (30 mins)", price: "$40" }
    ],
    note: "Package Deals: Buy 6 sessions → Get 2 free; Buy 10 sessions → Get 4 free"
  },
  {
    category: "Nails",
    items: [
      { name: "Manicure", price: "$7" },
      { name: "Pedicure", price: "$10" },
      { name: "Color", price: "$5" },
      { name: "French", price: "$7" },
      { name: "Russian Manicure", price: "$10" },
      { name: "Russian Pedicure", price: "$15" },
      { name: "Medical Pedicure", price: "$25" },
      { name: "Men’s Pedicure", price: "$20" },
      { name: "Fake Nail", price: "$2" },
      { name: "Fake Nail Set", price: "$15" },
      { name: "Gel Color / Ombre", price: "$12 / $14" },
      { name: "French Gel Color", price: "$14" },
      { name: "Gel Color Removal", price: "$5" },
      { name: "Gel/Acrylic Set", price: "$50" },
      { name: "Refill", price: "$30" },
      { name: "Extension Removal", price: "$8" },
      { name: "GEL Ex Full Set", price: "$30" },
      { name: "Nail Repair/Design", price: "$3" },
      { name: "Rubberbase/Structure", price: "$12 / $10" },
      { name: "Paraffin", price: "$5" },
      { name: "CatEye/Mirror/Chrome", price: "$3" },
      { name: "CatEye/Mirror/Chrome Set", price: "$15" },
      { name: "Structure", price: "$10" }
    ]
  },
  {
    category: "Tattoo",
    items: [
      { name: "Eyebrows", price: "$200" },
      { name: "Touch Up (After 1 Month)", price: "$50" },
      { name: "Lip Blush", price: "$200" },
      { name: "Touch Up (After 1 Month)", price: "$50" },
      { name: "Eyeliner", price: "$200" },
      { name: "Touch Up (After 1 Month)", price: "$50" },
      { name: "Body Tattoo (Starting)", price: "$50" }
    ]
  },
  {
    category: "Waxing",
    items: [
      { name: "Full Body", price: "$30" },
      { name: "Full Arms", price: "$10" },
      { name: "Underarms", price: "$5" },
      { name: "Half Arms", price: "$5" },
      { name: "Full Legs", price: "$15" },
      { name: "Half Legs", price: "$10" },
      { name: "Bikini Line", price: "$3" },
      { name: "Full Back / Full Tummy", price: "$10" },
      { name: "Half Back", price: "$6" },
      { name: "Upper Lip or Chin", price: "$3" },
      { name: "Men’s Full Chest or Back", price: "$20" },
      { name: "Eyebrow Shaping", price: "$5" },
      { name: "Eyebrows & Forehead", price: "$7" },
      { name: "Full Face", price: "$15" },
      { name: "Henna Eyebrows", price: "$10" }
    ]
  },
  {
    category: "Makeup",
    items: [
      { name: "Regular", price: "$50" },
      { name: "Regular with Lashes", price: "$60" },
      { name: "Bridal", price: "$150" }
    ]
  }
];