"use client";
import { Fragment, useState } from "react";
import { MessageSquare, X, Sparkles, ChevronRight } from "lucide-react";
export function AIAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions = [
    {
      id: "hairType",
      text: "Hi there! I'm your AI Style Advisor. What's your hair type?",
      options: ["Straight", "Wavy", "Curly", "Coily"],
    },
    {
      id: "occasion",
      text: "Great! What's the occasion you're preparing for?",
      options: ["Everyday Look", "Wedding", "Party/Event", "Professional"],
    },
    {
      id: "budget",
      text: "Got it. Finally, what's your budget range?",
      options: ["Under LKR 5k", "LKR 5k - 15k", "LKR 15k+"],
    },
  ];

  const recommendations = [
    {
      name: "Signature Blowout",
      desc: "Perfect for your wavy hair to get that everyday polished look.",
      price: "LKR 4,500",
    },
    {
      name: "Keratin Express",
      desc: "Smooth frizz and add shine that lasts for weeks.",
      price: "LKR 12,000",
    },
  ];

  const handleOptionClick = (questionId: string, option: string) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
    setStep(step + 1);
  };
  const resetChat = () => {
    setStep(0);
    setAnswers({});
  };
  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-salon-dark text-white p-4 rounded-full shadow-2xl hover:bg-black transition-transform hover:scale-105 z-50 flex items-center group"
        >
          <Sparkles className="mr-2 text-salon-gold animate-pulse" size={20} />
          <span className="font-medium mr-2">AI Style Advisor</span>
          <MessageSquare size={20} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-salon-dark text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-salon-gold p-2 rounded-full mr-3">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif font-bold">Olivia AI</h3>
                <p className="text-xs text-gray-300">Style Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {/* Show previous questions and answers */}
            {questions.slice(0, step).map((q, idx) => (
              <Fragment key={idx}>
                <div className="flex items-start">
                  <div className="bg-salon-cream text-salon-dark p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                    {q.text}
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-salon-dark text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-sm">
                    {answers[q.id]}
                  </div>
                </div>
              </Fragment>
            ))}

            {/* Current Question */}
            {step < questions.length && (
              <div className="flex items-start animate-in fade-in">
                <div className="bg-salon-cream text-salon-dark p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                  {questions[step].text}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {step === questions.length && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start mb-4">
                  <div className="bg-salon-cream text-salon-dark p-3 rounded-2xl rounded-tl-none max-w-[90%] text-sm shadow-sm">
                    Based on your preferences ({answers.hairType},{" "}
                    {answers.occasion}, {answers.budget}), here are my top
                    recommendations for you:
                  </div>
                </div>

                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-salon-gold/30 p-3 rounded-xl shadow-sm"
                    >
                      <h4 className="font-serif font-bold text-salon-dark text-sm">
                        {rec.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 mb-2">
                        {rec.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-salon-gold">
                          {rec.price}
                        </span>
                        <button className="text-xs bg-salon-dark text-white px-3 py-1 rounded hover:bg-black transition-colors">
                          Book This
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetChat}
                  className="w-full mt-4 text-xs text-gray-500 hover:text-salon-dark text-center"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>

          {/* Options Footer */}
          {step < questions.length && (
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {questions[step].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleOptionClick(questions[step].id, option)
                    }
                    className="text-xs border border-salon-gold text-salon-dark px-3 py-2 rounded-full hover:bg-salon-gold hover:text-white transition-colors flex items-center"
                  >
                    {option} <ChevronRight size={12} className="ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
