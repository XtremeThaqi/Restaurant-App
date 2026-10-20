import { conceptHours, projectUrl } from "../data/restaurant";
export default function Visit() {
  return <section id="visit" tabIndex={-1} className="section visit-section" aria-labelledby="visit-heading"><div className="container visit-grid">
    <div><p className="eyebrow">03 / A place in mind</p><h2 id="visit-heading">Imagine your<br /><em>next gathering.</em></h2><p className="visit-intro">Inspired by the original Kosovo-based concept. Designed for a table worth coming back to.</p><span className="outlined-label">Portfolio concept · No physical venue</span></div>
    <div className="visit-details"><div className="detail-heading"><h3>Concept opening hours</h3><span aria-hidden="true">◷</span></div><dl className="hours">{conceptHours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.hours}</dd></div>)}</dl><p className="fine-print">Illustrative hours retained from the original design. These are not operating hours or reservation availability.</p><div className="project-contact" id="contact"><h3>About this project</h3><p>No restaurant address, telephone or booking email has been verified. For project enquiries, visit the source repository.</p><a className="text-link" href={projectUrl}>View project on GitHub <span aria-hidden="true">↗</span></a></div></div>
  </div></section>;
}
