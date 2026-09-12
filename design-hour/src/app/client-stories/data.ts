// src/app/client-stories/data.ts
// ─────────────────────────────────────────────────────────────────────────────
// TAAS — Client Stories Data
//
// Two story types:
//   'fictionalized' — content created to demonstrate the consultation
//                     experience. Clearly disclosed on the public page.
//   'real'          — actual verified client. Only published when
//                     permissionStatus === 'approved'.
// ─────────────────────────────────────────────────────────────────────────────

export type StoryType        = 'fictionalized' | 'real';
export type PermissionStatus = 'pending' | 'approved' | 'declined';
export type FeedbackSource   = 'google' | 'whatsapp' | 'email' | 'instagram' | 'in-person' | null;
export type Duration         = '30-min' | '60-min' | '90-min';

export interface ProjectImage {
  src:         string;
  caption:     string;
  illustrative?: boolean; // true → show "Illustrative image" label
}

export interface DesignDecision {
  before:        string;
  taasDirection: string;
  finalDecision: string;
}

export interface ClientStory {
  slug:            string;
  slot:            number;
  storyType:       StoryType;
  permissionStatus: PermissionStatus; // only relevant for 'real' stories
  published:       boolean;

  // ── Identity ──────────────────────────────────────────────────────────────
  clientName:        string | null;
  clientDisplayName: string | null;
  location:          string | null;
  propertyType:      string | null;
  projectType:       string | null; // 'Residential' | 'Commercial' | etc.
  area:              string | null;
  consultationDate:  string | null;
  consultationDuration: Duration;

  // ── Story content ──────────────────────────────────────────────────────────
  topics:          string[];       // e.g. ['LAYOUT', 'KITCHEN']
  indexHeadline:   string;         // Large editorial headline for index + detail
  situation:       string | null;  // 2–4 paras, \n\n separated
  whatUnsureAbout: string | null;  // What were they uncertain about
  whatTheyAsked:   string | null;  // What they brought to TAAS
  taasLookedAt:    string[];       // Ordered checklist
  recommendation:  string | null;  // What TAAS recommended
  designDecisions: DesignDecision[];
  clientPerspective: string | null; // Client's words (real) or fictionalized perspective
  outcomes:        string[];        // What changed, bullet list

  // ── Media ─────────────────────────────────────────────────────────────────
  heroImage:     ProjectImage | null;
  projectImages: ProjectImage[];
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
export function padSlot(n: number) { return String(n).padStart(2, '0'); }

export const DURATION_LABELS: Record<Duration, string> = {
  '30-min': '30 Min — Quick Clarity',
  '60-min': '60 Min — Deep Decision',
  '90-min': '90 Min — Complex Space',
};

// ─────────────────────────────────────────────────────────────────────────────
// FICTIONALIZED STORIES (1–5)
// Clearly disclosed as fictionalized on the public page.
// ─────────────────────────────────────────────────────────────────────────────
const ILLUSTRATIVE_NOTE = 'Illustrative image — fictionalized client story.';

export const CLIENT_STORIES: ClientStory[] = [

  /* ── 01 — Rohan Mehta ───────────────────────────────────────────────────── */
  {
    slug:    'story-01',
    slot:    1,
    storyType: 'fictionalized',
    permissionStatus: 'approved',
    published: true,

    clientName:        'Rohan Mehta',
    clientDisplayName: 'Rohan Mehta',
    location:          'Andheri West, Mumbai',
    propertyType:      '2 BHK Apartment',
    projectType:       'Residential',
    area:              null,
    consultationDate:  null,
    consultationDuration: '60-min',

    topics: ['LAYOUT', 'STORAGE'],

    indexHeadline: 'The Layout That Looked Fine — Until We Walked Through It.',

    situation: `Rohan and his family had collected several furniture and interior references but couldn't determine whether their proposed layout would work comfortably in everyday life. Everything looked right on paper, but no one had actually walked through the sequence — from the entrance to the kitchen, to the bedrooms, to the balcony.\n\nThey wanted to begin execution but were hesitant. A contractor had suggested one arrangement; a family member had suggested another. They needed someone without a stake in either direction to assess it properly.`,

    whatUnsureAbout: 'Whether the proposed furniture arrangement would create enough circulation space, and whether the storage they had planned was genuinely practical or just visually filling the walls.',

    whatTheyAsked: 'We knew what we wanted. We just weren\'t sure if the layout was right.',

    taasLookedAt: [
      'Furniture circulation paths from every entry point',
      'TV unit placement relative to seating and natural light',
      'Sofa proportions and distance from the television',
      'Wardrobe depth in the master bedroom relative to available floor area',
      'Kitchen storage zones and access logic',
    ],

    recommendation: `The living room arrangement was creating a visual block near the entrance — the first thing you\'d walk into was the back of the sofa. Rotating the seating by 90 degrees opened up the entry and created a clear circulation path to the balcony.\n\nThe storage wasn\'t insufficient — it was misallocated. Items used every day were being stored in the most inaccessible spots, while rarely-used items occupied the easiest-to-reach shelves. Reorganising the storage logic, not adding more storage, was the direction.`,

    designDecisions: [
      {
        before:        'Sofa placed along the main wall, blocking the entrance sightline.',
        taasDirection: 'Rotate seating 90°, place the sofa along the shorter wall to open the entrance.',
        finalDecision: 'Client proceeded with the rotated arrangement, creating a visible improvement in perceived space.',
      },
      {
        before:        'Wardrobe depth planned at 24 inches — leaving very little circulation in the master bedroom.',
        taasDirection: 'Reduce wardrobe depth to 18 inches, which is sufficient for clothes without compromising movement.',
        finalDecision: 'Client revised the wardrobe specification before placing the order.',
      },
    ],

    clientPerspective: 'We kept second-guessing ourselves. In one session, we finally had clarity. The layout we had wasn\'t wrong — it just needed a small adjustment that no one had pointed out.',

    outcomes: [
      'Living room layout revised before execution began',
      'Sofa orientation corrected — entry and circulation improved',
      'Wardrobe depth adjusted — bedroom space improved',
      'Storage allocation simplified without adding extra units',
      'Client could proceed with execution with clear direction',
    ],

    heroImage: {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Living room layout — illustrative',
      illustrative: true,
    },
    projectImages: [
      { src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80', caption: 'Seating arrangement study', illustrative: true },
      { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', caption: 'Storage planning direction', illustrative: true },
    ],
  },

  /* ── 02 — Priya Shah ────────────────────────────────────────────────────── */
  {
    slug:    'story-02',
    slot:    2,
    storyType: 'fictionalized',
    permissionStatus: 'approved',
    published: true,

    clientName:        'Priya Shah',
    clientDisplayName: 'Priya Shah',
    location:          'Bandra West, Mumbai',
    propertyType:      '3 BHK Apartment',
    projectType:       'Residential',
    area:              null,
    consultationDate:  null,
    consultationDuration: '60-min',

    topics: ['KITCHEN', 'STORAGE'],

    indexHeadline: 'The Kitchen Had Storage. It Just Wasn\'t the Right Storage.',

    situation: `Priya\'s kitchen had multiple cabinets planned. The contractor had proposed units along every available wall, and on paper, the storage count looked impressive. But the layout was becoming visually heavy, and several everyday items — pressure cooker, spice jars, cutting boards — still had no practical, accessible place.\n\nPriya had a very specific cooking style and used a predictable set of items every day. The storage had been designed for a theoretical kitchen, not her actual kitchen.`,

    whatUnsureAbout: 'Whether the cabinet layout made sense for how she actually cooked, and whether adding more cabinets would solve the problem or make it worse.',

    whatTheyAsked: 'The kitchen had storage. It just wasn\'t the right storage.',

    taasLookedAt: [
      'Kitchen workflow from preparation to cooking to plating',
      'Appliance placement relative to electrical points and counter usage',
      'Daily-use item accessibility in the current cabinet plan',
      'Corner cabinet usage and whether carousels were actually practical',
      'Bottle and spice storage logic relative to the hob',
    ],

    recommendation: `The problem was not the quantity of storage but the organisation principle behind it. The cabinet layout had been planned top-down — filling the walls — instead of starting from usage patterns.\n\nPrioritising frequently-used items at the most accessible height (roughly waist to shoulder level), moving rarely-used appliances to upper cabinets, and reorganising spice storage to be directly adjacent to the hob reduced the number of cabinets required while making the kitchen significantly more practical.`,

    designDecisions: [
      {
        before:        'Corner unit with a full carousel — expensive and rarely as practical as expected.',
        taasDirection: 'Replace corner carousel with a simple L-shaped pull-out and use the corner for stored-but-rarely-used items.',
        finalDecision: 'Client removed the carousel specification and simplified the corner unit.',
      },
      {
        before:        'All cabinets at full height from floor to ceiling — visually heavy.',
        taasDirection: 'Leave the area above the refrigerator open or use a simple shelf rather than a dedicated cabinet.',
        finalDecision: 'Client reduced ceiling height cabinetry to two zones only, simplifying the visual weight.',
      },
    ],

    clientPerspective: 'I had more cabinets than I knew what to do with, but my masala dabba was still going to live on the counter because there was nowhere logical for it. After the session, I rethought the whole thing from how I actually cook.',

    outcomes: [
      'Kitchen layout simplified before manufacturing began',
      'Corner carousel removed — simpler and more cost-effective',
      'Daily-use items repositioned to the most accessible height zone',
      'Visual weight of cabinetry reduced',
      'Client could proceed with the modular kitchen vendor with clear changes',
    ],

    heroImage: {
      src: '/images/client-stories/story-02-hero.jpg',
      caption: 'Kitchen planning — illustrative',
      illustrative: true,
    },
    projectImages: [
      { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', caption: 'Kitchen workflow direction', illustrative: true },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80', caption: 'Storage organisation study', illustrative: true },
    ],
  },

  /* ── 03 — Aarav & Neha Kulkarni ─────────────────────────────────────────── */
  {
    slug:    'story-03',
    slot:    3,
    storyType: 'fictionalized',
    permissionStatus: 'approved',
    published: true,

    clientName:        'Aarav & Neha Kulkarni',
    clientDisplayName: 'Aarav & Neha Kulkarni',
    location:          'Powai, Mumbai',
    propertyType:      '2 BHK Apartment',
    projectType:       'Residential',
    area:              null,
    consultationDate:  null,
    consultationDuration: '60-min',

    topics: ['MATERIALS', 'DIRECTION'],

    indexHeadline: 'We Had Saved 200 References and Still Couldn\'t Choose a Direction.',

    situation: `Aarav and Neha had been planning their apartment for several months. They had folders of references saved from Instagram, Pinterest and design websites. They knew what they liked individually. The problem was that every room was starting to look like a different apartment — a Japandi living room, a mid-century bedroom, a very modern kitchen.\n\nThey weren\'t confused about taste. They were confused about how to connect their preferences into one coherent home.`,

    whatUnsureAbout: 'Whether the references they\'d collected could actually be combined into a single design language, and how to decide between the many material options their contractor was presenting.',

    whatTheyAsked: 'We had saved 200 references and still couldn\'t choose a direction.',

    taasLookedAt: [
      'The collected reference images — identifying the common threads',
      'Colour palette compatibility across all rooms',
      'Material finish combinations and whether they worked together',
      'Furniture style consistency between living, dining and bedroom',
      'Lighting direction and how it would interact with the chosen materials',
    ],

    recommendation: `Looking at the references together, there was actually a clear underlying preference — warm tones, natural textures and low visual clutter. The confusion came from not filtering out the outliers before showing them to the contractor.\n\nThe direction: one dominant neutral, one texture material (wood or stone, not both), and one accent. Eliminate references that didn\'t fit this language before the next vendor meeting.`,

    designDecisions: [
      {
        before:        'Two different wood finishes proposed — oak veneer in the living room and walnut laminate in the bedroom.',
        taasDirection: 'Standardise on one wood tone across the apartment to create visual continuity.',
        finalDecision: 'Client standardised on oak across all rooms and removed the walnut specification.',
      },
      {
        before:        'Four different tile options shortlisted for the bathrooms — all slightly different.',
        taasDirection: 'Choose one tile style and vary only the format (size), not the colour or finish.',
        finalDecision: 'Client selected one tile design and used two different sizes across the two bathrooms.',
      },
    ],

    clientPerspective: 'We thought we had too many ideas. Turns out we had one idea and a lot of noise around it. The session helped us filter very quickly.',

    outcomes: [
      'Material palette narrowed from multiple conflicting options to a single coherent direction',
      'Wood finish standardised across all rooms',
      'Tile selection simplified',
      'Vendor meetings became significantly faster after the session',
      'Client could communicate design requirements clearly to contractors',
    ],

    heroImage: {
      src: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Material direction study — illustrative',
      illustrative: true,
    },
    projectImages: [
      { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80', caption: 'Palette exploration', illustrative: true },
      { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', caption: 'Material continuity study', illustrative: true },
    ],
  },

  /* ── 04 — Karan Desai ───────────────────────────────────────────────────── */
  {
    slug:    'story-04',
    slot:    4,
    storyType: 'fictionalized',
    permissionStatus: 'approved',
    published: true,

    clientName:        'Karan Desai',
    clientDisplayName: 'Karan Desai',
    location:          'Lower Parel, Mumbai',
    propertyType:      'Commercial Office',
    projectType:       'Commercial',
    area:              null,
    consultationDate:  null,
    consultationDuration: '60-min',

    topics: ['PLANNING', 'WORKSTATIONS'],

    indexHeadline: 'The Office Was Ready to Build. The Layout Wasn\'t.',

    situation: `The team had shortlisted a contractor and was moving toward execution. The workstation layout had been drawn, the meeting room had been positioned, and the budget had been allocated. Then someone asked a simple question at the review meeting: how do people actually move through this office?\n\nNo one had a confident answer. The layout worked on paper — the desks fit, the meeting room fit. But the circulation pattern between the entrance, the workstations, the meeting room and the pantry had never been properly examined.`,

    whatUnsureAbout: 'Whether the proposed workstation arrangement would create problems once people were actually working in the space, and whether the meeting room placement was appropriate.',

    whatTheyAsked: 'The office was ready to build. We just wanted someone to confirm the layout before we committed.',

    taasLookedAt: [
      'Entry and exit movement patterns across the full day',
      'Workstation arrangement relative to natural light and HVAC positioning',
      'Meeting room placement and whether it created a noise problem for adjacent workstations',
      'Storage and printer placement relative to the people who use them most',
      'Emergency circulation compliance',
    ],

    recommendation: `The meeting room placement was creating a noise concern — it shared a full-height partition with the quietest workstation zone. Moving the meeting room to the other side of the floor plan, adjacent to the reception, solved both the noise problem and improved the logic of how guests moved through the space.\n\nThe workstation rows were also creating a long, dead corridor. Offsetting alternate rows by a metre broke up the monotony and improved the feeling of space without changing the desk count.\n\nNote: TAAS provided planning direction only. Execution was handled by the client\'s own contractor.`,

    designDecisions: [
      {
        before:        'Meeting room placed in the quietest corner — shared wall with focus workstations.',
        taasDirection: 'Move the meeting room adjacent to reception — guests don\'t enter the main floor, and noise is separated from focus zones.',
        finalDecision: 'Client revised the floor plan before construction began.',
      },
      {
        before:        'All workstation rows aligned in the same direction — long visual corridor, institutional feel.',
        taasDirection: 'Offset alternate rows by 1 metre and add one shared collaboration table in the space created.',
        finalDecision: 'Client incorporated the offset and added a standing collaboration counter.',
      },
    ],

    clientPerspective: 'The layout looked fine on the plan. It\'s only when someone asked about actual movement through the office that we realised nobody had actually walked through it in their head. That\'s exactly what the session did.',

    outcomes: [
      'Meeting room repositioned before construction — noise issue avoided',
      'Workstation arrangement improved for better circulation and atmosphere',
      'Collaboration space added without increasing the desk count',
      'Floor plan revised before any work began',
      'Client proceeded with contractor with a corrected plan',
    ],

    heroImage: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Office planning — illustrative',
      illustrative: true,
    },
    projectImages: [
      { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', caption: 'Workstation arrangement study', illustrative: true },
      { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', caption: 'Meeting room placement review', illustrative: true },
    ],
  },

  /* ── 05 — Ananya Iyer ───────────────────────────────────────────────────── */
  {
    slug:    'story-05',
    slot:    5,
    storyType: 'fictionalized',
    permissionStatus: 'approved',
    published: true,

    clientName:        'Ananya Iyer',
    clientDisplayName: 'Ananya Iyer',
    location:          'Juhu, Mumbai',
    propertyType:      '3 BHK Apartment',
    projectType:       'Residential',
    area:              null,
    consultationDate:  null,
    consultationDuration: '60-min',

    topics: ['SECOND OPINION', 'MATERIALS'],

    indexHeadline: 'We Didn\'t Need a New Design. We Needed a Second Opinion.',

    situation: `Ananya had already engaged an interior designer and had received a detailed proposal. The overall design was strong — she liked the direction. But there were several specific decisions she was uncertain about: a flooring material that looked beautiful in the sample but that she\'d heard was difficult to maintain, a furniture piece her designer loved that she wasn\'t sure about, and an overall question of whether the budget allocation made sense.\n\nShe didn\'t want to challenge her designer. She wanted an independent perspective from someone who had no stake in the proposal.`,

    whatUnsureAbout: 'Whether to trust the designer\'s recommendations on the materials she was uncertain about, and whether the budget was being allocated to the right places.',

    whatTheyAsked: 'I don\'t want to change the design. I just want someone to tell me which parts are right and which parts I should push back on.',

    taasLookedAt: [
      'The existing design proposal — reviewing the overall direction',
      'The flooring material specification and its practical implications',
      'The furniture scale relative to the room dimensions',
      'Budget allocation across the different areas of the apartment',
      'The areas where the proposal could be simplified without losing the design intent',
    ],

    recommendation: `The overall design direction was sound. The flooring material concern was valid — for that household (with a young child and a dog), the proposed material would require more maintenance than the designer had suggested. An alternative with the same visual character but better durability was recommended.\n\nThe furniture piece the designer had specified was slightly oversized for the room — the client\'s instinct was correct. The rest of the proposal was solid.\n\nOn budget, the recommendation was to shift approximately 15% from the decorative lighting budget (which had multiple statement pieces) to the storage, which had been underspecified.`,

    designDecisions: [
      {
        before:        'High-polish marble flooring — beautiful, but requires sealing and careful maintenance with young children.',
        taasDirection: 'Switch to a large-format matte porcelain tile with a marble-look finish — same aesthetic, significantly easier to maintain.',
        finalDecision: 'Client discussed the change with her designer, who agreed. Specification was revised.',
      },
      {
        before:        'A statement sofa specified at 3.2 metres — slightly oversized for the room.',
        taasDirection: 'Use the same sofa at 2.8 metres — the visual impact is preserved without losing circulation space.',
        finalDecision: 'Client requested the revised specification. Designer confirmed the adjustment was possible.',
      },
    ],

    clientPerspective: 'I felt uncomfortable raising concerns with my designer because I thought I was being difficult. This session gave me the language and the confidence to have that conversation. It wasn\'t about changing the design — it was about making a few specific things work better.',

    outcomes: [
      'Flooring specification changed to a more practical material',
      'Furniture scale corrected before the order was placed',
      'Budget reallocation — decorative lighting reduced, storage increased',
      'Client could have a specific, informed conversation with her designer',
      'No significant changes to the design direction — just the right adjustments',
    ],

    heroImage: {
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      caption: 'Second opinion review — illustrative',
      illustrative: true,
    },
    projectImages: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Material comparison study', illustrative: true },
      { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80', caption: 'Furniture scale review', illustrative: true },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export const TOTAL_SLOTS       = CLIENT_STORIES.length;
export const PUBLISHED_STORIES = CLIENT_STORIES.filter(s => s.published);
