const PDFDocument = require('pdfkit');
const fs = require('fs');

// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_LEFT   = 64;
const MARGIN_RIGHT  = 64;
const MARGIN_TOP    = 64;
const MARGIN_BOTTOM = 64;
const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;

const COLOR = {
  black:    '#111111',
  dark:     '#222222',
  mid:      '#555555',
  light:    '#888888',
  rule:     '#DDDDDD',
  bg:       '#F7F7F5',
  white:    '#FFFFFF',
};

// ─── DOCUMENT ─────────────────────────────────────────────────────────────
const doc = new PDFDocument({
  size: 'A4',
  margin: 0,        // we control all margins manually
  bufferPages: true,
  info: {
    Title:    'Before You Build — THINKFORM Strategic Framework',
    Author:   'THINKFORM',
    Subject:  'A strategic framework for business ideas',
    Keywords: 'business, strategy, ideas, entrepreneurship',
  },
});

doc.pipe(fs.createWriteStream('public/thinkform-strategic-framework.pdf'));

// ─── HELPERS ───────────────────────────────────────────────────────────────

// Returns current cursor Y, clamped to content area start
let cursorY = MARGIN_TOP;

function resetCursor() { cursorY = MARGIN_TOP; }
function moveDown(lines = 1) { cursorY += lines * 18; }

// Draw horizontal rule
function rule(y, color = COLOR.rule, thickness = 0.5) {
  doc.save()
     .moveTo(MARGIN_LEFT, y)
     .lineTo(PAGE_W - MARGIN_RIGHT, y)
     .lineWidth(thickness)
     .strokeColor(color)
     .stroke()
     .restore();
}

// Draw footer: page number + brand
function drawFooter(pageNum) {
  const y = PAGE_H - 40;
  rule(y - 12, COLOR.rule, 0.5);
  doc.fontSize(8)
     .fillColor(COLOR.light)
     .font('Helvetica')
     .text('THINKFORM', MARGIN_LEFT, y, { lineBreak: false })
     .text(`${pageNum}`, PAGE_W - MARGIN_RIGHT - 20, y, { lineBreak: false, align: 'right' });
}

// Write a label like "Chapter 01"
function label(text, y) {
  doc.fontSize(8)
     .fillColor(COLOR.light)
     .font('Helvetica-Bold')
     .text(text.toUpperCase(), MARGIN_LEFT, y, { characterSpacing: 2, width: CONTENT_W });
  return y + 18;
}

// Chapter heading
function heading(text, y, size = 28) {
  doc.fontSize(size)
     .fillColor(COLOR.black)
     .font('Helvetica-Bold')
     .text(text, MARGIN_LEFT, y, { width: CONTENT_W, lineGap: 3 });
  const h = doc.heightOfString(text, { width: CONTENT_W, lineGap: 3, fontSize: size });
  return y + h + 12;
}

// Body paragraph
function body(text, y) {
  doc.fontSize(11)
     .fillColor(COLOR.mid)
     .font('Helvetica')
     .text(text, MARGIN_LEFT, y, { width: CONTENT_W, lineGap: 5 });
  const h = doc.heightOfString(text, { width: CONTENT_W, lineGap: 5, fontSize: 11 });
  return y + h + 14;
}

// Bullet point
function bullet(text, y) {
  const arrowX = MARGIN_LEFT;
  const textX  = MARGIN_LEFT + 22;
  const textW  = CONTENT_W - 22;
  doc.fontSize(11).fillColor(COLOR.mid).font('Helvetica')
     .text('→', arrowX, y, { width: 16 });
  doc.fontSize(11).fillColor(COLOR.mid).font('Helvetica')
     .text(text, textX, y, { width: textW, lineGap: 4 });
  const h = doc.heightOfString(text, { width: textW, lineGap: 4, fontSize: 11 });
  return y + h + 8;
}

// Pull quote / highlight box
function quoteBox(text, y) {
  const boxH = doc.heightOfString(text, { width: CONTENT_W - 40, fontSize: 13, lineGap: 5 }) + 36;
  // background
  doc.rect(MARGIN_LEFT, y, CONTENT_W, boxH).fill(COLOR.bg);
  // left accent bar
  doc.rect(MARGIN_LEFT, y, 3, boxH).fill(COLOR.black);
  // text
  doc.fontSize(13).fillColor(COLOR.black).font('Helvetica-Bold')
     .text(text, MARGIN_LEFT + 20, y + 18, { width: CONTENT_W - 40, lineGap: 5 });
  return y + boxH + 16;
}

// Exercise box with dashed-style border
function exerciseBox(title, text, y) {
  const innerW = CONTENT_W - 48;
  const textH  = doc.heightOfString(text, { width: innerW, fontSize: 10.5, lineGap: 5 });
  const boxH   = 14 + 18 + 10 + textH + 20;
  doc.rect(MARGIN_LEFT, y, CONTENT_W, boxH)
     .lineWidth(1)
     .strokeColor(COLOR.rule)
     .stroke();
  // tiny label
  doc.fontSize(7.5).fillColor(COLOR.light).font('Helvetica-Bold')
     .text('EXERCISE', MARGIN_LEFT + 20, y + 14, { characterSpacing: 2 });
  // title
  doc.fontSize(11).fillColor(COLOR.dark).font('Helvetica-Bold')
     .text(title, MARGIN_LEFT + 20, y + 30, { width: innerW });
  // body
  doc.fontSize(10.5).fillColor(COLOR.mid).font('Helvetica')
     .text(text, MARGIN_LEFT + 20, y + 30 + 18, { width: innerW, lineGap: 5 });
  return y + boxH + 20;
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────
doc.rect(0, 0, PAGE_W, PAGE_H).fill(COLOR.black);

// Brand top-left
doc.fontSize(9).fillColor(COLOR.light).font('Helvetica-Bold')
   .text('THINKFORM', MARGIN_LEFT, MARGIN_TOP, { characterSpacing: 3 });

// Top rule
doc.moveTo(MARGIN_LEFT, MARGIN_TOP + 28)
   .lineTo(PAGE_W - MARGIN_RIGHT, MARGIN_TOP + 28)
   .lineWidth(0.5).strokeColor('#333333').stroke();

// Title
doc.fontSize(58).fillColor(COLOR.white).font('Helvetica-Bold')
   .text('Before\nYou Build.', MARGIN_LEFT, 180, { width: 420, lineGap: 6 });

// Subtitle
doc.fontSize(14).fillColor('#999999').font('Helvetica')
   .text(
     'A strategic framework for people who have a business idea\nbut don\'t know what to do with it yet.',
     MARGIN_LEFT, 360, { width: 400, lineGap: 7 }
   );

// Bottom accent
doc.moveTo(MARGIN_LEFT, 490)
   .lineTo(MARGIN_LEFT + 48, 490)
   .lineWidth(1.5).strokeColor('#444444').stroke();

doc.fontSize(9).fillColor('#666666').font('Helvetica')
   .text('A gift from THINKFORM', MARGIN_LEFT, 506);

// Bottom bar
doc.rect(0, PAGE_H - 56, PAGE_W, 56).fill('#1a1a1a');
doc.fontSize(9).fillColor('#666666').font('Helvetica')
   .text('thinkform.studio', MARGIN_LEFT, PAGE_H - 36);

// ─── TABLE OF CONTENTS ───────────────────────────────────────────────────────
doc.addPage();
drawFooter(1);
resetCursor();

cursorY = MARGIN_TOP;
doc.fontSize(9).fillColor(COLOR.light).font('Helvetica-Bold')
   .text('CONTENTS', MARGIN_LEFT, cursorY, { characterSpacing: 2 });
cursorY += 28;

rule(cursorY, COLOR.rule); cursorY += 20;

const toc = [
  ['01', 'Why Most People Get Stuck'],
  ['02', 'How to Look at Your Idea Honestly'],
  ['03', 'Your Unfair Advantages'],
  ['04', 'The Angle Nobody Noticed'],
  ['05', 'Why You Should Charge More'],
  ['06', 'The Difference Between a Product and a Business'],
  ['07', 'Your Clear Next Move'],
];

toc.forEach(([num, title], i) => {
  const pg = i + 3;
  doc.fontSize(10).fillColor(COLOR.light).font('Helvetica-Bold')
     .text(num, MARGIN_LEFT, cursorY, { width: 28 });
  doc.fontSize(12).fillColor(COLOR.black).font('Helvetica-Bold')
     .text(title, MARGIN_LEFT + 32, cursorY, { width: CONTENT_W - 50, lineBreak: false });
  doc.fontSize(10).fillColor(COLOR.light).font('Helvetica')
     .text(`${pg}`, PAGE_W - MARGIN_RIGHT - 24, cursorY);
  cursorY += 28;
  rule(cursorY - 6, COLOR.rule, 0.3);
});

// ─── INTRODUCTION ────────────────────────────────────────────────────────────
doc.addPage();
drawFooter(2);

let y = MARGIN_TOP;
y = label('Introduction', y); y += 6;
y = heading('Why this guide exists.', y);

y = body(
  'Most people with a business idea spend months going around in circles. They overthink the logo, argue with themselves about whether the idea is good enough, watch YouTube videos about entrepreneurship, and never actually do anything.',
  y
);
y = body(
  'This guide is not about motivation. It is not a step-by-step business plan template. It is a thinking framework — a set of questions and perspectives to help you look at your idea clearly and figure out the most direct path forward.',
  y
);
y = body('You don\'t need to read this in order. Jump to whatever is blocking you right now.', y);

y += 8;
rule(y, COLOR.rule); y += 24;

y = quoteBox('"The most expensive thing you can do is build the wrong thing."', y);

doc.fontSize(9).fillColor(COLOR.light).font('Helvetica')
   .text('— THINKFORM', MARGIN_LEFT, y);

// ─── CHAPTER PAGES ────────────────────────────────────────────────────────────
const chapters = [
  {
    num: '01',
    title: 'Why most people get stuck.',
    intro: 'Getting stuck is almost never about the idea being bad. It is almost always about one of these three things:',
    bullets: [
      'You are waiting to feel ready before you start.',
      'You are trying to figure out everything before doing anything.',
      'You are comparing your beginning to someone else\'s middle.',
    ],
    body: [
      'The people who move fastest are not the ones with better ideas. They are the ones willing to think through uncomfortable questions early.',
      'The uncomfortable questions are things like: Who actually pays for this? Why would someone choose me over the existing options? What happens if it doesn\'t work after six months?',
      'Sitting with those questions is how you find the real shape of your idea.',
    ],
    exercise: {
      title: 'Write down your idea in one sentence.',
      text: 'Not a paragraph. One sentence. If you can\'t do it, the idea needs more clarity before anything else. Keep rewriting until it fits in one line.',
    }
  },
  {
    num: '02',
    title: 'How to look at your idea honestly.',
    intro: 'Most people only ask: "Could this work?" That is the wrong first question. The better question is: "What would have to be true for this to work?"',
    bullets: [
      'Market lens — Is there evidence that people already spend money on something similar?',
      'Execution lens — Can you actually deliver this, given your current skills and resources?',
      'Timing lens — Is this the right moment, or are you too early or too late?',
    ],
    body: [
      'Once you answer "what would have to be true," you can figure out which of those things are already true, which ones you can make true, and which ones are actually impossible in your specific situation.',
      'You do not need a perfect score on all three lenses. But you need to be honest about where the gaps are, so you can decide whether they are fixable or fatal.',
    ],
    exercise: {
      title: 'Write down the three biggest risks in your idea.',
      text: 'Not the small operational risks. The ones that, if true, would make the entire thing not worth doing. Name them. Most problems shrink when you write them down clearly.',
    }
  },
  {
    num: '03',
    title: 'Your unfair advantages.',
    intro: 'An unfair advantage is something that gives you a real, durable edge that a generic competitor cannot easily copy.',
    bullets: [
      'Deep domain knowledge from a specific industry or career.',
      'A specific community, network, or audience that already trusts you.',
      'A technology, process, or system you have already built.',
      'A personal story or experience that creates authentic authority.',
      'Geographic or cultural access to a market others don\'t understand.',
    ],
    body: [
      'If your business idea does not connect to at least one genuine unfair advantage, you are playing on hard mode unnecessarily.',
      'The goal is not to compete everywhere. The goal is to find the arena where you are the obvious, natural choice.',
    ],
    exercise: {
      title: 'List your top 3 unfair advantages.',
      text: 'Be specific. Not "I am hardworking" — that is not an advantage. "I spent 8 years in pharmaceutical supply chain and know exactly where the fraud happens" — that is an advantage.',
    }
  },
  {
    num: '04',
    title: 'The angle nobody noticed.',
    intro: 'Your idea doesn\'t need to be original. Most successful businesses take something that already exists and reposition it for a specific, underserved audience.',
    bullets: [
      'Who is being ignored or poorly served by the current options?',
      'What does the market get wrong about what this customer actually wants?',
      'What constraint does everyone in this space accept that you could remove?',
      'What could you make 10x better, faster, or more personal?',
    ],
    body: [
      'The angle is not what you sell — it is how you are seen.',
      'The best angles are usually hiding in plain sight. They are in the complaints in one-star reviews, in what frontline workers complain about to each other, in what insiders dismiss as "just how things work."',
    ],
    exercise: {
      title: 'Read 50 one-star reviews of your closest competitor.',
      text: 'Write down every complaint that appears more than three times. That recurring list is your product roadmap.',
    }
  },
  {
    num: '05',
    title: 'Why you should charge more.',
    intro: 'Almost every first-time builder undercharges. Not slightly. Dramatically. When you charge too little:',
    bullets: [
      'You attract price-sensitive customers who are harder to retain.',
      'You need too many clients just to cover your costs.',
      'You have no margin to invest in improving your service.',
      'Customers often assume quality matches the price.',
    ],
    body: [
      'Premium pricing is not about being expensive. It is about being clearly positioned.',
      'When you charge a premium, you implicitly claim the quality and specificity of your offer. That claim filters your customers for you — attracting people who value outcomes over cost.',
    ],
    exercise: {
      title: 'Find the most expensive competitor in your space.',
      text: 'Study exactly how they talk about themselves. Not to copy — but to understand what signals justify a premium in your specific market and audience.',
    }
  },
  {
    num: '06',
    title: 'The difference between a product and a business.',
    intro: 'A product is something you make and sell. A business is a system that makes and sells things repeatedly, with increasing efficiency over time.',
    bullets: [
      'How do new customers find you without you personally spending time on each one?',
      'What makes a customer come back, or refer a friend, without you prompting them?',
      'What part of your delivery can be systematised, so it doesn\'t require all of your personal time?',
    ],
    body: [
      'Many people build a product and then wonder why they are exhausted. The product works. Customers are happy. But every month feels like starting from zero.',
      'This happens because they built a product without building a business around it. You don\'t need to solve all of this on day one. But you need to know these questions exist and be working toward them.',
    ],
    exercise: {
      title: 'Write down one thing in your business that requires your personal time every time.',
      text: 'Now write down one thing you could do this month to reduce your personal involvement in that one thing by 50%. Start there.',
    }
  },
  {
    num: '07',
    title: 'Your clear next move.',
    intro: 'After working through this framework, most people have more clarity — but still feel the pull toward "more research." This is a trap. Here is the next move based on where you are:',
    bullets: [
      'If your idea is still vague — Rewrite the one-sentence version until it is sharp.',
      'If you are not sure it is viable — Find 5 people who would plausibly pay for it and talk to them honestly.',
      'If you are ready to test — Launch the smallest possible version within 30 days.',
      'If you are already running and stuck — Find the one constraint limiting everything else and fix only that.',
    ],
    body: [
      'The common thread is specificity. Vague goals produce vague results.',
      'Pick one concrete next step and do it before you read another guide, watch another video, or have another planning session.',
    ],
    exercise: {
      title: 'Write down your ONE next action.',
      text: 'Not a list of things. One action. With a specific deadline. That is it. The framework has done its job.',
    }
  },
];

chapters.forEach((ch, idx) => {
  doc.addPage();
  drawFooter(idx + 3);

  let y = MARGIN_TOP;

  // Chapter number strip
  doc.fontSize(9).fillColor(COLOR.light).font('Helvetica-Bold')
     .text(`CHAPTER  ${ch.num}`, MARGIN_LEFT, y, { characterSpacing: 2 });
  y += 20;
  rule(y, COLOR.black, 1.5); y += 20;

  y = heading(ch.title, y, 26);
  y += 4;

  // Intro
  y = body(ch.intro, y);

  // Bullets
  ch.bullets.forEach(b => { y = bullet(b, y); });
  y += 6;

  // Body paragraphs
  ch.body.forEach(p => { y = body(p, y); });

  // Rule before exercise
  y += 8;
  rule(y, COLOR.rule); y += 20;

  // Exercise box
  y = exerciseBox(ch.exercise.title, ch.exercise.text, y);
});

// ─── BACK COVER ──────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, PAGE_W, PAGE_H).fill(COLOR.black);

// Brand
doc.fontSize(9).fillColor(COLOR.light).font('Helvetica-Bold')
   .text('THINKFORM', MARGIN_LEFT, MARGIN_TOP, { characterSpacing: 3 });
rule(MARGIN_TOP + 28, '#333333', 0.5);

// Big closing line
doc.fontSize(36).fillColor(COLOR.white).font('Helvetica-Bold')
   .text('Want to work through\nthis together?', MARGIN_LEFT, 200, { width: 420, lineGap: 8 });

doc.fontSize(14).fillColor('#888888').font('Helvetica')
   .text(
     'Book a 1:1 session and we\'ll apply this framework\ndirectly to your specific idea.',
     MARGIN_LEFT, 330, { width: 380, lineGap: 7 }
   );

// CTA box
doc.rect(MARGIN_LEFT, 420, CONTENT_W, 52).fill('#1c1c1c');
doc.fontSize(11).fillColor(COLOR.white).font('Helvetica-Bold')
   .text('→  thinkform.studio/book', MARGIN_LEFT + 20, 437);

// Bottom
rule(PAGE_H - 56, '#333333', 0.5);
doc.fontSize(9).fillColor('#555555').font('Helvetica')
   .text(
     '© THINKFORM  ·  Free to share. Do not sell.',
     MARGIN_LEFT, PAGE_H - 38, { width: CONTENT_W, align: 'center' }
   );

// ─── FINALISE ──────────────────────────────────────────────────────────────
doc.flushPages();
doc.end();
console.log('✓ Premium PDF generated: public/thinkform-strategic-framework.pdf');
