"use client";
import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  Sparkles,
} from "lucide-react";
export function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    stylist: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const stylists = [
    {
      id: "s1",
      name: "Nadeeka",
      role: "Master Stylist",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&w=150&q=80",
    },
    {
      id: "s2",
      name: "Sarah",
      role: "Colorist",
      img: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?ixlib=rb-4.0.3&w=150&q=80",
    },
    {
      id: "s3",
      name: "Elena",
      role: "Esthetician",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=150&q=80",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  return (
    <section id="appointments" className="py-20 bg-salon-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
            Book an Appointment
          </h2>
          <div className="w-24 h-1 bg-salon-gold mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Booking Form */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-salon-gold -z-10 -translate-y-1/2 transition-all duration-300"
                style={{
                  width: `${((step - 1) / 2) * 100}%`,
                }}
              ></div>

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? "bg-salon-gold text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Step 1: Service & Stylist */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  Select Service & Stylist
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a service...</option>
                    <option value="haircut">Signature Haircut & Styling</option>
                    <option value="color">Balayage Color Treatment</option>
                    <option value="facial">Radiance Facial</option>
                    <option value="nails">Luxury Gel Manicure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Choose Stylist
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stylists.map((stylist) => (
                      <div
                        key={stylist.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            stylist: stylist.name,
                          })
                        }
                        className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${formData.stylist === stylist.name ? "border-salon-gold bg-salon-cream" : "border-gray-200 hover:border-salon-gold/50"}`}
                      >
                        <img
                          src={stylist.img}
                          alt={stylist.name}
                          className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                        />

                        <p className="font-medium text-salon-dark">
                          {stylist.name}
                        </p>
                        <p className="text-xs text-gray-500">{stylist.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  Select Date & Time
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value,
                        })
                      }
                    />

                    {/* Placeholder for actual calendar UI */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500 border border-dashed border-gray-300">
                      Interactive Calendar UI Placeholder
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Times
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              time,
                            })
                          }
                          className={`p-2 text-sm rounded-lg border transition-colors ${formData.time === time ? "bg-salon-dark text-white border-salon-dark" : "border-gray-200 text-gray-700 hover:border-salon-gold"}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  Your Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests / Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold"
                    placeholder="Any specific requirements..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-salon-dark text-white rounded-lg font-medium hover:bg-black transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button className="px-8 py-3 bg-salon-gold text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center shadow-md">
                  <CheckCircle size={20} className="mr-2" /> Confirm Booking
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:w-1/3">
            <div className="bg-salon-dark text-white rounded-2xl p-6 sticky top-24 shadow-lg">
              <h4 className="font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-4">
                Booking Summary
              </h4>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-800 p-2 rounded-lg mr-3 text-salon-gold">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Service
                    </p>
                    <p className="font-medium">
                      {formData.service || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-800 p-2 rounded-lg mr-3 text-salon-gold">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Stylist
                    </p>
                    <p className="font-medium">
                      {formData.stylist || "Any available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-800 p-2 rounded-lg mr-3 text-salon-gold">
                    <CalendarIcon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Date
                    </p>
                    <p className="font-medium">
                      {formData.date || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-800 p-2 rounded-lg mr-3 text-salon-gold">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Time
                    </p>
                    <p className="font-medium">
                      {formData.time || "Not selected"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Estimated Total</span>
                  <span className="font-serif text-xl font-bold text-salon-gold">
                    LKR 0.00
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Payment will be collected at the salon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
