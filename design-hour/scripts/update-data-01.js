const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xreva', 'Desktop', 'app 2 to 3d', 'design-hour', 'src', 'app', 'client-stories', 'data.ts');

const newContent = `// src/app/client-stories/data.ts

export type StoryStatus = 'draft' | 'verified' | 'client-approved';
export type FeedbackSource = 'google' | 'whatsapp' | 'email' | 'instagram' | 'in-person' | null;
export type ConsultationDuration = '30-min' | '60-min' | '90-min';
export type ProjectStage = 'planning' | 'pre-execution' | 'mid-renovation' | 'post-renovation' | 'new-home' | 'before-possession' | 'after-possession' | string;

export interface StoryImage {
  src: string;
  caption: string;
  type: 'hero' | 'before' | 'problem' | 'decision' | 'final' | 'gallery' | 'project' | 'site';
}

export interface ConsultationStep {
  phase: 'understand' | 'review' | 'identify' | 'analyse' | 'recommend' | 'decide';
  content: string;
}

export interface QuestionBlock {
  question: string;
  context: string;
}

export interface ProblemSolution {
  problem: string;
  explanation: string;
  image?: StoryImage;
  recommendation: string;
  why: string;
  decision: string;
  result: string;
}

export interface DesignDecision {
  before: string;
  recommendation: string;
  final: string;
  why: string;
  image?: StoryImage;
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
  clientDisplayName?: string;
  clientPhoto: string | null;
  location: string;
  propertyType: string;
  projectType: string;
  consultationDuration: ConsultationDuration;
  consultationDate: string;
  projectStage: ProjectStage;
  topics: string[];
  indexDecision: string;

  // ── 1. Hero ──
  heroImage?: StoryImage;
  
  // ── 2. Project Snapshot ──
  area?: string;
  snapshotFocus?: string;
  
  // ── 3. Meet the Client ──
  clientIntro?: string; // Who, what, where, stage, achieve, why contacted, decided, unsure
  
  // ── 4. The Project ──
  projectConfig?: string;
  designScope?: string;
  clientRequirement?: string;

  // ── 5. The Problem ──
  theProblemDetail?: string; // Exact specific problem (e.g. Layout wasn't working)

  // ── 6. Before TAAS ──
  beforeImage?: StoryImage;
  beforeSaw?: string;
  beforeUnclear?: string;
  beforeNeededChange?: string;

  // ── 7. The Questions ──
  questions?: QuestionBlock[];

  // ── 8. Consultation Timeline ──
  consultationTimeline: ConsultationStep[];

  // ── 9. Problem -> Solution ──
  whatWeSolved?: ProblemSolution[];

  // ── 10. Design Decisions ──
  designDecisions?: DesignDecision[];

  // ── 11. Final Output ──
  finalDirectionImage?: StoryImage;
  finalDirectionDetails?: string;
  executionScope?: string;

  // ── 12. Client Review ──
  exactQuote: string;

  // ── 13. Gallery ──
  images: StoryImage[];

  // ── 14. Project Outcome ──
  projectOutcome?: string[];
}

const createDraft = (slot: number, category: string, projectType: string, propertyType: string): ClientStory => ({
  slot,
  slug: \`story-\${slot.toString().padStart(2, '0')}\`,
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
    clientName: 'Karan & Priya',
    clientDisplayName: 'Karan & Priya',
    clientPhoto: null,
    location: 'Bandra West',
    propertyType: '3BHK Apartment',
    projectType: 'Layout & Space Planning',
    consultationDuration: '60-min',
    consultationDate: 'August 2026',
    projectStage: 'planning',
    topics: ['LAYOUT', 'KITCHEN', 'STORAGE', 'RESIDENTIAL'],
    indexDecision: 'Conflicting contractor suggestions regarding the kitchen layout and living room circulation.',
    
    heroImage: { src: '/images/stories/01/media_1789181070828.png', caption: 'Living area showing the proposed open configuration.', type: 'hero' },
    
    area: '1,450 sq.ft. carpet',
    snapshotFocus: 'Layout, Circulation & Storage Strategy',
    
    clientIntro: 'Karan and Priya had just purchased a 15-year-old 3BHK apartment in Bandra. They were in the planning stage of a full interior renovation. They wanted to achieve a modern, airy space with maximum hidden storage. They contacted TAAS because they received three completely different layout options from contractors and were unsure which one was actually functional. They had already decided on a minimalist aesthetic, but were unsure about the structural changes needed for the kitchen.',
    
    projectConfig: '3 Bedrooms, 3 Bathrooms, Living + Dining, Enclosed Kitchen.',
    designScope: 'Living Room, Kitchen, and Master Bedroom circulation.',
    clientRequirement: 'They needed complete clarity on whether to break the kitchen wall to create an open plan, and how to place furniture in the irregularly shaped living room without blocking pathways.',
    
    theProblemDetail: 'The core problem wasn\\'t aesthetic; it was structural and functional. The contractor suggested breaking the kitchen wall completely to make the space look bigger. However, this would drastically reduce overhead cabinet space. Furthermore, the proposed furniture layout for the living room placed the TV unit in a way that intersected the main circulation path to the bedrooms, creating a constant traffic bottleneck.',
    
    beforeImage: { src: '/images/stories/01/media_1789181287140.png', caption: 'Existing enclosed kitchen condition with restricted natural light.', type: 'before' },
    beforeSaw: 'A cramped, enclosed kitchen that felt isolated from the rest of the house, and a living room with an awkward dead corner near the entrance.',
    beforeUnclear: 'Whether opening the kitchen would ruin their storage capacity and expose cooking fumes to the living room.',
    beforeNeededChange: 'The fundamental flow of the living room needed to be flipped to avoid the traffic bottleneck, and a middle-ground solution for the kitchen was required.',

    questions: [
      { question: 'Should we break the kitchen wall entirely?', context: 'The contractor recommended it for a modern look, but they were afraid of losing storage and spreading cooking fumes.' },
      { question: 'How do we fit a 6-seater dining table?', context: 'The living room is long but narrow, making standard dining placement awkward.' },
      { question: 'Where should the TV unit go?', context: 'The longest wall seemed obvious, but it blocked the hallway entrance.' }
    ],

    consultationTimeline: [
      { phase: 'understand', content: 'Discussed their daily routine, how often they cook heavy meals, and their entertaining habits.' },
      { phase: 'review', content: 'Reviewed the original floor plan and the three contractor-proposed layouts.' },
      { phase: 'identify', content: 'Identified that the fully open kitchen would reduce storage by 35% and expose the prep area.' },
      { phase: 'analyse', content: 'Evaluated the living room dimensions and mapped the actual walking paths.' },
      { phase: 'recommend', content: 'Recommended flipping the living room orientation and using a semi-open glass partition for the kitchen.' },
      { phase: 'decide', content: 'Client immediately agreed to the flipped layout and the glass partition strategy.' }
    ],

    whatWeSolved: [
      {
        problem: 'The Kitchen Wall Dilemma',
        explanation: 'They wanted an open feel but needed the storage of a closed kitchen.',
        image: { src: '/images/stories/01/media_1789181666121.png', caption: 'Proposed glass partition separating kitchen and dining.', type: 'problem' },
        recommendation: 'Retain the lower half of the wall for base cabinets, and install a sliding fluted glass partition on the top half.',
        why: 'This keeps cooking fumes contained, allows natural light to flow, and preserves crucial counter space.',
        decision: 'They proceeded with the semi-open glass partition.',
        result: 'Gained visual openness without sacrificing 35% of their storage.'
      },
      {
        problem: 'Living Room Circulation',
        explanation: 'The contractor\\'s layout placed the TV on the main wall, forcing anyone walking to the bedrooms to cross the viewing area.',
        recommendation: 'Flip the orientation completely. Place the TV on the opposite wall and use a streamlined 3-seater sofa.',
        why: 'It creates a dedicated, undisturbed viewing zone and a clear, straight corridor to the private spaces.',
        decision: 'Living room orientation was flipped.',
        result: 'Achieved a seamless circulation path and a much cozier seating arrangement.'
      }
    ],

    designDecisions: [
      {
        before: 'A bulky L-shaped sofa blocking the balcony door.',
        recommendation: 'A streamlined 3-seater sofa with two lightweight accent chairs.',
        final: 'Client selected the 3-seater + chairs configuration.',
        why: 'It opened up the circulation path to the balcony and made the room feel visually lighter.',
        image: { src: '/images/stories/01/media_1789183332482.png', caption: 'Furniture layout focusing on circulation.', type: 'decision' }
      }
    ],

    finalDirectionImage: { src: '/images/stories/01/media_1789184486872.png', caption: 'The final layout direction providing clear pathways and natural light.', type: 'final' },
    finalDirectionDetails: 'Karan and Priya finalized their layout in 60 minutes. They abandoned the fully open kitchen idea for a much more practical semi-open glass partition design. They flipped their living room orientation to solve the traffic bottleneck, and opted for a flexible 4-seater dining arrangement instead of forcing a 6-seater into a narrow space. They now had a clear, actionable plan to give to their contractor.',
    executionScope: 'DESIGN DIRECTION PROVIDED · EXECUTION BY CLIENTS CONTRACTOR',

    exactQuote: 'We were running in circles for two weeks with our contractor. In one hour, TAAS showed us why the open kitchen would ruin our storage. Best money we spent before starting the renovation.',

    projectOutcome: [
      'A confirmed kitchen direction (semi-open)',
      'A better understanding of storage vs. aesthetics',
      'A finalized living room layout that prioritized circulation',
      'Confidence to proceed with execution without second-guessing'
    ],

    images: [
      { src: '/images/stories/01/media_1789185555128.png', caption: 'Living area detail showing natural light distribution.', type: 'gallery' },
      { src: '/images/stories/01/media_1789186270337.png', caption: 'Kitchen material palette reviewed during the session.', type: 'gallery' },
      { src: '/images/stories/01/media_1789183393281.png', caption: 'Storage planning for the master bedroom.', type: 'gallery' }
    ]
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

export const PUBLISHED_STORIES = CLIENT_STORIES.filter(s => s.status === 'client-approved' && s.permissionGranted);
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
  identify: 'IDENTIFY',
  challenge: 'CHALLENGE',
  analyse: 'ANALYSE',
  direction: 'RECOMMEND',
  recommend: 'RECOMMEND',
  decide: 'DECIDE',
};
`;

fs.writeFileSync(filePath, newContent);
console.log('Successfully updated data.ts with Story 01 matching the exact real layout and image routes.');
