"use client";
import { useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import Icon from "./Icon";

const links = [{ href: "#menu", label: "Menu" }, { href: "#story", label: "Our story" }, { href: "#visit", label: "Visit" }, { href: "#reservations", label: "Reservations" }];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive("#" + entry.target.id); });
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    links.forEach(link => { const section = document.querySelector(link.href); if (section) observer.observe(section); });
    const resize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", resize); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <header ref={header} className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
    <div className="container nav-inner">
      <a href="#top" aria-label="BLINI home" onClick={() => setOpen(false)}><Brand /></a>
      <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav id="primary-navigation" aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>
        {links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} className={link.href === "#reservations" ? "nav-reserve" : ""} onClick={() => {
          setOpen(false);
          if (window.innerWidth < 768) { document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true }); }
        }}>{link.label}{link.href === "#reservations" && <Icon name="arrow-up-right" />}</a>)}
      </nav>
    </div>
  </header>;
}
