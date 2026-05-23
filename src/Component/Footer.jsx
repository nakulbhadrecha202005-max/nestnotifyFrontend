import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#20201a] border-t-2 border-[#93E1D8] pt-12 pb-8 text-[#DDFFF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Simple Explanation of your app */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#93E1D8]/10 border border-[#93E1D8] shadow-[0_0_12px_rgba(147,225,216,0.2)]">
                <svg
                  className="w-5 h-5 text-[#93E1D8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="font-black text-lg tracking-wide text-white uppercase">
                NeverForget
              </span>
            </div>
            <p className="text-sm text-[#898952] max-w-sm leading-relaxed">
              Forgot something important? Just type your message in our form.
              Our app will safely hold onto it and ping your phone with alerts
              again and again until you check it off!
            </p>
          </div>

          {/* Quick Setup Links */}
          <div>
            <h4 className="text-[#93E1D8] font-bold text-xs uppercase tracking-widest mb-4">
              Quick Actions
            </h4>
            <ul className="space-y-2.5">
              <FooterLink href="#form">Create Reminder</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#alerts">Active Alerts</FooterLink>
            </ul>
          </div>

          {/* High-Contrast Info Box */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
              System Status
            </h4>
            <div className="bg-[#292921] border border-[#898952]/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#898952]">Reminder System</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#93E1D8] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#93E1D8] animate-ping"></span>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip with your Monogram */}
        <div className="pt-8 border-t border-[#898952]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#898952]/80 font-mono">
            © 2026 NeverForget. No more forgotten tasks.
          </p>

          {/* Developer & Designer Signature Monogram */}
          <div className="flex items-center gap-2 bg-[#161613] px-4 py-2 rounded-xl border border-[#898952]/30 shadow-inner">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#898952]/60">
              Dev & Design By
            </span>
            <span className="text-xs font-black text-[#93E1D8] tracking-wide cursor-default">
              ER . Bhadrecha Nakul
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple link component mapped to your palette
const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-xs text-[#898952] hover:text-[#93E1D8] transition-colors duration-150 font-medium"
    >
      {children}
    </a>
  </li>
);

export default Footer;
