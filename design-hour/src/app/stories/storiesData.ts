// src/app/stories/storiesData.ts
// ADMIN NOTE: Each story has a `verified` field.
// Only stories where verified: true will be shown publicly.
// Stories where verified: false render nothing on the public page.
// To add a real client story, fill all fields and set verified: true.

export interface ClientStory {
  id: string;
  verified: boolean;
  permissionGranted: boolean;
  source: 'google' | 'whatsapp' | 'email' | 'instagram' | 'in-person' | null;
  name: string;
  location: string;
  projectType: string;
  date: string;
  // Story content
  theDecision: string;
  theProblem: string;
  theConsultation: string;
  theOutcome: string;
  exactQuote: string;
  // Media — use null if not available, never fabricate
  clientPhoto: string | null;
  projectPhoto: string | null;
  // Layout hint
  imageAlt: string;
}

// ─────────────────────────────────────────────────────────
// ADD REAL CLIENT STORIES BELOW
// Set verified: true only when you have the client's permission
// and you have their exact words and real information.
// ─────────────────────────────────────────────────────────
export const CLIENT_STORIES: ClientStory[] = [
  // PLACEHOLDER — replace with real client data when available
  // {
  //   id: "client-001",
  //   verified: true,
  //   permissionGranted: true,
  //   source: "whatsapp",
  //   name: "Ananya S.",
  //   location: "Bandra West",
  //   projectType: "2BHK Renovation",
  //   date: "August 2026",
  //   theDecision: "Whether to go with a local contractor's layout or hire an interior designer before the renovation started.",
  //   theProblem: "She had already spoken to three contractors who gave completely different estimates and layouts. She didn't know which one was actually right for her space.",
  //   theConsultation: "We walked through her floor plan together, discussed the functional problems she was trying to solve — not just the aesthetics — and helped her understand what questions to ask each contractor.",
  //   theOutcome: "She came out with a clear set of requirements, a shortlist of things she actually needed vs. things she was being upsold on, and went back to negotiate with the contractors herself.",
  //   exactQuote: "I came in confused about whose advice to trust. I left knowing exactly what I actually needed.",
  //   clientPhoto: null,
  //   projectPhoto: null,
  //   imageAlt: "2BHK renovation project, Bandra West",
  // },
];

// ─────────────────────────────────────────────────────────
// VERIFIED STORIES ONLY — this is what the public sees
// ─────────────────────────────────────────────────────────
export const VERIFIED_STORIES = CLIENT_STORIES.filter(
  (s) => s.verified && s.permissionGranted
);
