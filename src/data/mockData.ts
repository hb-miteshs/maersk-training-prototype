export interface CustomerAccount {
  id: string;
  name: string;
  industry: string;
  region: string;
  type: 'Existing account' | 'Prospect';
  historyNotes?: string;
  isManual?: boolean;
}

export interface DeckSlide {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  category?: 'Standard' | 'Customer-specific';
  kicker?: string;
  bullets?: string[];
  metrics?: { label: string; value: string; sub?: string }[];
  quote?: { text: string; author: string; role: string };
  keyPoints?: { title: string; desc: string }[];
  imageSrc?: string;
  notes?: string;
}

export interface PresentationDeck {
  id: string;
  title: string;
  customer: string;
  industry: string;
  createdDate: string;
  status: 'Preparing' | 'Ready';
  progressPercent: number; // 0 to 100
  progressText: string;
  slidesCount: number;
  thumbnail: string;
  audience?: string;
  pitchBrief?: string;
  slides: DeckSlide[];
}

export interface AppNotification {
  id: string;
  deckId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const USER_PROFILE = {
  name: 'Søren Larsen',
  role: 'Commercial Director, Energy & Renewables',
  email: 'soren.larsen@maersk.com',
  avatar: '/src/assets/images/avatar_soren_larsen_1790488974927.jpg',
};

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-1',
    name: 'Adamas Wind',
    industry: 'Offshore Wind',
    region: 'Europe',
    type: 'Existing account',
    historyNotes: 'Previous opportunity history available (GWO Basic Safety, Blade Repair, Crew Transfer Simulation)',
  },
  {
    id: 'cust-2',
    name: 'Adamas Marine Services',
    industry: 'Maritime',
    region: 'Denmark',
    type: 'Existing account',
    historyNotes: 'Active frame agreement for DP simulator assessments and ECDIS recurrent courses',
  },
  {
    id: 'cust-3',
    name: 'Adamas Energy Solutions',
    industry: 'Renewables',
    region: 'UK',
    type: 'Prospect',
    historyNotes: 'Initial discovery call held Aug 2024 regarding Dogger Bank technician upskilling',
  },
  {
    id: 'cust-4',
    name: 'Adamar Industries',
    industry: 'Energy',
    region: 'Norway',
    type: 'Prospect',
    historyNotes: 'Inbound inquiry on high-voltage offshore switchgear training',
  },
];

export const INITIAL_SLIDES_ADAMAS: DeckSlide[] = [
  {
    id: 1,
    slideNumber: 1,
    title: 'Adamas Wind',
    subtitle: 'Offshore Workforce Readiness',
    category: 'Customer-specific',
    kicker: 'PEOPLE  |  SKILLS  |  A SAFER, CLEANER TOMORROW',
    notes: 'Building the skilled workforce for a safer and more productive offshore wind future.',
    imageSrc: '/src/assets/images/wind_turbine_technician_1790488933366.jpg',
  },
  {
    id: 2,
    slideNumber: 2,
    title: 'The Challenge',
    subtitle: 'Rapid Offshore Expansion & Technician Supply Risk',
    category: 'Standard',
    kicker: 'CURRENT OPERATIONAL CONTEXT',
    keyPoints: [
      {
        title: 'Scaling Fleet Under Tight Deadlines',
        desc: 'Adamas Wind is deploying 48 new offshore turbines across the North Sea in 2025, requiring 140+ qualified technicians on-station.',
      },
      {
        title: 'Technician Readiness Bottlenecks',
        desc: 'Standard basic certifications do not prepare new recruits for unpredictable wave motions, complex troubleshooting, or emergency transfers.',
      },
      {
        title: 'High Cost of First-Year Safety Incidents',
        desc: 'Industry benchmark shows unaddressed competency gaps drive up to €420k per incident in weather-induced downtime and equipment damage.',
      },
    ],
    imageSrc: '/src/assets/images/cargo_vessel_port_1790488945291.jpg',
  },
  {
    id: 3,
    slideNumber: 3,
    title: 'Our Approach',
    subtitle: 'Competence Assurance as a Continuous Journey',
    category: 'Customer-specific',
    kicker: 'MAERSK TRAINING METHODOLOGY',
    keyPoints: [
      {
        title: '01. Pre-deployment Assessment',
        desc: 'Rigorous cognitive and physical aptitude screening before trainees ever step foot on a crew transfer vessel.',
      },
      {
        title: '02. Immersive Simulators',
        desc: 'Full-mission CTV transfer, hub rescue, and extreme weather crane handling in controlled simulation environments.',
      },
      {
        title: '03. Human Factors & Safety Leadership',
        desc: 'Empowering technicians to challenge unsafe operations, speak up under pressure, and uphold crew psychological safety.',
      },
      {
        title: '04. On-Turbine Verification',
        desc: 'SME-guided continuous competency tracking to maintain 100% compliance across flag and client mandates.',
      },
    ],
    imageSrc: '/src/assets/images/login_marine_vessel_1790488920644.jpg',
  },
  {
    id: 4,
    slideNumber: 4,
    title: 'Training Solutions',
    subtitle: 'Tailored Modules for Adamas Wind Operations',
    category: 'Customer-specific',
    kicker: 'CURATED PRODUCT PORTFOLIO',
    bullets: [
      'GWO Basic Safety Training (BST) + Advanced Rescue (ART)',
      'GWO Slinger Signaller & Basic Technical Training (BTT)',
      'Specialized Crew Transfer Vessel (CTV) Heavy Seas Ingress & Egress',
      'Wind Turbine High Voltage (HV) Safety & Isolation Procedures',
      'Human Performance & Operational Safety Leadership (LANE)',
      'Blade Inspection & Composite Repair Level 1 & 2',
    ],
    imageSrc: '/src/assets/images/wind_turbine_technician_1790488933366.jpg',
  },
  {
    id: 5,
    slideNumber: 5,
    title: 'Expected Impact',
    subtitle: 'Measurable Value & Risk Reduction',
    category: 'Standard',
    kicker: 'PROVEN BUSINESS OUTCOMES',
    metrics: [
      { value: 'Zero', label: 'Safety Incidents Target', sub: 'Validated across 25,000+ graduates' },
      { value: '-35%', label: 'First-Year Lost-Time Injury', sub: 'Through realistic simulation rehearsal' },
      { value: '98.4%', label: 'First-Time Pass Rate', sub: 'OEM & GWO accredited certification' },
      { value: '€1.2M', label: 'Est. Annual Downtime Savings', sub: 'Rapid problem solving on turbine' },
    ],
    quote: {
      text: 'Working with Maersk Training has given us more than standard certificates — it gave us an offshore workforce that makes the right decisions under extreme pressure.',
      author: 'Operations Director',
      role: 'Global Offshore Wind Operator',
    },
  },
  {
    id: 6,
    slideNumber: 6,
    title: 'Implementation Roadmap',
    subtitle: 'Targeted Milestones for 2025 Campaign',
    category: 'Customer-specific',
    kicker: 'PROJECT EXECUTION PHASES',
    keyPoints: [
      {
        title: 'Phase 1: Competency Gap Audit (Weeks 1–2)',
        desc: 'Map current technician cohort qualifications against Adamas turbine OEM requirements.',
      },
      {
        title: 'Phase 2: Customized Curriculum Design (Weeks 3–4)',
        desc: 'Tailor simulator scenarios to Adamas Wind specific CTV hulls and turbine nacelle layouts.',
      },
      {
        title: 'Phase 3: Cohort 1 & 2 Delivery (Weeks 5–8)',
        desc: 'Deliver intensive classroom, practical sea survival, and simulator training at Esbjerg/Newcastle centres.',
      },
      {
        title: 'Phase 4: Field Verification & Continuous Assurance',
        desc: 'Post-training digital competence passports and refresher scheduling through managed services.',
      },
    ],
  },
  {
    id: 7,
    slideNumber: 7,
    title: 'Why Maersk Training?',
    subtitle: '45+ Years of Marine & Energy Safety Heritage',
    category: 'Standard',
    kicker: 'STRATEGIC COMPETENCE PARTNER',
    keyPoints: [
      {
        title: 'Born From Constant Care',
        desc: 'Founded in 1978 after the Maersk Explorer blowout. We train specifically for the moments that must never go wrong.',
      },
      {
        title: 'Global Delivery Footprint',
        desc: 'World-class centres in Esbjerg, Svendborg, Newcastle, Aberdeen, Stavanger, Houston, and Rio de Janeiro.',
      },
      {
        title: 'Veteran Instructors & SMEs',
        desc: 'Over 200 dedicated master mariners, offshore wind lead technicians, and human factors psychologists.',
      },
      {
        title: 'One Integrated Solution',
        desc: 'Everything from compliance booking to digital competency tracking managed under one enterprise agreement.',
      },
    ],
    imageSrc: '/src/assets/images/offshore_rig_sunset_1790488961713.jpg',
  },
  {
    id: 8,
    slideNumber: 8,
    title: 'Next Steps',
    subtitle: 'Agreed Actions to Mobilize Pilot Cohort',
    category: 'Customer-specific',
    kicker: 'COLLABORATIVE TIMELINE',
    bullets: [
      'Finalise technician roster numbers for Q1 2025 pilot intake (30 technicians)',
      'Confirm custom simulator scenarios based on Adamas Wind vessel models',
      'Schedule joint technical scoping session with Head of Operations & Training Team',
      'Submit commercial proposal with enterprise volume framework',
    ],
    notes: 'Contact: Søren Larsen · Commercial Director · soren.larsen@maersk.com · +45 70 26 33 11',
  },
];

export const INITIAL_DECKS: PresentationDeck[] = [
  {
    id: 'deck-adamas-wind',
    title: 'Adamas Wind: Offshore Workforce Readiness',
    customer: 'Adamas Wind',
    industry: 'Offshore Wind',
    createdDate: 'Sep 26, 2024',
    status: 'Preparing',
    progressPercent: 68,
    progressText: 'Matching relevant solutions...',
    slidesCount: 8,
    thumbnail: '/src/assets/images/wind_turbine_technician_1790488933366.jpg',
    audience: 'Head of Operations, Training Manager',
    pitchBrief: 'Adamas Wind is expanding offshore operations next year and wants to improve technician readiness and safety consistency. We want to explore relevant training options and position Maersk Training as a long-term competence partner.',
    slides: INITIAL_SLIDES_ADAMAS,
  },
  {
    id: 'deck-commercial-cargo',
    title: 'Commercial Cargo Vessels: Safety & Competence',
    customer: 'Maersk Line Fleet Management',
    industry: 'Maritime',
    createdDate: 'Sep 18, 2024',
    status: 'Ready',
    progressPercent: 100,
    progressText: 'Ready for review',
    slidesCount: 22,
    thumbnail: '/src/assets/images/cargo_vessel_port_1790488945291.jpg',
    audience: 'Fleet Operations Director',
    pitchBrief: 'Comprehensive competence and simulator programs for commercial container vessel officers and deck crews.',
    slides: INITIAL_SLIDES_ADAMAS,
  },
  {
    id: 'deck-oilfield-contractors',
    title: 'Oil Field Contractors: Operational Readiness',
    customer: 'North Sea Drilling Consortium',
    industry: 'Oil & Gas',
    createdDate: 'Sep 10, 2024',
    status: 'Ready',
    progressPercent: 100,
    progressText: 'Ready for review',
    slidesCount: 14,
    thumbnail: '/src/assets/images/offshore_rig_sunset_1790488961713.jpg',
    audience: 'VP HSE & Offshore Drilling Operations',
    pitchBrief: 'ISE simulator emergency response and well control certifications.',
    slides: INITIAL_SLIDES_ADAMAS,
  },
  {
    id: 'deck-port-operations',
    title: 'Port Operations: Digital Transformation',
    customer: 'APM Terminals Global',
    industry: 'Ports & Terminals',
    createdDate: 'Aug 28, 2024',
    status: 'Ready',
    progressPercent: 100,
    progressText: 'Ready for review',
    slidesCount: 16,
    thumbnail: '/src/assets/images/cargo_vessel_port_1790488945291.jpg',
    audience: 'Terminal General Manager',
    pitchBrief: 'Crane operator ergonomics and automated terminal safety.',
    slides: INITIAL_SLIDES_ADAMAS,
  },
  {
    id: 'deck-sustainable-shipping',
    title: 'Sustainable Shipping for a Greener Future',
    customer: 'Nordic Clean Maritime Alliance',
    industry: 'Maritime & Energy',
    createdDate: 'Aug 14, 2024',
    status: 'Ready',
    progressPercent: 100,
    progressText: 'Ready for review',
    slidesCount: 12,
    thumbnail: '/src/assets/images/login_marine_vessel_1790488920644.jpg',
    audience: 'Chief Sustainability Officer',
    pitchBrief: 'Methanol dual-fuel and IGF code training.',
    slides: INITIAL_SLIDES_ADAMAS,
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    deckId: 'deck-commercial-cargo',
    title: 'Commercial Cargo Vessels',
    message: 'Presentation is ready for review.',
    timestamp: '18 Sep, 14:32',
    isRead: false,
  },
  {
    id: 'notif-2',
    deckId: 'deck-oilfield-contractors',
    title: 'Oil Field Contractors',
    message: 'Presentation is ready for review.',
    timestamp: '10 Sep, 09:15',
    isRead: false,
  },
  {
    id: 'notif-3',
    deckId: 'deck-port-operations',
    title: 'Port Operations',
    message: 'Presentation is ready for review.',
    timestamp: '28 Aug, 16:40',
    isRead: false,
  },
];
