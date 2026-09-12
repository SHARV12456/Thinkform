"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type ClientStory, VERIFIED_STORIES } from "./storiesData";
import "./stories.css";

/* ─── STORY MODAL ──────────────────────────────────────────── */
function StoryModal({
  story,
  onClose,
}: {
  story: ClientStory;
  onClose: () => void;
}) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="taas-story-modal-overlay"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close */}
        <button
          className="taas-story-modal-close"
          onClick={onClose}
          aria-label="Close story"
        >
          ← Back to stories
        </button>

        <div className="taas-story-modal-inner">
          {/* Hero image */}
          {story.projectPhoto ? (
            <motion.img
              src={story.projectPhoto}
              alt={story.imageAlt}
              className="taas-story-modal-image"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <motion.div
              className="taas-story-modal-image"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.04)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                }}
              >
                Project image
              </span>
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="taas-story-meta">
              <span>{story.location}</span>
              <span>·</span>
              <span>{story.projectType}</span>
              <span>·</span>
              <span>{story.date}</span>
              {story.source && (
                <>
                  <span>·</span>
                  <span style={{ opacity: 0.6 }}>
                    Verified via {story.source}
                  </span>
                </>
              )}
            </div>
            <h1 className="taas-story-modal-title">{story.name}</h1>
          </motion.div>

          {/* Grid sections */}
          <motion.div
            className="taas-story-modal-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="taas-story-detail-section">
              <div className="taas-story-detail-label">The Decision</div>
              <div className="taas-story-detail-text">{story.theDecision}</div>
            </div>

            <div className="taas-story-detail-section">
              <div className="taas-story-detail-label">The Problem</div>
              <div className="taas-story-detail-text">{story.theProblem}</div>
            </div>

            <div className="taas-story-detail-section">
              <div className="taas-story-detail-label">The Consultation</div>
              <div className="taas-story-detail-text">
                {story.theConsultation}
              </div>
            </div>

            <div className="taas-story-detail-section">
              <div className="taas-story-detail-label">The Outcome</div>
              <div className="taas-story-detail-text">{story.theOutcome}</div>
            </div>

            {/* Full quote — spans both columns */}
            <blockquote className="taas-story-full-quote">
              &ldquo;{story.exactQuote}&rdquo;
              <footer
                style={{
                  marginTop: "1.5rem",
                  fontSize: "0.75rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                }}
              >
                — {story.name} · {story.location}
              </footer>
            </blockquote>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="taas-story-cta-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <h2>Have a similar decision?</h2>
            <Link href="/book" className="taas-story-cta-btn">
              Book a Design Consultation →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── STORY CARD ───────────────────────────────────────────── */
function StoryCard({ story }: { story: ClientStory }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <article
        className="taas-story-item"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Read ${story.name}'s story`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
      >
        {/* Left — image */}
        <div className="taas-story-image-wrap">
          {story.clientPhoto ? (
            <img
              src={story.clientPhoto}
              alt={story.imageAlt}
              className="taas-story-image"
            />
          ) : (
            <div
              className="taas-story-image"
              style={{
                background: "rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                }}
              >
                Photo
              </span>
            </div>
          )}

          <div className="taas-story-overlay">
            <div className="taas-story-cta-label">Read Their Story →</div>
          </div>
        </div>

        {/* Right — content */}
        <div className="taas-story-content">
          <div className="taas-story-meta">
            <span>{story.location}</span>
            <span>·</span>
            <span>{story.projectType}</span>
            <span>·</span>
            <span>{story.date}</span>
          </div>

          <h2 className="taas-story-client">{story.name}</h2>

          <blockquote className="taas-story-quote-preview">
            &ldquo;{story.exactQuote.length > 160
              ? story.exactQuote.slice(0, 160) + "…"
              : story.exactQuote}&rdquo;
          </blockquote>

          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            Read their story →
          </div>
        </div>
      </article>

      {/* Modal */}
      {open && (
        <StoryModal story={story} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

/* ─── EMPTY STATE — public-facing when no stories yet ─────── */
function EmptyState() {
  return (
    <motion.div
      className="taas-stories-empty"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Client stories coming soon.</h2>
      <p style={{ marginTop: "1rem" }}>
        We document real design decisions made by real Mumbai homeowners and
        businesses. Check back soon — we&apos;re collecting stories with client
        permission.
      </p>
      <div style={{ marginTop: "3rem" }}>
        <Link href="/book" className="taas-story-cta-btn">
          Book a Consultation →
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────── */
export default function StoriesPage() {
  const stories = VERIFIED_STORIES;

  return (
    <main className="taas-stories-page">
      {/* HERO */}
      <section className="taas-stories-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="taas-stories-kicker">Client Stories · Real Experiences</p>

          <h1 className="taas-stories-headline">
            Real People.<br />Real Design Decisions.
          </h1>

          <p className="taas-stories-subhead">
            See how Mumbai homeowners and businesses use TAAS when they need
            clarity before committing their money.
          </p>
        </motion.div>
      </section>

      {/* STORIES */}
      {stories.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="taas-stories-list">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </section>
      )}
    </main>
  );
}
