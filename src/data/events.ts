export type EventItem = {
  id: string;
  title: string;
  // Either single date or start/end date range (ISO 8601)
  date?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  link?: string;
};

export const recentEvents: EventItem[] = [
  {
    id: "eth-nus-joint-workshop",
    title: "ETH–NUS Joint Workshop",
    startDate: "2025-09-18",
    endDate: "2025-09-19",
    location: "Singapore",
    description: "Joint ETH–NUS AI x FinTech workshop and hackathon, including NUS innovation day, talks, panel on regulation and innovation, and a hackathon on 'AI Agents for the Future of Financial Decision-Making'.",
    link:"https://www.math.nus.edu.sg/cqf/events/conference_and_workshops/",
  },
  {
    id: "the-9th-ism-isct-nii-zib-nus-modal-workshop",
    title: "The 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop",
    startDate: "2025-09-24",
    endDate: "2025-09-29",
    location: "Tokyo, Japan",
    description: "The 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop on Optimization and Machine Learning for Data Science and Future Computing will be held at Komazawa University, Fukasawa Campus in Tokyo, hosted by ISM and the Institute of Science Tokyo (ISCT), in collaboration with the National Institute of Informatics (NII), ZIB and the National University of Singapore (NUS) in September 2025.",
    link: "https://sites.google.com/view/optds2025",
  },
  {
    id: "65th-isi-world-statistics-congress",
    title: "65th ISI World Statistics Congress",
    startDate: "2025-10-05",
    endDate: "2025-10-09",
    location: "The Hague, the Netherlands",
    description: "Join us from 5 to 9 October 2025 for the 65th ISI World Statistics Congress, the leading global event for Statistics and Data Science, held every two years by the International Statistical Institute. Taking place in The Hague, The Netherlands, this congress will bring together around 1,500 statisticians and data scientists from academia, official statistics, private sector businesses, central banks, statistical societies and more.",
    link: "https://www.isi-next.org/conferences/isi-wsc2025/",
  },
  {
    id: "the-13th-conference-of-the-iasc-ars",
    title: "The 13th Conference of the IASC-ARS",
    startDate: "2025-12-04",
    endDate: "2025-12-06",
    location: "Ho Chi Minh City, Vietnam",
    description: "The 13th IASC-ARS2025 in HCM City on 4-6 Dec 2025. Keynote speakers: Prof. Chun-houh Chen, Academia Sinica, Taiwan, Prof. Jianqing Fan, Princeton University, USA and Prof. Tran Minh Ngoc, University of Sydney Business School, Australia",
    link: "https://viasm.edu.vn/en/hdkh/iasc-ars-2025",
  },
];


