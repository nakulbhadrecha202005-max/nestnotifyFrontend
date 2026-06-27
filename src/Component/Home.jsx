import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#16121e] font-sans text-[#DDFFF7] antialiased">
      {/* AMBIENT BACKGROUND GLOWS (Palette Tones) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#93E1D8]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#B2945B]/5 blur-[140px]" />
      </div>

      {/* MAIN CONTAINER */}
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row">
        {/* LEFT: TEXT & CALL TO ACTIONS */}
        <div className="max-w-xl flex-1 text-center lg:text-left">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#93E1D8]/20 bg-[#93E1D8]/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#93E1D8]">
            <span className="material-symbols-outlined text-[16px]">
              notifications_active
            </span>
            Smart Reminder Assistant
          </div>

          {/* Clean Typography using Palette Gradient */}
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]">
            Never Forget{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2945B] via-[#93E1D8] to-[#DDFFF7]">
              Important Things
            </span>{" "}
            Again.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
            Forgot to reply to someone? Forgot an important task or message? We
            keep reminding you until your work is completely completed.
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <button className="rounded-xl bg-gradient-to-r from-[#B2945B] to-[#93E1D8] px-6 py-3.5 text-sm font-bold text-[#16121e] shadow-lg shadow-[#B2945B]/10 transition duration-200 hover:brightness-110">
              <Link to="/SetNotification">Start Reminding Me</Link>
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition duration-200 hover:bg-white/10">
              <Link to="/Services">See How It Works</Link>
            </button>
          </div>

          {/* MINI OVERVIEW PILLS */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start">
            <div className="flex items-center gap-2 rounded-lg bg-[#221c2e] border border-white/5 px-3 py-2 text-xs text-slate-300">
              <span className="material-symbols-outlined text-[#B2945B] text-sm">
                mail
              </span>
              Forgot client email reply
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#221c2e] border border-white/5 px-3 py-2 text-xs text-slate-300">
              <span className="material-symbols-outlined text-[#93E1D8] text-sm">
                call
              </span>
              Doctor call sync
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#221c2e] border border-white/5 px-3 py-2 text-xs text-slate-300">
              <span className="material-symbols-outlined text-[#898952] text-sm">
                task_alt
              </span>
              Electricity bill completed
            </div>
          </div>
        </div>

        {/* RIGHT: CLEAN LAYERED DASHBOARD */}
        <div className="w-full max-w-lg flex-1">
          {/* Main Container - Ground layer */}
          <div className="w-full rounded-2xl bg-[#221c2e] p-6 shadow-2xl border border-white/5">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Today's Reminders
                </h2>
                <p className="text-xs text-slate-400">
                  Important things still pending
                </p>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#93E1D8] shadow-[0_0_10px_#93E1D8]" />
            </div>

            {/* List Group - Nested separate solid layers */}
            <div className="space-y-3">
              {/* Card 1 */}
              <div className="flex items-center gap-4 rounded-xl bg-[#2b233a] border border-white/[0.03] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#B2945B]/10 border border-[#B2945B]/20">
                  <span className="material-symbols-outlined text-[#B2945B] text-xl">
                    mail
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    Reply to Client Email
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    You still haven't replied.
                  </p>
                </div>
                <button className="shrink-0 rounded-lg bg-[#B2945B]/10 px-3 py-1.5 text-xs font-bold text-[#B2945B] transition hover:bg-[#B2945B] hover:text-[#16121e]">
                  Remind
                </button>
              </div>

              {/* Card 2 */}
              <div className="flex items-center gap-4 rounded-xl bg-[#2b233a] border border-white/[0.03] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#93E1D8]/10 border border-[#93E1D8]/20">
                  <span className="material-symbols-outlined text-[#93E1D8] text-xl">
                    call
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    Call Doctor Tomorrow
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    Scheduled reminder at 10:00 AM
                  </p>
                </div>
                <button className="shrink-0 rounded-lg bg-[#93E1D8]/10 px-3 py-1.5 text-xs font-bold text-[#93E1D8]">
                  Active
                </button>
              </div>

              {/* Card 3 */}
              <div className="flex items-center gap-4 rounded-xl bg-[#2b233a] border border-white/[0.03] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#898952]/10 border border-[#898952]/20">
                  <span className="material-symbols-outlined text-[#898952] text-xl">
                    chat
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    Reply to WhatsApp
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    3 alerts already dispatched
                  </p>
                </div>
                <button className="shrink-0 rounded-lg bg-[#898952]/10 px-3 py-1.5 text-xs font-bold text-[#898952]">
                  Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
