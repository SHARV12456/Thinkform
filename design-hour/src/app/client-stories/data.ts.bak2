// src/app/client-stories/data.ts
// ─────────────────────────────────────────────────────────────────────────────
// TAAS — Long-form Architectural Case Studies Data Model
// ─────────────────────────────────────────────────────────────────────────────

export type StoryStatus = 'draft' | 'verified' | 'client-approved';
export type FeedbackSource = 'google' | 'whatsapp' | 'email' | 'instagram' | 'in-person' | null;
export type ConsultationDuration = '30-min' | '60-min' | '90-min';
export type ProjectStage = 'planning' | 'pre-execution' | 'mid-renovation' | 'post-renovation' | 'new-home' | 'before-possession' | 'after-possession' | string;

export interface StoryImage {
  src: string;
  caption: string;
  type: 'project' | 'site' | 'material' | 'before' | 'after' | 'floorplan' | 'client' | 'drawing';
}

export interface ConsultationStep {
  phase: 'understand' | 'look' | 'question' | 'direction' | 'decide' | 'review' | 'analyse' | 'challenge' | 'recommend';
  content: string;
}

export interface ProjectSnapshot {
  projectSize?: string;
  designRequirement?: string;
  primaryFocus?: string;
}

export interface ClientProfile {
  who?: string;
  goal?: string;
  whyContacted?: string;
  alreadyDecided?: string;
  uncertainAbout?: string;
}

export interface ProjectDetails {
  configuration?: string;
  condition?: string;
  scope?: string;
}

// "WHAT WAS ACTUALLY GOING WRONG?"
export interface ProblemDetail {
  title: string;
  explanation: string;
  image?: StoryImage;
}

// "WHAT THE CLIENT WAS CONSIDERING"
export interface OptionDetail {
  title: string;
  explanation: string;
  image?: StoryImage;
}

// "WHAT WE LOOKED AT"
export interface AnalysisDetail {
  category: string; // e.g. "LAYOUT", "CIRCULATION"
  noticed: string;
  recommended: string;
  why: string;
}

export interface SolvedProblem {
  problem: string;
  taasDirection: string;
  why: string;
  result: string;
}

export interface DesignDecision {
  before: string;
  recommendation: string;
  final: string;
  whyItWorked: string;
}

export interface SpecificSolutions {
  layout?: { originalIdea: string; issue: string; recommendedDirection: string; finalDirection: string; result: string; };
  material?: { optionA: string; optionB: string; recommendation: string; finalSelection: string; };
  kitchen?: { direction: string; details: string; };
  storage?: { missing: string; added: string; avoided: string; visualEffect: string; };
  budget?: { wantedToSpend: string; recommendedSpending: string; recommendedSimplifying: string; why: string; };
}

export interface FinalOutput {
  description: string;
  executionScope?: string;
}

export interface WhatChanged {
  beforeTaas: string[];
  afterTaas: string[];
}

export interface ClientStory {
  slot: number;
  slug: string;
  status: StoryStatus;
  permissionGranted: boolean;
  feedbackSource: FeedbackSource;
  adminCategory: string;

  // ── Core Identity ──
  clientName: string;
  clientDisplayName?: string; // If null/empty, fall back to clientName
  clientPhoto: string | null;
  location: string;
  propertyType: string;
  projectType: string;
  consultationDuration: ConsultationDuration;
  consultationDate: string;
  projectStage: ProjectStage;
  topics: string[];
  indexDecision: string;

  // ── Modules ──
  snapshot?: ProjectSnapshot;
  theClient?: ClientProfile;
  theProject?: ProjectDetails;
  
  problems?: ProblemDetail[]; // "WHAT WAS ACTUALLY GOING WRONG?"
  options?: OptionDetail[];   // "WHAT THE CLIENT WAS CONSIDERING"
  analysis?: AnalysisDetail[]; // "WHAT WE LOOKED AT"

  questions?: string[];
  consultationTimeline: ConsultationStep[];
  whatWeSolved?: SolvedProblem[];
  designDecisions?: DesignDecision[];
  solutions?: SpecificSolutions;
  finalOutput?: FinalOutput;
  exactQuote: string;
  whatChanged?: WhatChanged;
  projectOutcome?: string[];

  images: StoryImage[];
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZE 15 DRAFT SLOTS (with structural preview in Slot 1)
// ─────────────────────────────────────────────────────────────────────────────

const createDraft = (slot: number, category: string, projectType: string, propertyType: string): ClientStory => ({
  slot,
  slug: `story-${slot.toString().padStart(2, '0')}`,
  status: 'draft',
  permissionGranted: false,
  feedbackSource: null,
  adminCategory: category,
  clientName: '',
  clientPhoto: null,
  location: '',
  propertyType,
  projectType,
  consultationDuration: '60-min',
  consultationDate: '',
  projectStage: 'planning',
  topics: [],
  indexDecision: '',
  consultationTimeline: [],
  exactQuote: '',
  images: [],
});

export const CLIENT_STORIES: ClientStory[] = [
  {
    slot: 1,
    slug: 'story-01',
    status: 'client-approved',
    permissionGranted: true,
    feedbackSource: 'whatsapp',
    adminCategory: 'New home layout',
    clientName: '[UI PREVIEW] structural demo',
    clientDisplayName: 'S. B.', // Example of privacy name formatting
    clientPhoto: null,
    location: 'Andheri West',
    propertyType: '2BHK Apartment',
    projectType: 'Layout & Space Planning',
    consultationDuration: '60-min',
    consultationDate: 'August 2026',
    projectStage: 'planning',
    topics: ['LAYOUT', 'KITCHEN', 'STORAGE', 'RESIDENTIAL'],
    indexDecision: 'Kitchen layout + storage planning. (This is a structural preview of the new case study layout).',
    
    snapshot: {
      projectSize: '1,100 sq.ft. carpet',
      designRequirement: 'Complete layout clarity before civil work begins',
      primaryFocus: 'Layout & Space Optimization',
    },

    theClient: {
      who: 'A young couple planning a full renovation of their newly purchased 2BHK.',
      goal: 'Maximize storage without making the apartment feel cramped, and finalize a kitchen layout.',
      whyContacted: 'They had received three completely different layouts from contractors and were confused about which one was actually functional.',
      alreadyDecided: 'They wanted a minimalist aesthetic with neutral tones.',
      uncertainAbout: 'Whether the open kitchen idea would actually work with their daily cooking habits.',
    },

    theProject: {
      configuration: '2 Bedrooms, 2 Bathrooms, Living + Dining, Semi-open Kitchen.',
      condition: '15-year-old apartment requiring complete civil changes.',
      scope: 'Full interior renovation, civil modifications, new plumbing and electricals.',
    },

    problems: [
      {
        title: 'Isolated Kitchen & Wasted Space',
        explanation: 'The existing kitchen felt completely isolated from the living area, and the living room itself had a massive dead corner near the entryway that was completely unutilized.',
      }
    ],

    options: [
      {
        title: 'OPTION A — Fully Open Kitchen',
        explanation: 'Contractor suggested breaking the wall entirely. However, the decision was difficult because it meant losing crucial overhead cabinet space and exposing the cooking area directly to guests.'
      },
      {
        title: 'OPTION B — Retain Existing Wall',
        explanation: 'Keep the kitchen closed, but this left the living room feeling small and blocked natural light.'
      }
    ],

    analysis: [
      {
        category: 'CIRCULATION',
        noticed: 'The proposed TV unit placement forced the primary walkway right through the viewing area.',
        recommended: 'Flip the living room orientation entirely.',
        why: 'It creates a dedicated, undisturbed viewing zone and a clear corridor to the private spaces.'
      },
      {
        category: 'STORAGE',
        noticed: 'The open kitchen plan would reduce essential wall storage by 35%.',
        recommended: 'A semi-open glass partition half-wall.',
        why: 'Provides visual openness and natural light while retaining the lower half for base cabinets and concealing countertop mess.'
      }
    ],

    questions: [
      'Will breaking the kitchen wall leave us with enough storage?',
      'Can the living room accommodate a dining table for 6 without blocking circulation?',
      'Is it worth spending budget on rerouting the master bathroom plumbing?'
    ],

    consultationTimeline: [
      { phase: 'understand', content: 'Reviewed their daily routine, cooking habits, and how they entertain guests.' },
      { phase: 'look', content: 'Examined the three contractor plans and the original builder floor plan.' },
      { phase: 'analyse', content: 'Identified that the proposed open kitchen would reduce storage by 35%.' },
      { phase: 'challenge', content: 'Questioned the need for a 6-seater dining table when they only entertain large groups twice a year.' },
      { phase: 'recommend', content: 'Proposed a glass partition kitchen (semi-open) and an expandable 4-seater dining setup.' },
      { phase: 'decide', content: 'Client immediately saw the value in retaining wall storage while keeping visual openness.' }
    ],

    whatWeSolved: [
      {
        problem: 'The Kitchen Wall Dilemma',
        taasDirection: 'Retain a half-wall with a sliding fluted glass partition.',
        why: 'This keeps the cooking fumes contained, allows natural light to flow into the living room, and preserves the lower wall for base cabinets and countertop space.',
        result: 'Gained 4 feet of counter space compared to the fully open plan, while still achieving the modern, airy feel they wanted.'
      }
    ],

    designDecisions: [
      {
        before: 'A bulky L-shaped sofa blocking the balcony door.',
        recommendation: 'A streamlined 3-seater sofa with two lightweight accent chairs.',
        final: 'Client selected the 3-seater + chairs configuration.',
        whyItWorked: 'It opened up the circulation path to the balcony and made the room feel visually lighter.'
      }
    ],

    solutions: {
      budget: {
        wantedToSpend: 'Expensive Italian marble for the entire house.',
        recommendedSpending: 'High-quality large-format vitrified tiles for flooring, saving budget for premium kitchen hardware.',
        recommendedSimplifying: 'Simplifying the false ceiling design to basic peripheral lighting.',
        why: 'Vitrified tiles offer better durability for their pets, and kitchen hardware dictates daily functional joy much more than a complex ceiling.'
      }
    },

    finalOutput: {
      description: 'The clients finalized their layout in 60 minutes. They abandoned the fully open kitchen idea for a much more practical semi-open glass partition design, flipped their living room, and reallocated their flooring budget to premium cabinetry.',
      executionScope: 'DESIGN DIRECTION PROVIDED · EXECUTION BY CLIENTS CONTRACTOR'
    },

    exactQuote: 'We were running in circles for two weeks with our contractor. In one hour, TAAS showed us why the open kitchen would ruin our storage. Best money we spent before starting the renovation.',

    whatChanged: {
      beforeTaas: [
        'Confused by contradictory contractor advice',
        'About to make a costly mistake with the kitchen layout',
        'Unsure where to allocate the renovation budget'
      ],
      afterTaas: [
        'Clear, practical floor plan locked in',
        'Kitchen layout that actually supports their lifestyle',
        'Confidence to instruct the contractor exactly what to do'
      ]
    },

    projectOutcome: [
      'A confirmed kitchen direction (semi-open)',
      'A better understanding of storage vs. aesthetics',
      'Confidence to proceed with execution without second-guessing'
    ],

    images: [],
  },
  createDraft(2, 'Kitchen planning', 'Kitchen Planning', 'Residential'),
  createDraft(3, 'Material selection', 'Material Selection', 'Residential'),
  createDraft(4, 'Storage problem', 'Storage Planning', 'Residential'),
  createDraft(5, 'Furniture planning', 'Furniture Planning', 'Residential'),
  createDraft(6, 'Lighting decisions', 'Lighting Design', 'Residential'),
  createDraft(7, 'Whole-home design direction', 'Whole-Home Direction', 'Residential'),
  createDraft(8, 'Contractor/design disagreement', 'Contractor Review', 'Residential'),
  createDraft(9, 'Second opinion', 'Second Opinion', 'Residential'),
  createDraft(10, 'Renovation planning', 'Renovation Planning', 'Residential'),
  createDraft(11, 'Small apartment planning', 'Small Space Planning', '1BHK'),
  createDraft(12, 'Bedroom design', 'Bedroom Design', 'Residential'),
  createDraft(13, 'Commercial space', 'Commercial Interior', 'Commercial'),
  createDraft(14, 'Budget/design decisions', 'Budget Planning', 'Residential'),
  createDraft(15, 'Final design validation', 'Design Validation', 'Residential'),
];

export const PUBLISHED_STORIES = CLIENT_STORIES.filter(
  (s) => s.status === 'client-approved' && s.permissionGranted,
);

export const TOTAL_SLOTS = CLIENT_STORIES.length;

export function padSlot(n: number) {
  return String(n).padStart(2, '0');
}

export const DURATION_LABELS: Record<string, string> = {
  '30-min': '30 MIN DESIGN HOUR',
  '60-min': '60 MIN DESIGN HOUR',
  '90-min': '90 MIN DESIGN HOUR',
};

export const SOURCE_LABELS: Record<string, string> = {
  google: 'Google Review',
  whatsapp: 'WhatsApp Feedback',
  email: 'Email Feedback',
  instagram: 'Instagram Feedback',
  'in-person': 'Post-Consultation Feedback',
};

export const PHASE_LABELS: Record<string, string> = {
  understand: 'UNDERSTAND',
  look: 'REVIEW',
  review: 'REVIEW',
  question: 'CHALLENGE',
  challenge: 'CHALLENGE',
  analyse: 'ANALYSE',
  direction: 'RECOMMEND',
  recommend: 'RECOMMEND',
  decide: 'DECIDE',
};
