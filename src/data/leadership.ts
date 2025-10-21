export type Person = {
  name: string;
  role: string;
  photoFileName?: string; // stored in public/leadership or src/assets/leadership
  title?: string; // e.g., "Dr.", "Prof."
  github?: string;
  linkedin?: string;
  dribbble?: string;
};

export type LeadershipSection = {
  id: string; // anchor id
  title: string;
  people?: Person[];
  description?: string;
};

export const executiveCommittee: Person[] = [
  { name: "Ying Chen", title: "Prof.", role: "President", photoFileName: "chenying.jpg", github: "", linkedin: "https://www.linkedin.com/in/ying-chen-940a9969/", dribbble: "www.yingchen.org" },
  { name: "Thorsten Koch", title: "Prof. Dr.", role: "President-Elect", photoFileName: "Thorsten.png", github: "", linkedin: "https://www.linkedin.com/in/thorsten-koch-5b288352/", dribbble: "https://www.zib.de/userpage/koch/" },
  { name: "Jianlong Lu", title: "Dr.", role: "Secretary", photoFileName: "jianlong.jpg", github: "", linkedin: "https://www.linkedin.com/in/jianlong-lu-1662a9167/", dribbble: "" },
  { name: "Qiang He", title: "Dr.", role: "Treasurer", photoFileName: "qiang.jpg", github: "", linkedin: "https://www.linkedin.com/in/qiang-he-nus/", dribbble: "" },
];

export const steeringCouncil: Person[] = [
  { name: "Ralf Borndörfer", title: "Prof. Dr.", role: "Chair", photoFileName: "Borndorfer.jpg", github: "", linkedin: "https://www.linkedin.com/in/ralf-bornd%C3%B6rfer-593710164/", dribbble: "https://www.zib.de/userpage/borndoerfer/Homepage/profession.en.html" },
];

export const advisoryBoard: Person[] = [
  { name: "Nikolaus Hautsch", title: "Prof. Dr.", role: "Advisor", photoFileName: "Nikolaus.png", github: "", linkedin: "", dribbble: "https://homepage.univie.ac.at/nikolaus.hautsch/" },
  { name: "Tomoyuki Higuchi", title: "Prof.", role: "Advisor", photoFileName: "Higuchi.png", github: "", linkedin: "", dribbble: "https://researchmap.jp/matrix" },
];

export const countryLeaders: Person[] = [
  { name: "Stefan Lessmann", title: "Prof. Dr.", role: "SoAI Country Chair of Germany", photoFileName: "lessmann.jpg", github: "", linkedin: "", dribbble: "https://www.wiwi.hu-berlin.de/en/Professorships/bwl/wi/personen-en/hl/standardseite-en" },
  { name: "Simon Trimborn", title: "Prof.", role: "SoAI Country Chair of Netherlands", photoFileName: "simon.png", github: "", linkedin: "", dribbble: "https://www.simontrimborn.de/" },
];

export const leadershipSections: LeadershipSection[] = [
  { id: "ec", title: "Executive Committee (EC)", people: executiveCommittee },
  { id: "steering-council", title: "Steering Council", people: steeringCouncil },
  { id: "ab", title: "Advisory Board (AB)", people: advisoryBoard },
  { id: "operational", title: "Country Leaders", people: countryLeaders },
];


