import { useEffect, useRef, useState } from 'react';
import auditoriumImage from '../media/WhatsApp Image 2026-08-08 at 2.41.44 PM (1).jpeg';
import stageImage from '../media/WhatsApp Image 2026-08-08 at 2.41.44 PM.jpeg';
import speakersImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM.jpeg';
import congressImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (1).jpeg';
import screenImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (2).jpeg';
import audienceImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (3).jpeg';
import registrationImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (4).jpeg';

const speakers = [
  ['speaker-yellow', 'portrait-1', 'AM', 'ANA MORALES', 'Innovación Digital', 'Guatemala'],
  ['speaker-pink featured-speaker', 'portrait-2', 'JL', 'JOSÉ LÓPEZ', 'Arquitectura de Software', 'Guatemala'],
  ['speaker-blue', 'portrait-3', 'SA', 'SOFÍA ALVARADO', 'Ciberseguridad', 'Guatemala'],
  ['speaker-green', 'portrait-4', 'KO', 'KARLA ORTIZ', 'Datos e Inteligencia Artificial', 'Guatemala'],
];

const talks = [
  ['10:00', 'Tecnología para resolver problemas reales', 'Ana Morales · Auditorio principal', 'CHARLA'],
  ['11:30', 'Seguridad en un mundo conectado', 'Sofía Alvarado · Auditorio principal', 'CHARLA'],
  ['15:00', 'Diseñando sistemas que escalan', 'José López · Laboratorio tecnológico', 'TALLER'],
  ['17:30', 'El futuro de la inteligencia artificial', 'Karla Ortiz · Auditorio principal', 'CONVERSACIÓN'],
];

const pastEvents = [
  { image: auditoriumImage, alt: 'Asistentes reunidos en un auditorio durante un evento CONSIS', label: 'COMUNIDAD EN ACCIÓN' },
  { image: stageImage, alt: 'Presentación en el escenario de una edición anterior de CONSIS', label: 'IDEAS QUE INSPIRAN' },
  { image: speakersImage, alt: 'Equipo de participantes en el Congreso Informático UMG 2025', label: 'CONGRESO INFORMÁTICO 2025' },
  { image: congressImage, alt: 'Participantes reunidos en el escenario durante el Congreso Informático 2025', label: 'MOMENTOS QUE UNEN' },
  { image: screenImage, alt: 'Escenario del Congreso Informático 2025 con pantalla de presentación', label: 'CONOCIMIENTO COMPARTIDO' },
  { image: audienceImage, alt: 'Asistentes del Congreso Informático 2025 en el auditorio', label: 'AUDITORIO JOSUÉ' },
  { image: registrationImage, alt: 'Registro de asistentes al Congreso Informático 2025', label: 'BIENVENIDA A CONSIS' },
];

const ribbonEvents = [...pastEvents, ...pastEvents, ...pastEvents];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const eventsSectionRef = useRef(null);
  const eventsRibbonRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let frameId = 0;

    const updateRibbon = () => {
      const section = eventsSectionRef.current;
      const ribbon = eventsRibbonRef.current;

      if (!section || !ribbon) return;

      const { top, height } = section.getBoundingClientRect();
      const scrollDistance = height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -top / scrollDistance));
      ribbon.style.transform = `translate3d(${-progress * 66.667}%, 0, 0)`;
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateRibbon);
    };

    updateRibbon();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="ByteCon UMG 2026, inicio">BYTECON <span>UMG 2026</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen(!menuOpen)}>Menú <span>{menuOpen ? '−' : '+'}</span></button>
      <nav id="menu" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Navegación principal">
        <a href="#eventos" onClick={closeMenu}>Eventos</a><a href="#ponentes" onClick={closeMenu}>Ponentes</a><a href="#programa" onClick={closeMenu}>Programa</a><a href="#entradas" onClick={closeMenu} className="nav-ticket">Entradas <span>↗</span></a>
      </nav>
    </header>
    <main id="main">
      <section id="inicio" className="hero"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><p className="eyebrow">Congreso Tecnológico de Sistemas</p><h1>EL FUTURO<br />SE <em>PIENSA.</em><br />SE CONSTRUYE.</h1><div className="hero-bottom"><p>BYTECON UMG · 2026<br />TECNOLOGÍA · IDEAS · COMUNIDAD</p><a className="button button-dark" href="#entradas">Quiero estar <span>↘</span></a></div><div className="hero-number" aria-hidden="true">26</div></section>
      <section className="manifesto"><p className="section-label">[ 01 / EL CONGRESO ]</p><div><h2>Una mirada al <i>futuro de sistemas.</i></h2><p className="lead">Un espacio para aprender, crear conexiones y descubrir las ideas que están transformando el mundo tecnológico.</p></div></section>
      <section id="eventos" className="past-events" ref={eventsSectionRef}><div className="past-events-sticky"><div className="past-events-heading"><p className="section-label">[ 02 / MEMORIA ]</p><h2>Eventos<br /><i>anteriores.</i></h2><p>Desliza para recorrer los momentos que ya nos conectaron.</p></div><div className="events-window"><div className="events-ribbon" ref={eventsRibbonRef}>{ribbonEvents.map((event, index) => <figure className="event-card" key={`${event.label}-${index}`} aria-hidden={index >= pastEvents.length}><img src={event.image} alt={index < pastEvents.length ? event.alt : ''} loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><span>BYTECON UMG</span>{event.label}</figcaption></figure>)}</div></div><p className="scroll-cue" aria-hidden="true">SCROLL PARA AVANZAR <span>↓</span></p></div></section>
      <section id="ponentes" className="speakers section-dark"><div className="section-heading"><p className="section-label">[ 03 / VOCES ]</p><h2>Personas que <i>crean</i> futuro.</h2><p>Conocimiento, experiencias reales y comunidad tecnológica en un mismo lugar.</p></div><div className="speaker-grid">{speakers.map(([color, portrait, initials, name, role, city]) => <article className={`speaker ${color}`} key={name}><div className={`portrait ${portrait}`}><span>{initials}</span></div><div className="speaker-info"><p>{name}</p><span>{role}<br />{city}</span></div></article>)}</div><a className="text-link" href="#programa">Conoce al resto de la comunidad <span>→</span></a></section>
      <section id="programa" className="schedule"><div className="schedule-intro"><p className="section-label">[ 04 / PROGRAMA ]</p><h2>Ideas con<br /><i>horario.</i></h2><p>Charlas, laboratorios y conversaciones que continúan cuando se apagan los focos.</p></div><div className="schedule-list"><div className="schedule-day"><span>MIÉRCOLES</span><b>27 MAY</b></div>{talks.map(([time, title, place, type]) => <article className="talk" key={time}><time>{time}</time><div><h3>{title}</h3><p>{place}</p></div><span className="talk-type">{type}</span></article>)}<a className="button button-outline" href="#entradas">Ver programa completo <span>↗</span></a></div></section>
      <section id="experiencia" className="experience"><p className="section-label">[ 05 / MÁS ALLÁ DEL AULA ]</p><div className="experience-copy"><h2>Más que<br />un <i>congreso.</i></h2><p>Una comunidad que conversa, colabora y comparte desafíos. ByteCon reúne a quienes quieren convertir sus ideas en tecnología con impacto.</p></div><div className="sticker sticker-one">IDEAS<br />QUE<br />CONECTAN</div><div className="sticker sticker-two">HECHO<br />EN<br />COMUNIDAD</div><div className="experience-image" role="img" aria-label="Personas conversando en un evento" /></section>
      <section id="entradas" className="tickets"><p className="section-label">[ 06 / PARTICIPA ]</p><h2>Tu lugar en<br />la <i>conversación.</i></h2><div className="ticket-card"><p>BYTECON UMG 2026</p><strong>01<span>ª</span></strong><ul><li>Charlas y conferencias</li><li>Laboratorios tecnológicos</li><li>Comunidad y networking</li></ul><a href="mailto:consis@umg.edu.gt?subject=ByteCon UMG 2026" className="button button-lime">Solicitar información <span>↗</span></a></div></section>
    </main>
    <footer><p>BYTECON UMG 2026</p><p>CONGRESO TECNOLÓGICO DE SISTEMAS</p><a href="mailto:consis@umg.edu.gt">CONSIS@UMG.EDU.GT ↗</a></footer>
  </>;
}
