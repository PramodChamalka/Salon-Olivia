import {
  Clock3,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Scissors,
  Smile,
} from "lucide-react";

const features = [
  {
    icon: <Clock3 size={24} />,
    title: "Efficient Appointments",
    description:
      "Flexible scheduling and smooth service flow for your busy calendar.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Premium Care",
    description: "Luxury products and meticulous standards in every treatment.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Personal Attention",
    description:
      "Every guest receives thoughtful recommendations and attentive care.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Signature Styling",
    description:
      "Trend-led looks crafted to complement your unique personality.",
  },
  {
    icon: <Scissors size={24} />,
    title: "Expert Hands",
    description: "Skilled professionals with a passion for beauty and detail.",
  },
  {
    icon: <Smile size={24} />,
    title: "Relaxing Atmosphere",
    description: "A calming, polished environment designed for total comfort.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-salon-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-salon-dark bg-salon-cream/40 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex rounded-full bg-white p-3 text-salon-gold shadow-sm">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-salon-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
