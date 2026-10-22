"use client";

import Image from "next/image";
import Icon from "./Icon";
import { useEffect, useRef, useState } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export default function Hero() {
  const runway = useRef<HTMLElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const data = matchMedia("(prefers-reduced-data: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    // Select once: rotating a phone must not download a second rendition.
    const rendition = matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
    const applyPreferences = () => {
      setInitialized(true);
      const saveData = data.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
      setMotionAllowed(!motion.matches && !saveData);
      setSource(!motion.matches && !saveData ? `/videos/blini-chef-${rendition}.mp4` : undefined);
    };
    applyPreferences();
    motion.addEventListener("change", applyPreferences);
    data.addEventListener("change", applyPreferences);
    connection?.addEventListener("change", applyPreferences);
    return () => {
      motion.removeEventListener("change", applyPreferences);
      data.removeEventListener("change", applyPreferences);
      connection?.removeEventListener("change", applyPreferences);
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!source) {
      element.pause();
      element.removeAttribute("src");
      element.load();
      return;
    }
    element.muted = true;
    // Safari Low Power Mode can reject autoplay. Keep the poster and Play control.
    void element.play().catch(() => setPlaying(false));
  }, [source]);

  useEffect(() => {
    const track = runway.current;
    const stage = section.current;
    if (!track || !stage || !motionAllowed) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // Map only the extra scroll distance to 0–100%; the video keeps playing
      // normally and the sticky stage stays still until the track ends.
      const travel = Math.max(0, track.offsetHeight - stage.offsetHeight);
      const progress = travel > 0
        ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / travel))
        : 0;
      track.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
      track.style.setProperty("--hero-content-y", `${Math.round(-90 * progress)}px`);
      track.style.setProperty("--hero-content-opacity", (1 - .55 * progress).toFixed(3));
      track.style.setProperty("--hero-bottom-opacity", (1 - .55 * progress).toFixed(3));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const name of ["--hero-scroll-progress", "--hero-content-y", "--hero-content-opacity", "--hero-bottom-opacity"]) {
        track.style.removeProperty(name);
      }
    };
  }, [motionAllowed]);

  useEffect(() => {
    const pauseWhenHidden = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  const togglePlayback = () => {
    const element = video.current;
    if (!element) return;
    if (playing) element.pause();
    else if (!source) {
      setSource(`/videos/blini-chef-${matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"}.mp4`);
    } else {
      void element.play().catch(() => setPlaying(false));
    }
  };

  return <section ref={runway} className={`hero-scroll${motionAllowed ? " is-pinned" : ""}`}><div ref={section} className="hero" aria-labelledby="hero-heading">
    <div className="hero-media" aria-hidden="true">
      <Image className="hero-image" src="/videos/blini-chef-poster.webp" alt="" fill priority sizes="100vw" quality={80} />
      <video ref={video} className={`hero-video${source && hasPlayed && !failed ? " is-playing" : ""}`} src={source} poster="/videos/blini-chef-poster.webp" autoPlay muted loop playsInline preload="none" tabIndex={-1}
        onPlaying={() => { setPlaying(true); setHasPlayed(true); }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
    </div>
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="eyebrow light"><span className="small-line" /> The BLINI table</p>
      <h1 id="hero-heading">Good food.<br />Better <em>company.</em></h1>
      <p className="hero-description">A little discovery. A long conversation.<br />Discover a place made for the moments around the table.</p>
      <div className="actions"><a className="button button-clay" href="#menu">Explore menu <Icon name="arrow-up-right" /></a><a className="button button-ghost" href="#reservations">Reserve a table</a></div>
    </div>
    <div className="container hero-bottom"><span>Food, conversation & a slower pace</span><div className="hero-bottom-actions">{initialized && !failed && <button className="hero-playback" type="button" onClick={togglePlayback} aria-label={playing ? "Pause background video" : "Play background video"}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">{playing ? <path d="M3 2h3v12H3zm7 0h3v12h-3z" /> : <path d="m4 2 10 6-10 6z" />}</svg>
      <span>{playing ? "Pause" : "Play"}</span>
    </button>}<a href="#menu">Discover BLINI <Icon name="arrow-down" /></a></div></div>
    <div className="hero-scroll-meter" aria-hidden="true"><span /></div>
  </div></section>;
}
