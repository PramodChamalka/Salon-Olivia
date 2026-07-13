const stats = [
  { value: "1.2k+", label: "Happy Clients" },
  { value: "12+", label: "Years Experience" },
  { value: "500+", label: "Appointments" },
  { value: "150+", label: "Weddings Styled" },
];

export function Stats() {
  return (
    <section className="bg-salon-dark py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl font-bold text-salon-gold">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
