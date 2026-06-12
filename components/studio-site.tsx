"use client";

import {
  ArrowLeft,
  ArrowRight,
  Crown,
  Diamond,
  Instagram,
  Mail,
  Menu,
  Play,
  Sparkles,
  X,
  Youtube
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";

const heroImage = "/media/jay-studio-hero.png";

function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = 2200;
    const update = () => {
      const elapsed = performance.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next < 100) {
        requestAnimationFrame(update);
      } else {
        window.setTimeout(() => setVisible(false), 320);
      }
    };
    requestAnimationFrame(update);
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader ${progress === 100 ? "loader--done" : ""}`}>
      <div className="loader__wordmark">JAY STUDIO°</div>
      <div className="loader__progress">
        <span>{progress.toString().padStart(2, "0")}</span>
        <div className="loader__track">
          <div style={{ width: `${progress}%` }} />
        </div>
        <span>100</span>
      </div>
    </div>
  );
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      setLabel(target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "");
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={cursor} className={`custom-cursor ${label ? "is-active" : ""}`}>
      {label === "play" ? <Play size={14} fill="currentColor" /> : label}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#" className="wordmark" data-cursor="home">
        JAY STUDIO<sup>°</sup>
      </a>
      <nav className={`header-nav ${menuOpen ? "is-open" : ""}`}>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Work
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </nav>
      <div className="socials" aria-label="Social links">
        <a href="#" aria-label="Instagram" data-cursor="open">
          <Instagram />
        </a>
        <a href="#" aria-label="TikTok" data-cursor="open">
          <TikTokIcon />
        </a>
        <a href="#" aria-label="YouTube" data-cursor="open">
          <Youtube />
        </a>
      </div>
      <button
        className="menu-button"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function PlayButton({ label = "Play" }: { label?: string }) {
  return (
    <span className="play-button" aria-hidden="true">
      <Play size={16} fill="currentColor" />
      <span>{label}</span>
    </span>
  );
}

function TikTokIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4v10.2a4.2 4.2 0 1 1-3.6-4.15" />
      <path d="M14.5 4c.6 2.5 2.15 4.05 4.5 4.55" />
    </svg>
  );
}

function Hero({ onPlay }: { onPlay: () => void }) {
  return (
    <section className="hero page-shell" id="about">
      <img src={heroImage} alt="Cinematic luxury resort overlooking the sea" />
      <div className="hero__shade" />
      <div className="hero__content">
        <p className="eyebrow">Creative production studio</p>
        <h1>
          Stories for brands.
          <br />
          <em>Made for people.</em>
        </h1>
        <p className="service-line">
          Photography <span>•</span> Films <span>•</span> Campaigns{" "}
          <span>•</span> Experiences
        </p>
        <button className="primary-button" onClick={onPlay} data-cursor="play">
          View Showreel
          <span className="button-icon">
            <Play size={13} fill="currentColor" />
          </span>
        </button>
      </div>
      <div className="hero__stories">
        <button onClick={onPlay} data-cursor="play">
          <span>Featured work</span>
          <strong>Aurea Resort</strong>
          <PlayButton label="View project" />
        </button>
        <button onClick={onPlay} data-cursor="play">
          <span>Camera approach</span>
          <strong>Our Process</strong>
          <PlayButton label="Watch video" />
        </button>
      </div>
      <div className="hero__index">
        <span>01</span>
        <i />
        <span>03</span>
      </div>
    </section>
  );
}

function TiltCard({
  film,
  onPlay
}: {
  film: Film;
  onPlay: (film: Film) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const tilt = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <button
      ref={cardRef}
      className="film-card"
      onClick={() => onPlay(film)}
      onPointerMove={tilt}
      onPointerLeave={reset}
      data-cursor="play"
      aria-label={`Play ${film.title}`}
    >
      <img src={film.image} alt="" />
      <div className="film-card__overlay" />
      <div className="film-card__identity">
        <h3>{film.title}</h3>
        <span>{film.category}</span>
      </div>
      <span className="film-card__play">
        <Play fill="currentColor" />
      </span>
      <div className="film-card__copy">
        <p>{film.subtitle}</p>
      </div>
    </button>
  );
}

function RecentWork({ onPlay }: { onPlay: (film: Film) => void }) {
  return (
    <section className="section work-section page-shell" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected projects</p>
          <h2>Recent Work</h2>
        </div>
        <p>
          Films, photography and campaigns built for modern attention without
          sacrificing craft, story or atmosphere.
        </p>
      </div>
      <div className="film-grid">
        {films.map((film) => (
          <TiltCard film={film} onPlay={onPlay} key={film.title} />
        ))}
      </div>
    </section>
  );
}

function Weddings() {
  return (
    <section className="section page-shell">
      <div className="weddings">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
          alt="Newly married couple"
        />
        <div className="weddings__shade" />
        <div className="weddings__copy">
          <p className="eyebrow">Weddings</p>
          <h2>
            Moments fade.
            <br />
            <em>Stories remain.</em>
          </h2>
          <p>Wedding films and photography crafted to last a lifetime.</p>
          <a href="#contact" className="primary-button" data-cursor="open">
            Explore Weddings <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

const values = [
  {
    icon: Crown,
    title: "Strategic Storytelling",
    body: "Every frame starts with a clear idea, built around what your audience should feel and remember."
  },
  {
    icon: Diamond,
    title: "Premium Production",
    body: "A senior creative team, refined direction and exacting production from first treatment to final grade."
  },
  {
    icon: Sparkles,
    title: "Results That Matter",
    body: "Beautiful work is the baseline. We create assets designed to strengthen brands and move people."
  }
];

function WhyJay() {
  return (
    <section className="values page-shell">
      {values.map(({ icon: Icon, title, body }) => (
        <article key={title}>
          <Icon />
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Testimonial() {
  return (
    <section className="testimonial page-shell">
      <div className="testimonial__mark">“</div>
      <div>
        <p className="testimonial__quote">
          “Jay Studio captured the essence of our brand perfectly. The final
          film exceeded all expectations and truly elevated our campaign.”
        </p>
        <div className="testimonial__person">
          <span>LB</span>
          <div>
            <strong>Leila Ben Amor</strong>
            <p>Marketing Director, Aurea Resort</p>
          </div>
        </div>
      </div>
      <div className="testimonial__controls">
        <button aria-label="Previous testimonial">
          <ArrowLeft />
        </button>
        <button aria-label="Next testimonial">
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact page-shell" id="contact">
      <p className="eyebrow">Start a project</p>
      <h2>
        Have a story worth
        <br />
        <em>making unforgettable?</em>
      </h2>
      <a
        href="mailto:hello@jaystudio.com"
        className="primary-button"
        data-cursor="email"
      >
        hello@jaystudio.com <Mail size={16} />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer page-shell">
      <p>© 2026 Jay Studio. All rights reserved.</p>
      <div>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </div>
      <div>
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">YouTube</a>
      </div>
    </footer>
  );
}

function VideoModal({
  film,
  onClose
}: {
  film: Film | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = film ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [film]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!film) return null;

  return (
    <div className="video-modal" role="dialog" aria-modal="true">
      <button
        className="video-modal__backdrop"
        onClick={onClose}
        aria-label="Close video"
      />
      <div
        className={`video-modal__panel video-modal__panel--${film.orientation}`}
      >
        <div className="video-modal__header">
          <div>
            <span>{film.category}</span>
            <strong>{film.title}</strong>
          </div>
          <button onClick={onClose} aria-label="Close video">
            <X />
          </button>
        </div>
        <div className="video-modal__device">
          <span
            className={`device-notch device-notch--${film.orientation}`}
          />
          <video
            src={film.video}
            poster={film.image}
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

export function StudioSite() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const showreel = films[0];

  return (
    <>
      <Loader />
      <CustomCursor />
      <Header />
      <main>
        <Hero onPlay={() => setSelectedFilm(showreel)} />
        <RecentWork onPlay={setSelectedFilm} />
        <Weddings />
        <WhyJay />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <a className="floating-cta" href="#contact" data-cursor="email">
        <Mail />
        <span>Let&apos;s Create</span>
      </a>
      <VideoModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </>
  );
}
