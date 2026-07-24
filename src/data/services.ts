export type ServiceItem = {
  id: number;
  category: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  icon: "scissors" | "palette" | "sparkles" | "droplets";
};

export const services: ServiceItem[] = [
  {
    id: 1,
    category: "Hair",
    name: "Signature Haircut & Styling",
    description: "Personalised consultation, wash, cut, and professional styling.",
    duration: "60 min",
    price: "LKR 4,500",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    icon: "scissors",
  },
  {
    id: 2,
    category: "Hair",
    name: "Reborn Color Treatment",
    description: "Hand-painted highlights for a natural, sun-kissed look.",
    duration: "180 min",
    price: "LKR 15,000",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    icon: "palette",
  },
  {
    id: 3,
    category: "Skin",
    name: "Radiance Facial",
    description: "Deep cleansing, exfoliation, and custom mask for glowing skin.",
    duration: "75 min",
    price: "LKR 6,500",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    icon: "sparkles",
  },
  {
    id: 4,
    category: "Nails",
    name: "Luxury Gel Manicure",
    description: "Cuticle care, shaping, massage, and long-lasting gel polish.",
    duration: "45 min",
    price: "LKR 3,500",
    image:
      "/images/green.jpg",
    icon: "droplets",
  },
  {
    id: 5,
    category: "Makeup",
    name: "Bridal Makeup Package",
    description: "Complete bridal look including trial, hair, and makeup.",
    duration: "240 min",
    price: "LKR 35,000",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    icon: "sparkles",
  },
  {
    id: 6,
    category: "Skin",
    name: "Anti-Aging Treatment",
    description: "Advanced serum infusion and massage to reduce fine lines.",
    duration: "90 min",
    price: "LKR 8,500",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    icon: "sparkles",
  },
];
