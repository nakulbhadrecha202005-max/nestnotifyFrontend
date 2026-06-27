import React from "react";

const About = () => {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-[#B2945B] font-bold uppercase tracking-widest text-xs">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#462255] mt-4 mb-6">
            Never Forget a{" "}
            <span className="text-[#93E1D8]">Moment or Payment</span>
          </h2>
          <p className="text-[#898952] max-w-2xl mx-auto text-lg">
            NeverForgot is designed to be your personal digital memory—ensuring
            you stay on top of bills and important reminders effortlessly.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#DDFFF7] p-8 rounded-[32px] border border-[#93E1D8]">
            <h3 className="text-2xl font-bold text-[#462255] mb-4">
              The NeverForgot Vision
            </h3>
            <p className="text-[#898952] leading-relaxed mb-6">
              Life moves fast. Our platform bridges the gap between your busy
              schedule and your commitments, acting as a reliable notification
              layer for bills and personal tasks.
            </p>
            <div className="space-y-4">
              {[
                "Smart Bill Alerts",
                "Task & Item Reminders",
                "Reliable Notifications",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[#462255] font-bold"
                >
                  <span className="material-symbols-outlined text-[#B2945B]">
                    notifications_active
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-black text-[#462255]">
              Why Choose Us?
            </h3>
            <p className="text-[#898952] leading-relaxed">
              We focus on one thing: getting the right message to you at the
              right time. By stripping away complex financial management tools,
              we provide a clean, dedicated space for tracking what really needs
              your attention.
            </p>
            <div className="pt-4">
              <button className="bg-[#462255] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#B2945B] transition-all shadow-lg shadow-[#462255]/20">
                How It Works
              </button>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-20 bg-[#462255] p-12 rounded-[32px] text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Take control of your to-dos
          </h3>
          <p className="mb-8 opacity-80 max-w-xl mx-auto">
            Join thousands of users who have streamlined their reminders and
            automated their notifications with BillWise.
          </p>
          <button className="bg-[#93E1D8] text-[#462255] font-bold px-8 py-4 rounded-2xl hover:bg-white transition-colors shadow-lg">
            Start Notifying Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
