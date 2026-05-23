import React from "react";

const Services = () => {
  const features = [
    {
      title: "Smart Bill Reminders",
      desc: "Never miss a due date again. Insert your bills, and let our system ping you with custom, timely reminders before anything is due.",
      icon: "notifications_active",
      color: "text-[#6366F1]",
    },
    {
      title: "Predictive Cash Flow",
      desc: "Our engine analyzes your spending patterns to forecast your financial health months in advance, helping you plan your reminders effectively.",
      icon: "show_chart",
      color: "text-[#06B6D4]",
    },
    {
      title: "Vault-Level Security",
      desc: "Your data is shielded by bank-grade encryption, keeping your financial identity and private message logs secure and private.",
      icon: "lock",
      color: "text-[#6366F1]",
    },
  ];

  return (
    <section className="bg-[#DDFFF7] py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#06B6D4] font-bold uppercase tracking-widest text-xs">
            BillWise Intelligent Reminders
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#334155] mt-4 mb-6">
            Never Forget a <span className="text-[#6366F1]">Payment Again</span>
          </h2>
          <p className="text-[#334155]/70 max-w-2xl mx-auto text-lg">
            Insert your bills, set your preferences, and let us handle the rest.
            Smart reminders for a stress-free financial life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg shadow-[#6366F1]/5 border border-[#06B6D4]/10 hover:border-[#6366F1]/30 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-[#F0F9FF] flex items-center justify-center mb-6 ${item.color}`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#334155] mb-4">
                {item.title}
              </h3>
              <p className="text-[#334155]/70 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] p-10 rounded-[2rem] text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to simplify your finances?
          </h3>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            Join thousands of users who have automated their bill tracking and
            notification systems.
          </p>
          <button className="bg-white text-[#6366F1] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Insert Your First Bill
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
