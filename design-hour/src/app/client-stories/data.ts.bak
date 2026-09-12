// src/app/client-stories/data.ts
// ─────────────────────────────────────────────────────────────────────────────
// TAAS — Long-form Architectural Case Studies Data Model
// ─────────────────────────────────────────────────────────────────────────────

export type StoryStatus = 'draft' | 'verified' | 'client-approved';
export type PermissionStatus = 'pending' | 'approved' | 'declined';
export type FeedbackSource = 'google' | 'whatsapp' | 'email' | 'instagram' | 'in-person' | null;
export type ConsultationDuration = '30-min' | '60-min' | '90-min';
export type ProjectStage = 'planning' | 'pre-execution' | 'mid-renovation' | 'post-renovation' | 'new-home' | 'before-possession' | 'after-possession' | string;

export interface StoryImage {
  src: string;
  caption: string;
  type: 'project' | 'site' | 'material' | 'before' | 'after' | 'floorplan' | 'client';
}

export interface ConsultationStep {
  phase: 'understand' | 'look' | 'question' | 'direction' | 'decide' | 'review' | 'analyse' | 'challenge' | 'recommend';
  content: string;
}

// ── New Detailed Modules ─────────────────────────────────────────────────────

export interface ProjectSnapshot {
  projectSize?: string;      // e.g. "1200 sq.ft. carpet"
  designRequirement?: string; // e.g. "Complete layout planning before contractor starts"
  primaryFocus?: string;     // e.g. "Kitchen & Layout"
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

export interface ExpandedProblem {
  notWorking?: string;
  considering?: string;
  afraidOf?: string;
  whyOutsideOpinion?: string;
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
  layout?: {
    originalIdea: string;
    issue: string;
    recommendedDirection: string;
    finalDirection: string;
    result: string;
  };
  material?: {
    optionA: string;
    optionB: string;
    recommendation: string;
    finalSelection: string;
  };
  kitchen?: {
    direction: string;
    details: string; // What changed and why
  };
  storage?: {
    missing: string;
    added: string;
    avoided: string;
    visualEffect: string;
  };
  budget?: {
    wantedToSpend: string;
    recommendedSpending: string;
    recommendedSimplifying: string;
    why: string;
  };
}

export interface FinalOutput {
  description: string;
  executionScope?: string; // e.g. "EXECUTION BY CLIENT / CONTRACTOR"
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
  clientPhoto: string | null;
  location: string;
  propertyType: string;
  projectType: string;
  consultationDuration: ConsultationDuration;
  consultationDate: string;
  projectStage: ProjectStage;
  topics: string[];
  indexDecision: string;

  // ── New Rich Modules ──
  snapshot?: ProjectSnapshot;
  theClient?: ClientProfile;
  theProject?: ProjectDetails;
  theProblem?: ExpandedProblem;
  questions?: string[]; // The questions we needed to answer
  consultationTimeline: ConsultationStep[];
  whatWeSolved?: SolvedProblem[];
  designDecisions?: DesignDecision[];
  solutions?: SpecificSolutions;
  finalOutput?: FinalOutput;
  exactQuote: string;
  whatChanged?: WhatChanged;
  projectOutcome?: string[]; // The Client Left With...

  images: StoryImage[];
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZE 15 DRAFT SLOTS
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
  createDraft(1, 'New home layout', 'New Home Layout', 'Residential'),
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
