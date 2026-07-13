import { CheckCircle2 } from "lucide-react";
export function About() {
  const values = [
    "Uncompromising Quality",
    "Personalised Care",
    "Continuous Innovation",
    "Sustainable Practices",
  ];

  const team = [
    {
      name: "Nadeeka Priyangani",
      role: "Founder & Master Stylist",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sarah Jenkins",
      role: "Senior Colorist",
      image:
        "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Elena Rodriguez",
      role: "Skincare Specialist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="about" className="py-20 bg-salon-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-salon-gold/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Salon Interior"
              className="relative z-10 rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />
          </div>

          <div>
            <h2 className="font-serif text-4xl font-bold text-salon-dark mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Founded by Ms. Nadeeka Priyangani, Salon Olivia was born from a
              vision to create a sanctuary where beauty meets relaxation. Based
              in the heart of Sri Lanka, we blend international trends with
              local warmth.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Our mission is to empower every individual who walks through our
              doors, enhancing their natural beauty while providing an
              unparalleled luxury experience.
            </p>

            <div className="space-y-4">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-center text-salon-dark">
                  <CheckCircle2 className="text-salon-gold mr-3" size={20} />
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-salon-dark mb-4">
              Meet Our Experts
            </h3>
            <div className="w-16 h-1 bg-salon-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative overflow-hidden rounded-full w-64 h-64 mx-auto mb-6 border-4 border-white shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-salon-rose/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="font-serif text-xl font-bold text-salon-dark mb-1">
                  {member.name}
                </h4>
                <p className="text-salon-gold font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
