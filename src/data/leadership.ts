export type Person = {
  name: string;
  role?: string;
  photoFileName?: string; // stored in public/leadership or src/assets/leadership
  title?: string; // e.g., "Dr.", "Prof."
  github?: string;
  linkedin?: string;
  dribbble?: string;
  affiliation?: string;
  position?: string;
};

export type LeadershipSection = {
  id: string; // anchor id
  title: string;
  people?: Person[];
  description?: string;
};

export const executiveCommittee: Person[] = [
  { name: "Ying Chen", title: "Prof.", role: "President", photoFileName: "chenying.jpg", github: "", linkedin: "https://www.linkedin.com/in/ying-chen-940a9969/", dribbble: "https://www.yingchen.org" },
  { name: "Thorsten Koch", title: "Prof. Dr.", role: "President-Elect", photoFileName: "Thorsten.png", github: "", linkedin: "https://www.linkedin.com/in/thorsten-koch-5b288352/", dribbble: "https://www.zib.de/userpage/koch/" },
  { name: "Jianlong Lu", title: "Dr.", role: "Secretary", photoFileName: "jianlong.jpg", github: "", linkedin: "https://www.linkedin.com/in/jianlong-lu-1662a9167/", dribbble: "" },
  { name: "Qiang He", title: "Dr.", role: "Treasurer", photoFileName: "qiang.jpg", github: "", linkedin: "https://www.linkedin.com/in/qiang-he-nus/", dribbble: "" },
];

export const steeringCouncil: Person[] = [
  { name: "Ralf Borndörfer", title: "Prof. Dr.", role: "Chair of Steering Committee", position:"Co-Chair, Research Campus MODAL, Germany", affiliation:"Freie Universität Berlin · Zuse Institute Berlin", photoFileName: "Borndorfer.jpg", github: "", linkedin: "https://www.linkedin.com/in/ralf-bornd%C3%B6rfer-593710164/", dribbble: "https://www.zib.de/userpage/borndoerfer/Homepage/profession.en.html" },
];

export const advisoryBoard: Person[] = [
  { name: "Agostino Capponi", title: "Prof.", position:"Director, Center for Digital Finance and Technologies", affiliation:"Columbia University, USA", photoFileName: "Ago.jpg", github: "", linkedin: "", dribbble: "https://www.columbia.edu/~ac3827/" },
  { name: "Chun-houh Chen", title: "Prof.", position:"Secretary-General", affiliation:"Academia Sinica, Taiwan", photoFileName: "Chun-houh.png", github: "", linkedin: "", dribbble: "https://www.sinica.edu.tw/en/tab/23" },
  { name: "Nikolaus Hautsch", title: "Prof. Dr.", position:"Vice Rector", affiliation:"University of Vienna, Austria", photoFileName: "Nikolaus.png", github: "", linkedin: "", dribbble: "https://homepage.univie.ac.at/nikolaus.hautsch/" },
  { name: "Tomoyuki Higuchi", title: "Prof.", position:"Director-General (2011–2019)", affiliation:"The Institute of Statistical Mathematics, Japan", photoFileName: "Higuchi.png", github: "", linkedin: "", dribbble: "https://researchmap.jp/matrix" },
  { name: "Josef Teichmann", title: "Prof.", position:"Head, Department of Mathematics", affiliation:"ETH Zürich, Switzerland", photoFileName: "Teichmann.jpg", github: "", linkedin: "", dribbble: "https://people.math.ethz.ch/~jteichma/" },
  { name: "Qiwei Yao", title: "Prof.", position:"Head, Department of Statistics (2006–2009)", affiliation:"London School of Economics and Political Science (LSE), UK", photoFileName: "Qiwei.png", github: "", linkedin: "", dribbble: "https://stats.lse.ac.uk/q.yao/" },
];

export const countryLeaders: Person[] = [
  { name: "Paulo Canas Rodrigues", title: "Prof. Dr.", role: "Chair of Brazil", position: "President, International Association of Statistical Computing", affiliation:"Federal University of Bahia", photoFileName: "Paulo.jpg", github: "", linkedin: "", dribbble: "https://www.paulocanas.org/" },
  { name: "Stefan Lessmann", title: "Prof. Dr.", role: "Chair of Germany", position:"Chair of Information Systems", affiliation:"Humboldt-Universität zu Berlin, Germany", photoFileName: "lessmann.jpg", github: "", linkedin: "", dribbble: "https://www.wiwi.hu-berlin.de/en/Professorships/bwl/wi/personen-en/hl/standardseite-en" },
  { name: "Paolo Giudici", title: "Prof.", role: "Chair of Italy", position:"Lead PI, EU Horizon 2020 PERISCOPE (2020–2023) · Lead PI, EU Horizon 2020 FIN-TECH(2019–2021)", affiliation:"University of Pavia, Italy", photoFileName: "Giudici.jpg", github: "", linkedin: "", dribbble: "https://sites.google.com/a/unipv.it/giudici/paolo-giudici" },
  { name: "Simon Trimborn", title: "Prof.", role:"Chair of Netherlands", position:"Co-creator of the CRIX and VCRIX indices", affiliation:"University of Amsterdam, Netherlands", photoFileName: "simon.png", github: "", linkedin: "", dribbble: "https://www.simontrimborn.de/" },
  { name: "Bastian Bergmann", title: "Dr.", role: "Chair of Switzerland", position:"Executive Director, ETH Finsuretech Hub", affiliation:"ETH Zürich, Switzerland", photoFileName: "Bastian.jpeg", github: "", linkedin: "", dribbble: "https://finsuretech.ethz.ch/people.html" },
  { name: "Rujira Ouncharoen", title: "Prof.", role: "Chair of Thailand", position:"Dean, International College of Digital Innovation", affiliation:"Chiang Mai University, Thailand", photoFileName: "Rujira.png", github: "", linkedin: "", dribbble: "https://math.science.cmu.ac.th/personals-detail.php?lg=en&id=32" },
];

export const leadershipSections: LeadershipSection[] = [
  { id: "ec", title: "Executive Committee (EC)", people: executiveCommittee },
  { id: "steering-council", title: "Steering Council", people: steeringCouncil },
  { id: "ab", title: "Advisory Board", people: advisoryBoard },
  { id: "operational", title: "Country/Region Leaders", people: countryLeaders },
];


