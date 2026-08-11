import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export interface ReportData {
  sessionDate: string;
  sessionType: string;
  clientName: string;
  clientEmail: string;
  summary: string;
  keyInsights: string;
  actionItems: string;
  recommendations: string;
  nextSteps: string;
  consultantNotes: string;
  exclusiveOffer: string;
  qaPairs: { q: string; a: string }[];
}

const S = StyleSheet.create({
  // ─ Cover
  coverPage:  { display: 'flex', flexDirection: 'row', width: '100%', height: '100%' },
  coverLeft:  { width: '60%', backgroundColor: '#111111', padding: 55, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  coverRight: { width: '40%', backgroundColor: '#F5F5F3', padding: 55, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  coverBrandDark:  { fontSize: 8, fontWeight: 'bold', color: '#555', letterSpacing: 3 },
  coverEyebrow:    { fontSize: 9, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  coverHeadline:   { fontSize: 50, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.05, letterSpacing: -1, textTransform: 'uppercase' },
  coverTagline:    { fontSize: 11, color: '#777', marginTop: 18, lineHeight: 1.5 },
  coverBrandLight: { fontSize: 8, fontWeight: 'bold', color: '#999', letterSpacing: 3 },
  coverDivider:    { height: 2, backgroundColor: '#111111', marginVertical: 28 },
  coverForLabel:   { fontSize: 8, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 7 },
  coverClientName: { fontSize: 24, fontWeight: 'bold', color: '#111111', lineHeight: 1.1, textTransform: 'uppercase' },
  coverDate:       { fontSize: 10, color: '#666', marginTop: 8 },
  coverBottomNote: { fontSize: 7, color: '#AAA', letterSpacing: 1.5 },

  // ─ Page shells
  whitePage: { backgroundColor: '#FFFFFF', padding: '50 55 72 55', position: 'relative' },
  creamPage: { backgroundColor: '#F5F5F3', padding: '50 55 72 55', position: 'relative' },
  darkPage:  { backgroundColor: '#111111', padding: '50 55 72 55', position: 'relative' },

  // ─ Title Card (Cinematic)
  titleCard: { backgroundColor: '#0A0A0A', padding: 55, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' },
  actNumber: { fontSize: 10, fontWeight: 'bold', color: '#555', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 },
  actTitle:  { fontSize: 42, fontWeight: 'bold', color: '#FFF', letterSpacing: -1, textTransform: 'uppercase' },
  actDivider: { width: 40, height: 2, backgroundColor: '#333', marginTop: 25 },

  // ─ Running bars
  runBar:   { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1.5pt solid #111111', paddingBottom: 11, marginBottom: 40 },
  runLeft:  { fontSize: 8, fontWeight: 'bold', color: '#111', letterSpacing: 2, textTransform: 'uppercase' },
  runRight: { fontSize: 8, color: '#999', letterSpacing: 1 },

  runBarDk:   { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1pt solid #333333', paddingBottom: 11, marginBottom: 40 },
  runLeftDk:  { fontSize: 8, fontWeight: 'bold', color: '#555', letterSpacing: 2, textTransform: 'uppercase' },
  runRightDk: { fontSize: 8, color: '#555', letterSpacing: 1 },

  // ─ Footers
  footer:    { position: 'absolute', bottom: 26, left: 55, right: 55, borderTop: '1pt solid #E8E8E5', paddingTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt: { fontSize: 7, color: '#AAA', letterSpacing: 1.5, textTransform: 'uppercase' },

  footerDk:    { position: 'absolute', bottom: 26, left: 55, right: 55, borderTop: '1pt solid #333333', paddingTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  footerTxtDk: { fontSize: 7, color: '#555', letterSpacing: 1.5, textTransform: 'uppercase' },

  // ─ Intro page
  introRow:   { display: 'flex', flexDirection: 'row', flex: 1 },
  introLeft:  { width: '35%', paddingRight: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' },
  introRight: { width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  introHi:    { fontSize: 44, fontWeight: 'bold', color: '#111', lineHeight: 1.05, letterSpacing: -1, marginBottom: 26 },
  introBody:  { fontSize: 13, color: '#333', lineHeight: 1.75, marginBottom: 22 },
  introPS:    { fontSize: 10, color: '#999', lineHeight: 1.6 },
  sigBlock:   { paddingTop: 20, borderTop: '1.5pt solid #111' },
  sigName:    { fontSize: 11, fontWeight: 'bold', color: '#111' },
  sigRole:    { fontSize: 9, color: '#888', marginTop: 3, letterSpacing: 0.5 },

  // ─ Content rows
  secRow:   { display: 'flex', flexDirection: 'row', marginBottom: 40 },
  secLabel: { width: '27%', paddingRight: 28 },
  secBody:  { width: '73%' },
  secNum:   { fontSize: 9, color: '#CCC', fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  secTitle: { fontSize: 10, fontWeight: 'bold', color: '#111', letterSpacing: 1.8, textTransform: 'uppercase' },
  secText:  { fontSize: 11, color: '#444', lineHeight: 1.65 },

  // ─ Q&A
  qaItem: { marginBottom: 20, paddingLeft: 14, borderLeft: '2pt solid #111' },
  qaQ:    { fontSize: 10, fontWeight: 'bold', color: '#111', marginBottom: 5 },
  qaA:    { fontSize: 10, color: '#555', lineHeight: 1.6 },

  // ─ Offer slide
  offerRow:      { display: 'flex', flexDirection: 'row', flex: 1 },
  offerLeft:     { width: '38%', paddingRight: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  offerRight:    { width: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  offerTag:      { fontSize: 8, fontWeight: 'bold', color: '#555', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 },
  offerHead:     { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.1, letterSpacing: -0.5 },
  offerText:     { fontSize: 13, color: '#AAAAAA', lineHeight: 1.7 },
  offerForLbl:   { fontSize: 8, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  offerForName:  { fontSize: 13, fontWeight: 'bold', color: '#FFF' },
});

export const PremiumPDF = ({ report, bookingName, bookingSession }: {
  report: ReportData;
  bookingName: string;
  bookingSession: string;
}) => {
  const cName = report.clientName  || bookingName    || 'Client';
  const sType = report.sessionType || bookingSession || 'Strategy Session';
  const date  = report.sessionDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const fName = cName.split(' ')[0];

  const acts = [
    {
      id: 'I',
      title: 'The Context',
      sections: [
        { num: '01', label: 'Session Summary', text: report.summary },
        { num: '02', label: 'Key Insights', text: report.keyInsights },
      ].filter(s => s.text?.trim())
    },
    {
      id: 'II',
      title: 'The Shift',
      sections: [
        { num: '03', label: 'Strategic Recommendations', text: report.recommendations },
      ].filter(s => s.text?.trim())
    },
    {
      id: 'III',
      title: 'The Execution',
      sections: [
        { num: '04', label: 'Action Items', text: report.actionItems },
        { num: '05', label: 'Next Steps', text: report.nextSteps },
      ].filter(s => s.text?.trim())
    }
  ].filter(act => act.sections.length > 0);

  return (
    <Document>

      {/* ── 1. CINEMATIC COVER ───────────────────────────── */}
      <Page size={[842, 473]} style={{ padding: 0 }}>
        <View style={S.coverPage}>
          <View style={S.coverLeft}>
            <Text style={S.coverBrandDark}>THINKFORM</Text>
            <View>
              <Text style={S.coverEyebrow}>Executive Strategy Report</Text>
              <Text style={S.coverHeadline}>{sType}</Text>
              <Text style={S.coverTagline}>
                {'No templates. No generic advice.\nJust your idea, and a fresh perspective.'}
              </Text>
            </View>
          </View>
          <View style={S.coverRight}>
            <Text style={S.coverBrandLight}>Confidential</Text>
            <View>
              <View style={S.coverDivider} />
              <Text style={S.coverForLabel}>Prepared exclusively for</Text>
              <Text style={S.coverClientName}>{cName}</Text>
              <Text style={S.coverDate}>{date}</Text>
            </View>
            <Text style={S.coverBottomNote}>THINKFORM · 1:1 Creative Strategy</Text>
          </View>
        </View>
      </Page>

      {/* ── 2. PROLOGUE (Director's Note) ────────────────── */}
      <Page size={[842, 473]} style={S.creamPage}>
        <View style={S.runBar}>
          <Text style={S.runLeft}>Prologue</Text>
          <Text style={S.runRight}>{cName.toUpperCase()}</Text>
        </View>
        <View style={S.introRow}>
          <View style={S.introLeft}>
            <View style={S.sigBlock}>
              <Text style={S.sigName}>THINKFORM</Text>
              <Text style={S.sigRole}>Lead Strategy Consultant</Text>
            </View>
          </View>
          <View style={S.introRight}>
            <Text style={S.introHi}>{`Hi ${fName},`}</Text>
            <Text style={S.introBody}>
              {`It was a privilege connecting with you during our ${sType}.\n\nI've distilled everything we explored into this document — the core truths, the untested assumptions, and the opportunities you're sitting on. This isn't a template. Every insight here was written specifically for you.\n\nRead it carefully. Let it sit. Then, act.`}
            </Text>
            <Text style={S.introPS}>
              P.S. — The most important thing in this report is not what is written. It is what you do next.
            </Text>
          </View>
        </View>
        <View style={S.footer} fixed>
          <Text style={S.footerTxt}>THINKFORM · Confidential</Text>
          <Text style={S.footerTxt} render={({ pageNumber }) => `— ${pageNumber} —`} />
        </View>
      </Page>

      {/* ── 3. CINEMATIC STORY ARCS ──────────────────────── */}
      {acts.map((act, index) => (
        <React.Fragment key={index}>
          {/* TITLE CARD */}
          <Page size={[842, 473]} style={{ padding: 0 }}>
            <View style={S.titleCard}>
              <Text style={S.actNumber}>{`ACT ${act.id}`}</Text>
              <Text style={S.actTitle}>{act.title}</Text>
              <View style={S.actDivider} />
            </View>
          </Page>

          {/* CONTENT PAGE */}
          <Page size={[842, 473]} style={S.whitePage}>
            <View style={S.runBar}>
              <Text style={S.runLeft}>{`Act ${act.id} · ${act.title}`}</Text>
              <Text style={S.runRight}>{cName.toUpperCase()}</Text>
            </View>
            {act.sections.map((sec, i) => (
              <View key={i} style={S.secRow} wrap={false}>
                <View style={S.secLabel}>
                  <Text style={S.secNum}>{sec.num}</Text>
                  <Text style={S.secTitle}>{sec.label}</Text>
                </View>
                <View style={S.secBody}>
                  <Text style={S.secText}>{sec.text}</Text>
                </View>
              </View>
            ))}
            <View style={S.footer} fixed>
              <Text style={S.footerTxt}>THINKFORM · Confidential</Text>
              <Text style={S.footerTxt} render={({ pageNumber }) => `— ${pageNumber} —`} />
            </View>
          </Page>
        </React.Fragment>
      ))}

      {/* ── 4. BONUS/Q&A (conditional) ────────────────────── */}
      {report.qaPairs && report.qaPairs.length > 0 && (
        <Page size={[842, 473]} style={S.creamPage}>
          <View style={S.runBar}>
            <Text style={S.runLeft}>Addendum · Q&A</Text>
            <Text style={S.runRight}>{cName.toUpperCase()}</Text>
          </View>
          {report.qaPairs.map((qa, idx) => (
            <View key={idx} style={S.qaItem} wrap={false}>
              <Text style={S.qaQ}>{`Q: ${qa.q}`}</Text>
              <Text style={S.qaA}>{qa.a}</Text>
            </View>
          ))}
          <View style={S.footer} fixed>
            <Text style={S.footerTxt}>THINKFORM · Confidential</Text>
            <Text style={S.footerTxt} render={({ pageNumber }) => `— ${pageNumber} —`} />
          </View>
        </Page>
      )}

      {/* ── 5. EPILOGUE (Exclusive Offer) ────────────────── */}
      {report.exclusiveOffer && (
        <>
          <Page size={[842, 473]} style={{ padding: 0 }}>
            <View style={S.titleCard}>
              <Text style={S.actNumber}>EPILOGUE</Text>
              <Text style={S.actTitle}>Where We Go Next</Text>
              <View style={S.actDivider} />
            </View>
          </Page>

          <Page size={[842, 473]} style={S.darkPage}>
            <View style={S.runBarDk}>
              <Text style={S.runLeftDk}>Epilogue · The Offer</Text>
              <Text style={S.runRightDk}>{cName.toUpperCase()}</Text>
            </View>
            <View style={S.offerRow}>
              <View style={S.offerLeft}>
                <View>
                  <Text style={S.offerTag}>Exclusive Offer</Text>
                  <Text style={S.offerHead}>{'Your\nNext\nMove.'}</Text>
                </View>
                <View>
                  <Text style={S.offerForLbl}>For</Text>
                  <Text style={S.offerForName}>{cName}</Text>
                </View>
              </View>
              <View style={S.offerRight}>
                <Text style={S.offerText}>{report.exclusiveOffer}</Text>
              </View>
            </View>
            <View style={S.footerDk} fixed>
              <Text style={S.footerTxtDk}>THINKFORM · Confidential</Text>
              <Text style={S.footerTxtDk} render={({ pageNumber }) => `— ${pageNumber} —`} />
            </View>
          </Page>
        </>
      )}

    </Document>
  );
};
