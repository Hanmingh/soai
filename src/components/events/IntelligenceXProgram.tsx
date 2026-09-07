import { useState } from "react";
import { Coffee, Utensils } from "lucide-react";

type SlotType =
  | "keynote"
  | "panel"
  | "showcase"
  | "invited"
  | "contributed"
  | "hands-on"
  | "break"
  | "lunch"
  | "ceremony"
  | "banquet"
  | "award"
  | "photo"
  | "end";

interface Track {
  venue?: string;
  type: SlotType;
  title: string;
  speaker?: string;
  moderator?: string;
  speakers?: string[];
  note?: string;
}

interface Slot {
  time: string;
  tracks: Track[];
}

interface DayProgram {
  id: string;
  label: string;
  date: string;
  slots: Slot[];
}

// Only shown when the category isn't already spelled out in the title itself.
const categoryLabel: Partial<Record<SlotType, string>> = {
  invited: "Invited Session",
  "hands-on": "Hands-on",
};

const days: DayProgram[] = [
  {
    id: "thu",
    label: "Day 1 · Thursday",
    date: "24 September 2026",
    slots: [
      { time: "08:45–09:30", tracks: [{ type: "break", title: "Breakfast & Registration" }] },
      { time: "09:30–09:45", tracks: [{ type: "ceremony", title: "Opening" }] },
      { time: "09:45–09:50", tracks: [{ type: "award", title: "SoAI Hackathon (AI Algo Trading) Awards" }] },
      { time: "09:50–09:55", tracks: [{ type: "photo", title: "Official Group Photograph" }] },
      { time: "10:00–11:00", tracks: [{ type: "keynote", title: "Keynote 1", speaker: "Stefan Woerner" }] },
      { time: "11:00–11:30", tracks: [{ type: "showcase", title: "Showcase 1", speaker: "D-Wave" }] },
      {
        time: "11:30–12:30",
        tracks: [{ type: "panel", title: "Panel 1: Agentic AI and Autonomous Systems", moderator: "Thorsten Koch" }],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–14:30",
        tracks: [
          { venue: "Auditorium 1", type: "panel", title: "Panel 2: Quantum × AI for Healthcare & Life Sciences", moderator: "Patrick Chia" },
          { venue: "SR12 – Global Learning Room", type: "invited", title: "Quantum Computing for Risk Management", speaker: "Paolo Giudici (with Alessandro Bisio, Vasily Kolesnikov, Yash Rastogi, Osamu Takahashi)" },
          { venue: "SR1", type: "invited", title: "Advances in Bayesian Optimization & Sequential Decision-Making", speaker: "Ray-Bing Chen" },
          { venue: "SR2", type: "invited", title: "Exact Computation and Parallel Methods in Combinatorial Optimization", speaker: "Koichi Fujii" },
          { venue: "SR3", type: "invited", title: "Mathematical Foundation of Quantum Computing", speaker: "Josef Teichmann" },
          { venue: "SR4", type: "invited", title: "Quantum Agents for Sequence Prediction", speaker: "Jayne Thompson" },
        ],
      },
      { time: "14:30–15:00", tracks: [{ type: "showcase", title: "Showcase 2", speaker: "Academia Sinica" }] },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      { time: "15:30–16:30", tracks: [{ type: "keynote", title: "Keynote 2", speaker: "José Ignacio Latorre" }] },
      {
        time: "16:30–18:00",
        tracks: [
          { venue: "Auditorium 1", type: "invited", title: "Challenges beyond Classical Optimization", speaker: "Thorsten Koch" },
          { venue: "SR12 – Global Learning Room", type: "invited", title: "AI & Reinforcement Learning for Healthcare & Biomedical Systems", speaker: "Xun Shen" },
          { venue: "SR1", type: "invited", title: "Modern Methods in Statistical Modeling & Inference", speaker: "Takayuki Shiohama" },
          { venue: "SR2", type: "invited", title: "Industrial Deployment of AI: From Algorithmic Innovation to Production Realities", speaker: "Dennis Thumm" },
          { venue: "SR3", type: "invited", title: "Theoretical and Algorithmic Frontiers in Hybrid Quantum-AI Systems", speaker: "Hongrui Zhang" },
          { venue: "SR4", type: "invited", title: "Quantum Computing towards Finance and ML Applications", speaker: "Patrick Rebentrost" },
        ],
      },
      { time: "18:00", tracks: [{ type: "end", title: "End of Day 1" }] },
    ],
  },
  {
    id: "fri",
    label: "Day 2 · Friday",
    date: "25 September 2026",
    slots: [
      { time: "09:30–10:30", tracks: [{ type: "keynote", title: "Keynote 3", speaker: "Simon See, NVIDIA" }] },
      { time: "10:30–11:00", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "11:00–11:30",
        tracks: [
          { venue: "Auditorium 1", type: "showcase", title: "Showcase 3", speaker: "UBS / Swiss AI" },
          { venue: "SR12 – Global Learning Room", type: "invited", title: "Advanced Optimization, Vision & LLMs", speaker: "Katsuki Fujisawa" },
          { venue: "SR1", type: "invited", title: "Reservoir Computing & Dynamics Learning", speaker: "Juan-Pablo Ortega / Florian Rossmannek" },
          { venue: "SR2", type: "invited", title: "Reliable & Adaptive AI", speaker: "Chuan-Ju Wang" },
          { venue: "SR3", type: "invited", title: "Statistical & Network Modeling of Knowledge Discovery and Scientific Systems", speaker: "Frederick Kin Hing Phoa" },
          { venue: "SR4", type: "invited", title: "Trustworthy Machine Learning with Applications", speaker: "Henry Lu" },
        ],
      },
      {
        time: "11:30–12:30",
        tracks: [{ type: "panel", title: "Panel 3: Quantum × AI for Finance and Risk", moderator: "Paolo Giudici" }],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–15:00",
        tracks: [
          { venue: "SR12 – Global Learning Room", type: "hands-on", title: "Hands-on 1: Agentic AI Coding", speaker: "Thorsten Koch" },
          { venue: "SR1", type: "hands-on", title: "Hands-on 2: Quantum Computing", speaker: "Vishal Bajpe" },
        ],
      },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "15:30–17:00",
        tracks: [
          { venue: "SR12 – Global Learning Room", type: "hands-on", title: "Hands-on 1: Agentic AI Coding (Part II)", speaker: "Thorsten Koch" },
          { venue: "SR1", type: "hands-on", title: "Hands-on 2: Quantum Computing (Part II)", speaker: "Vishal Bajpe" },
        ],
      },
      { time: "17:00", tracks: [{ type: "end", title: "End of Day 2" }] },
      {
        time: "19:00–21:00",
        tracks: [{ type: "banquet", title: "Banquet", note: "Early Bird registrants & invited guests only" }],
      },
    ],
  },
  {
    id: "sat",
    label: "Day 3 · Saturday",
    date: "26 September 2026",
    slots: [
      { time: "09:30–10:30", tracks: [{ type: "keynote", title: "Keynote 4", speaker: "Mitsuhisa Sato, RIKEN" }] },
      { time: "10:30–11:00", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "11:00–11:30",
        tracks: [
          { venue: "Auditorium 1", type: "showcase", title: "Showcase 4", speaker: "ETH / Singapore-ETH Centre" },
          { venue: "SR12 – Global Learning Room", type: "invited", title: "Quantum Computing for Engineering", speaker: "Philippe Codognet & Francisco Chinesta" },
          { venue: "SR1", type: "invited", title: "AI & Data-Driven Methods for Quantitative Finance", speaker: "Qinxin Yan" },
          { venue: "SR2", type: "invited", title: "Theoretical & Algorithmic Frontiers in Hybrid Quantum–AI Systems", speaker: "Hongrui Zhang" },
          { venue: "SR3", type: "invited", title: "Logistics", speaker: "Ralf Borndörfer" },
          { venue: "SR4", type: "contributed", title: "Contributed Session 1: AI for Decision-Making and Optimization", speakers: ["Lukas Voss", "Peng Liu", "Merliza Fernandez Libao"] },
        ],
      },
      {
        time: "11:30–12:30",
        tracks: [{ type: "panel", title: "Panel 4: Research, Education & Talent for the Intelligence Era", moderator: "Ying Chen" }],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–15:00",
        tracks: [
          { venue: "Auditorium 1", type: "invited", title: "AI for Energy and Finance", speaker: "Stefan Lessmann" },
          { venue: "SR12 – Global Learning Room", type: "invited", title: "Statistics for the AI Era: Reliable Prediction, Responsible Decisions, and Human-Centered Applications", speaker: "Paulo Canas Rodrigues" },
          { venue: "SR1", type: "invited", title: "Reinforcement Learning, Security & Autonomous Decision-Making", speaker: "Lei Zhou" },
          { venue: "SR2", type: "invited", title: "Data Science, AI & Official Statistics", speaker: "Osuolale Popoola" },
          { venue: "SR3", type: "invited", title: "AI for Healthcare", speaker: "Guan Wang" },
          { venue: "SR4", type: "contributed", title: "Contributed Session 2: Generative, Agentic and Scientific AI", speakers: ["Yuting Zhu", "Gloria Wu", "Barbara Tarantino"] },
        ],
      },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      { time: "15:30–16:30", tracks: [{ type: "keynote", title: "Keynote 5", speaker: "Xin Guo, UC Berkeley" }] },
      { time: "16:30–17:30", tracks: [{ type: "panel", title: "Panel 5: Quantum × AI", moderator: "Philippe Codognet" }] },
      { time: "17:30–18:00", tracks: [{ type: "ceremony", title: "Closing Ceremony" }] },
      { time: "18:00", tracks: [{ type: "end", title: "End of Day 3" }] },
    ],
  },
];

function TrackDetails({ track, compact }: { track: Track; compact?: boolean }) {
  const label = categoryLabel[track.type];
  return (
    <div className="min-w-0">
      {track.venue && (
        <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">{track.venue}</p>
      )}
      {label && <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>}
      <p className={compact ? "text-sm font-semibold text-gray-900" : "text-base font-semibold text-gray-900"}>
        {track.title}
        {track.type === "banquet" && (
          <span className="ml-1.5 text-xs font-medium text-[#ee7c01]">By invitation only</span>
        )}
      </p>
      {track.speaker && <p className="text-sm text-gray-500">{track.speaker}</p>}
      {track.moderator && <p className="text-sm text-gray-500">Moderator: {track.moderator}</p>}
      {track.speakers && <p className="text-sm text-gray-500">{track.speakers.join(", ")}</p>}
      {track.note && <p className="text-sm text-gray-500">{track.note}</p>}
    </div>
  );
}

function SlotRow({ slot }: { slot: Slot }) {
  const single = slot.tracks.length === 1 ? slot.tracks[0] : null;

  if (single && (single.type === "break" || single.type === "lunch" || single.type === "end")) {
    const Icon = single.type === "lunch" ? Utensils : single.type === "break" ? Coffee : null;
    return (
      <div className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-gray-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        <span>{slot.time}</span>
        <span className="text-gray-300">·</span>
        <span>{single.title}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-6">
      <div className="shrink-0 pt-0.5 sm:w-24">
        <span className="text-sm font-bold tabular-nums text-[#003d7b]">{slot.time}</span>
      </div>
      {single ? (
        <TrackDetails track={single} />
      ) : (
        <div className="grid flex-1 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {slot.tracks.map((t, i) => (
            <div key={i} className="bg-white p-3">
              <TrackDetails track={t} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function IntelligenceXProgram() {
  const [activeDay, setActiveDay] = useState(days[0].id);
  const day = days.find((d) => d.id === activeDay) ?? days[0];

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDay(d.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeDay === d.id
                  ? "bg-[#003d7b] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="text-xs font-medium text-gray-400">{day.date} · Singapore Time (SGT)</p>
      </div>

      <div className="divide-y divide-gray-100 px-5">
        {day.slots.map((slot, i) => (
          <SlotRow key={i} slot={slot} />
        ))}
      </div>

      <div className="flex flex-col items-start gap-1 border-t border-gray-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          Programme is provisional and subject to change. All sessions at UTown, NUS.
        </p>
        <a
          href="/events/Program.xlsx"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs font-semibold text-[#003d7b] hover:underline"
        >
          Download full schedule (.xlsx)
        </a>
      </div>
    </div>
  );
}
