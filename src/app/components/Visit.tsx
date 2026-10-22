import { conceptHours } from "../data/restaurant";
import Icon from "./Icon";
export default function Visit() {
  return <section id="visit" tabIndex={-1} className="section visit-section" aria-labelledby="visit-heading"><div className="container visit-grid">
    <div><p className="eyebrow">03 / A place in mind</p><h2 id="visit-heading">Imagine your<br /><em>next gathering.</em></h2><p className="visit-intro">Inspired by the original Kosovo-based concept. Designed for a table worth coming back to.</p></div>
    <div className="visit-details"><div className="detail-heading"><h3>Concept opening hours</h3><Icon name="clock" /></div><dl className="hours">{conceptHours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.hours}</dd></div>)}</dl></div>
  </div></section>;
}
