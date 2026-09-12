const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xreva', 'Desktop', 'app 2 to 3d', 'design-hour', 'src', 'app', 'client-stories', 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

const newSlot1 = `{
    slot: 1,
    slug: 'story-01',
    status: 'client-approved',
    permissionGranted: true,
    feedbackSource: 'whatsapp',
    adminCategory: 'New home layout',
    clientName: '[UI PREVIEW] structural demo',
    clientPhoto: null,
    location: 'Andheri West',
    propertyType: '2BHK Apartment',
    projectType: 'Layout & Space Planning',
    consultationDuration: '60-min',
    consultationDate: 'August 2026',
    projectStage: 'planning',
    topics: ['LAYOUT', 'KITCHEN', 'STORAGE'],
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
      condition: '15-year-old apartment requiring complete civil changes and bathroom rerouting.',
      scope: 'Full interior renovation, civil modifications, new plumbing and electricals.',
    },

    theProblem: {
      notWorking: 'The existing kitchen felt isolated, and the living room had a massive dead corner.',
      considering: 'Breaking down the kitchen wall completely to create an island counter.',
      afraidOf: 'Cooking fumes spreading to the living room, and losing essential wall space for overhead cabinets.',
      whyOutsideOpinion: 'Contractors were pushing for the open kitchen because it looks modern, but the clients wanted an unbiased opinion on practicality.',
    },

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
      layout: {
        originalIdea: 'Place the TV unit on the longest wall and block the natural walkway.',
        issue: 'It forced anyone walking to the bedrooms to cross directly in front of the TV.',
        recommendedDirection: 'Flip the living room orientation. Place the TV on the opposite wall.',
        finalDirection: 'Living room orientation flipped successfully.',
        result: 'Created a dedicated, undisturbed viewing zone and a clear corridor to the private spaces.'
      },
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
  }`;

const replacement = `export const CLIENT_STORIES: ClientStory[] = [
  ${newSlot1},
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
];`;

content = content.replace(/export const CLIENT_STORIES: ClientStory\[\] = \[[\s\S]*?\];/, replacement);

fs.writeFileSync(filePath, content);
console.log('Successfully updated data.ts with a visible structural preview.');
