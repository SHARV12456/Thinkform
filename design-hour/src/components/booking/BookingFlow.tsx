"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SESSIONS = [
	{
		id: "30",
		duration: "30 MIN",
		title: "Quick Clarity",
		price: 1999,
		desc: "One focused design question or decision.",
		recommended: false,
	},
	{
		id: "60",
		duration: "60 MIN",
		title: "Deep Dive",
		price: 3999,
		desc: "Multiple decisions or a situation that needs deeper discussion.",
		recommended: true,
	},
	{
		id: "90",
		duration: "90 MIN",
		title: "Complete Direction",
		price: 5999,
		desc: "A broader design situation requiring more time and connected decisions.",
		recommended: false,
	},
];

const PROBLEMS = [
	{
		id: "layout",
		label: "LAYOUT",
		desc: "Is the space wrong — or is the plan wrong?",
	},
	{
		id: "kitchen",
		label: "KITCHEN",
		desc: "Plan flow, storage, and finishes",
	},
	{
		id: "materials",
		label: "MATERIALS",
		desc: "Cut through options with clarity",
	},
	{
		id: "storage",
		label: "STORAGE",
		desc: "More room, or better logic?",
	},
	{
		id: "whole-home",
		label: "WHOLE HOME",
		desc: "Create one clear design language",
	},
	{
		id: "commercial",
		label: "COMMERCIAL SPACE",
		desc: "Design with business in mind",
	},
	{
		id: "second-opinion",
		label: "SECOND OPINION",
		desc: "You need a sharper point of view",
	},
	{
		id: "not-sure",
		label: "NOT SURE YET",
		desc: "This is still a valid question",
	},
];

const BENEFITS = [
	"Discuss the problem",
	"Review your situation",
	"Challenge assumptions",
	"Explore options",
	"Get clear direction",
	"Know what to do next",
];

const AVAILABLE_TIMES = ["10:00", "11:30", "14:00", "16:30", "18:00"];

type BookingStep =
	| "problem"
	| "session"
	| "datetime"
	| "details"
	| "confirm"
	| "payment"
	| "success";

export default function BookingFlow() {
	const [step, setStep] = useState<BookingStep>("problem");
	const [problem, setProblem] = useState<string | null>(null);
	const [customProblem, setCustomProblem] = useState("");
	const [sessionId, setSessionId] = useState<string>("60");
	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [project, setProject] = useState("");
	const [context, setContext] = useState("");
	const [hoveredProblem, setHoveredProblem] = useState<string | null>(null);
	const router = useRouter();

	const session = SESSIONS.find((s) => s.id === sessionId) ?? SESSIONS[1];
	const selectedProblem = PROBLEMS.find((p) => p.label === problem) ?? null;
	const formattedDate = date
		? new Date(date)
				.toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				})
				.toUpperCase()
		: "TBD";

	const stepNumber =
		step === "problem"
			? "01"
			: step === "session"
			? "02"
			: step === "datetime"
			? "03"
			: step === "details"
			? "04"
			: step === "confirm"
			? "05"
			: "06";

	const recommendationText =
		selectedProblem?.id === "whole-home" || selectedProblem?.id === "commercial"
			? "BASED ON YOUR QUESTION → COMPLETE DIRECTION LOOKS RIGHT"
			: selectedProblem?.id === "second-opinion" || selectedProblem?.id === "not-sure"
			? "BASED ON YOUR QUESTION → QUICK CLARITY CAN HELP"
			: "BASED ON YOUR QUESTION → DEEP DIVE LOOKS RIGHT";

	function buildWhatsAppMessage() {
		const selectedDate = date ? new Date(`${date}T12:00:00`) : null;
		const dateLabel = selectedDate
			? selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })
			: "TBD";
		const timeLabel = time
			? (() => {
					const [hours, minutes] = time.split(":").map(Number);
					const suffix = hours >= 12 ? "PM" : "AM";
					const normalizedHour = ((hours + 11) % 12) + 1;
					return `${normalizedHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
			  })()
			: "TBD";

		const detailLines = [
			name ? `Name: ${name}` : null,
			email ? `Email: ${email}` : null,
			phone ? `Phone: ${phone}` : null,
			project ? `Project / Space: ${project}` : null,
			context ? `Context: ${context}` : null,
		].filter(Boolean);

		return [
			"Hi TAAS,",
			"",
			`I’ve selected a **${session.title}** consultation for:`,
			"",
			`${dateLabel} · ${timeLabel}`,
			`₹${session.price.toLocaleString()}`,
			"",
			...detailLines,
			detailLines.length ? "" : null,
			"I’d like to confirm the session by completing the payment.",
			"",
			"Thank you.",
		]
			.filter(Boolean)
			.join("\n");
	}

	function handleConfirm() {
		const message = buildWhatsAppMessage();
		const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
		window.open(waUrl, "_blank", "noopener,noreferrer");
		setStep("success");
	}

	const summaryProblem = customProblem || problem || "Not specified";

	const activeQuestion =
		PROBLEMS.find((p) => p.label === (hoveredProblem || problem)) ??
		PROBLEMS.find((p) => p.label === "LAYOUT") ??
		PROBLEMS[0];

	const activeQuestionDetail =
		activeQuestion?.id === "not-sure"
			? "Good. That's still a question."
			: activeQuestion?.desc ?? "Is the space wrong — or is the plan wrong?";

	const activeQuestionMicro =
		activeQuestion?.id === "layout"
			? "FLOW / FURNITURE / PROPORTION / MOVEMENT"
			: activeQuestion?.id === "kitchen"
			? "WORKFLOW / STORAGE / FINISH / CLARITY"
			: activeQuestion?.id === "materials"
			? "FINISH / BUDGET / CONTEXT / TONE"
			: activeQuestion?.id === "storage"
			? "USAGE / CABINETS / DAILY LOGIC / CALM"
			: activeQuestion?.id === "whole-home"
			? "SEQUENCE / COHERENCE / BUDGET / DIRECTION"
			: activeQuestion?.id === "commercial"
			? "CUSTOMER FLOW / OPERATIONS / BRAND / EFFICIENCY"
			: activeQuestion?.id === "second-opinion"
			? "CHALLENGE / REVIEW / REFINEMENT / CONFIDENCE"
			: "START THERE / QUESTION / DIRECTION / CLARITY";

	return (
		<div className="taas-booking">
			<header className="taas-booking-header">
				<Link href="/" className="taas-booking-logo">
					TAAS<span>®</span>
				</Link>
				<div className="taas-booking-meta">
					DESIGN DECISION PLATFORM / MUMBAI
				</div>
			</header>

			<div className="taas-booking-container">
				<div className="taas-booking-progress">
					<span>{stepNumber}</span>
					<small>QUESTION</small>
				</div>

				{step === "problem" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-start-hero">
								<div className="taas-start-kicker">
									01 / WHAT ARE YOU TRYING TO SOLVE?
								</div>
								<div className="taas-start-brand">TAAS® / START HERE</div>
								<h1 className="taas-start-title">
									WHAT ARE YOU
									<br />
									TRYING TO SOLVE?
								</h1>
								<p className="taas-start-subtext">
									Start with a clear question. Then choose the right level of
									direction.
								</p>
							</div>

							<div className="taas-question-shell">
								<div className="taas-question-list">
									{PROBLEMS.map((p, index) => {
										const isActive =
											(hoveredProblem || problem || "LAYOUT") === p.label;
										const isNotSure = p.id === "not-sure";

										return (
											<button
												key={p.id}
												type="button"
												className={`taas-question-item ${isActive ? "active" : ""} ${
													isNotSure ? "is-uncertain" : ""
												}`}
												onMouseEnter={() => setHoveredProblem(p.label)}
												onMouseLeave={() => setHoveredProblem(null)}
												onFocus={() => setHoveredProblem(p.label)}
												onBlur={() => setHoveredProblem(null)}
												onClick={() => {
													setProblem(p.label);
													setCustomProblem("");
													setTimeout(() => setStep("session"), 120);
												}}
											>
												<span className="taas-question-index">
													{String(index + 1).padStart(2, "0")}
												</span>
												<span className="taas-question-copy">
													<span className="taas-question-label">{p.label}</span>
													<span className="taas-question-desc">{p.desc}</span>
												</span>
												<span className="taas-question-arrow">↗</span>
											</button>
										);
									})}
								</div>

								<div className="taas-question-detail">
									<p className="taas-question-detail-label">{activeQuestion.label}</p>
									<h2>{activeQuestionDetail}</h2>
									<div className="taas-question-micro">{activeQuestionMicro}</div>
									{activeQuestion.id === "not-sure" && (
										<button
											type="button"
											className="taas-question-cta"
											onClick={() => {
												setProblem("NOT SURE YET");
												setTimeout(() => setStep("session"), 120);
											}}
										>
											START THERE ↗
										</button>
									)}
								</div>
							</div>

							<div className="taas-booking-actions">
								<button
									type="button"
									className="taas-booking-btn secondary"
									onClick={() => setStep("problem")}
								>
									← BACK
								</button>
								<button
									type="button"
									className="taas-booking-btn primary"
									onClick={() => setStep("session")}
								>
									CONTINUE ↗
								</button>
							</div>
						</div>
					</section>
				)}

				{step === "session" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-booking-eyebrow">
								02 / CHOOSE YOUR SESSION
							</div>
							<h1 className="taas-booking-title">
								HOW MUCH
								<br />
								DIRECTION DO YOU NEED?
							</h1>
							<p className="taas-booking-subtext">
								Every TAAS session starts with 15 minutes on us. Then you
								continue with the depth you need.
							</p>

							<div className="taas-session-recommendation">
								{recommendationText}
							</div>

							<div className="taas-session-container">
								{SESSIONS.map((s) => (
									<button
										type="button"
										key={s.id}
										className={`taas-session-card ${
											sessionId === s.id ? "active" : ""
										} ${s.recommended ? "recommended" : ""}`}
										onClick={() => setSessionId(s.id)}
									>
										{s.recommended && (
											<span className="taas-session-badge">RECOMMENDED</span>
										)}
										<div className="taas-session-topline">
											<span>{s.duration}</span>
											<strong>₹{s.price.toLocaleString()}</strong>
										</div>
										<h3>{s.title}</h3>
										<p>{s.desc}</p>
										<span className="taas-session-inclusion">
											FIRST 15 MINUTES INCLUDED
										</span>
									</button>
								))}
							</div>

							<div className="taas-session-benefits">
								<h3>WHAT YOU GET</h3>
								<ul>
									{BENEFITS.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>

							<div className="taas-booking-actions">
								<button
									type="button"
									className="taas-booking-btn secondary"
									onClick={() => setStep("problem")}
								>
									← BACK
								</button>
								<button
									type="button"
									className="taas-booking-btn primary"
									onClick={() => setStep("datetime")}
								>
									CONTINUE ↗
								</button>
							</div>
						</div>
					</section>
				)}

				{step === "datetime" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-booking-eyebrow">03 / DATE + TIME</div>
							<h1 className="taas-booking-title">
								WHEN SHOULD
								<br />
								WE TALK?
							</h1>
							<p className="taas-booking-subtext">
								Pick the time that works best for your consultation.
							</p>

							<div className="taas-datetime-form">
								<div className="taas-form-group">
									<label className="taas-form-label">SELECT A DATE</label>
									<input
										type="date"
										className="taas-booking-input"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										min={new Date().toISOString().split("T")[0]}
									/>
								</div>

								{date && (
									<div className="taas-form-group">
										<label className="taas-form-label">CHOOSE A TIME</label>
										<div className="taas-time-grid">
											{AVAILABLE_TIMES.map((slot) => (
												<button
													key={slot}
													type="button"
													className={`taas-time-slot ${
														time === slot ? "active" : ""
													}`}
													onClick={() => setTime(slot)}
												>
													{slot}
												</button>
											))}
										</div>
									</div>
								)}
							</div>

							<div className="taas-booking-actions">
								<button
									type="button"
									className="taas-booking-btn secondary"
									onClick={() => setStep("session")}
								>
									← BACK
								</button>
								<button
									type="button"
									className="taas-booking-btn primary"
									disabled={!date || !time}
									onClick={() => setStep("details")}
								>
									CONTINUE ↗
								</button>
							</div>
						</div>
					</section>
				)}

				{step === "details" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-booking-eyebrow">04 / YOUR DETAILS</div>
							<h1 className="taas-booking-title">
								A LITTLE
								<br />
								ABOUT YOU.
							</h1>
							<p className="taas-booking-subtext">
								Just the essentials so we can prepare for your conversation.
							</p>

							<form className="taas-contact-form">
								<div className="taas-form-group">
									<label className="taas-form-label">NAME</label>
									<input
										type="text"
										className="taas-booking-input"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Your name"
									/>
								</div>

								<div className="taas-form-group">
									<label className="taas-form-label">EMAIL</label>
									<input
										type="email"
										className="taas-booking-input"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="you@example.com"
									/>
								</div>

								<div className="taas-form-group">
									<label className="taas-form-label">PHONE</label>
									<input
										type="tel"
										className="taas-booking-input"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder="Your contact number"
									/>
								</div>

								<div className="taas-form-group">
									<label className="taas-form-label">PROJECT / SPACE</label>
									<input
										type="text"
										className="taas-booking-input"
										value={project}
										onChange={(e) => setProject(e.target.value)}
										placeholder="Apartment, kitchen, retail, office..."
									/>
								</div>

								<div className="taas-form-group">
									<label className="taas-form-label">GIVE US SOME CONTEXT</label>
									<textarea
										className="taas-booking-textarea"
										rows={4}
										value={context}
										onChange={(e) => setContext(e.target.value)}
										placeholder="What are you deciding right now?"
									/>
								</div>
							</form>

							<div className="taas-booking-actions">
								<button
									type="button"
									className="taas-booking-btn secondary"
									onClick={() => setStep("datetime")}
								>
									← BACK
								</button>
								<button
									type="button"
									className="taas-booking-btn primary"
									disabled={!name || !phone || !email}
									onClick={() => setStep("confirm")}
								>
									REVIEW BOOKING ↗
								</button>
							</div>
						</div>
					</section>
				)}

				{step === "confirm" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-booking-eyebrow">05 / PAYMENT</div>
							<h1 className="taas-booking-title">
								PAY TO
								<br />
								CONFIRM YOUR SESSION.
							</h1>
							<p className="taas-booking-subtext">
								Select your plan, choose your slot, and pay to reserve the
								consultation.
							</p>

							<div className="taas-summary-card">
								<div className="taas-summary-row">
									<span>TAAS / {session.duration}</span>
									<strong>₹{session.price.toLocaleString()}</strong>
								</div>
								<div className="taas-summary-row">
									<span>INCLUSION</span>
									<strong>FIRST 15 MINUTES INCLUDED</strong>
								</div>
								<div className="taas-summary-row">
									<span>FOCUS</span>
									<strong>{summaryProblem}</strong>
								</div>
								<div className="taas-summary-row">
									<span>DATE</span>
									<strong>{formattedDate}</strong>
								</div>
								<div className="taas-summary-row">
									<span>TIME</span>
									<strong>{time}</strong>
								</div>
								<div className="taas-summary-row">
									<span>DETAILS</span>
									<strong>{name}</strong>
								</div>
							</div>

							<div className="taas-booking-actions">
								<button
									type="button"
									className="taas-booking-btn secondary"
									onClick={() => setStep("details")}
								>
									← CHANGE DETAILS
								</button>
								<button
									type="button"
									className="taas-booking-btn primary success"
									onClick={handleConfirm}
								>
									PAY & CONFIRM ↗
								</button>
							</div>
						</div>
					</section>
				)}

				{step === "success" && (
					<section className="taas-booking-screen">
						<div className="taas-booking-inner">
							<div className="taas-booking-success">
								<div className="taas-success-mark">✓</div>
								<div className="taas-booking-eyebrow">
									TAAS / PAYMENT RECEIVED
								</div>
								<h1 className="taas-booking-title">
									YOU&apos;RE
									<br />
									IN.
								</h1>
								<p className="taas-booking-subtext">
									{session.title}
									<br />
									{formattedDate} · {time}
								</p>

								<div className="taas-summary-card compact">
									<div className="taas-summary-row">
										<span>SESSION</span>
										<strong>{session.title}</strong>
									</div>
									<div className="taas-summary-row">
										<span>DATE</span>
										<strong>{formattedDate}</strong>
									</div>
									<div className="taas-summary-row">
										<span>TIME</span>
										<strong>{time}</strong>
									</div>
									<div className="taas-summary-row">
										<span>STATUS</span>
										<strong>PAYMENT RECEIVED</strong>
									</div>
								</div>

								<p className="taas-success-message">
									COME WITH THE QUESTION.
									<br />
									WE&apos;LL WORK OUT THE NEXT MOVE.
								</p>

								<div className="taas-booking-actions">
									<button
										type="button"
										className="taas-booking-btn secondary"
										onClick={() =>
											window.open(
												`https://wa.me/?text=${encodeURIComponent(
													buildWhatsAppMessage()
												)}`,
												"_blank",
												"noopener,noreferrer"
											)
										}
									>
										OPEN WHATSAPP ↗
									</button>
									<button
										type="button"
										className="taas-booking-btn muted"
										onClick={() => router.push("/")}
									>
										BACK TO TAAS ↗
									</button>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
