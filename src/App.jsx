import { useEffect, useRef, useState } from 'react';
import auditoriumImage from '../media/WhatsApp Image 2026-08-08 at 2.41.44 PM (1).jpeg';
import stageImage from '../media/WhatsApp Image 2026-08-08 at 2.41.44 PM.jpeg';
import speakersImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM.jpeg';
import congressImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (1).jpeg';
import screenImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (2).jpeg';
import audienceImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (3).jpeg';
import registrationImage from '../media/WhatsApp Image 2026-08-08 at 2.54.20 PM (4).jpeg';
import logoImage from '../media/Logo.jpg';

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
  { image: speakersImage, alt: 'Equipo de participantes en el Congreso Informático UMG 2026', label: 'CONGRESO INFORMÁTICO 2026' },
  { image: congressImage, alt: 'Participantes reunidos en el escenario durante el Congreso Informático 2026', label: 'MOMENTOS QUE UNEN' },
  { image: screenImage, alt: 'Escenario del Congreso Informático 2026 con pantalla de presentación', label: 'CONOCIMIENTO COMPARTIDO' },
  { image: audienceImage, alt: 'Asistentes del Congreso Informático 2026 en el auditorio', label: 'AUDITORIO JOSUÉ' },
  { image: registrationImage, alt: 'Registro de asistentes al Congreso Informático 2026', label: 'BIENVENIDA A CONSIS' },
];

const ribbonEvents = [...pastEvents, ...pastEvents, ...pastEvents];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const announcementRef = useRef(null);
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

  useEffect(() => {
    const announcement = announcementRef.current;
    if (!announcement) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setAnnouncementVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(announcement);
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="ByteCon UMG 2026, inicio"><img src={logoImage} alt="" />BYTECON <span>UMG 2026</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen(!menuOpen)}>Menú <span>{menuOpen ? '−' : '+'}</span></button>
      <nav id="menu" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Navegación principal">
        <a href="#eventos" onClick={closeMenu}>Eventos</a><a href="#ponentes" onClick={closeMenu}>Ponentes</a><a href="#programa" onClick={closeMenu}>Programa</a><a href="#entradas" onClick={closeMenu} className="nav-ticket">Entradas <span>↗</span></a><div className="social-links" aria-label="Redes sociales"><span aria-label="Facebook, próximamente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3.1Z" /></svg></span><span aria-label="Instagram, próximamente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.9 1.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5ZM12 6.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" /></svg></span></div>
      </nav>
    </header>
    <main id="main">
      <section id="inicio" className="hero"><iframe className="hero-video" src="https://www.youtube-nocookie.com/embed/pv7D22EGzzg?autoplay=1&mute=1&loop=1&playlist=pv7D22EGzzg&controls=0&playsinline=1&rel=0" title="Video de ByteCon UMG" allow="autoplay" aria-hidden="true" tabIndex="-1" /><div className="hero-overlay" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><p className="eyebrow">Congreso Tecnológico 2026</p><h1>EL FUTURO<br />SE <em>PIENSA.</em><br />SE CONSTRUYE.</h1><div className="hero-bottom"><p>UNIVERSIDAD MARIANO GÁLVEZ<br />CENTRO UNIVERSITARIO SAN JOSÉ PINULA<br />17 DE OCTUBRE 2026 · FUN PARK</p><a className="button button-dark" href="#entradas">Quiero estar <span>↘</span></a></div><div className="hero-number" aria-hidden="true">26</div></section>
      <section className={`announcement${announcementVisible ? ' announcement-visible' : ''}`} ref={announcementRef} aria-label="Anuncio del evento"><img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Anuncio.png" alt="ByteCon UMG 2026: El futuro está cargando. 17 de octubre de 2026." /></section>
      <section className="manifesto"><p className="section-label">[ 01 / EL CONGRESO ]</p><div><h2>Una mirada al <i>futuro de sistemas.</i></h2><p className="lead">Un espacio académico e innovador que se llevará a cabo el día 17 de octubre del presente año. El evento se realizará en FUNPARK (Santa Lucía Los Ocotes, Zona 25, Ciudad de Guatemala). Este evento reunirá a estudiantes, catedráticos y profesionales de las ciencias de la computación y sistemas con el objetivo de intercambiar conocimientos sobre las últimas tendencias, innovaciones y herramientas tecnológicas que están transformando el sector.</p></div><div className="event-highlights" aria-label="Datos relevantes del evento"><article><strong>+1000</strong><span>Asistentes<br />presenciales</span></article><article><strong>+30</strong><span>Speakers<br />líderes</span></article><article><strong>+30</strong><span>Conferencias<br />especializadas</span></article><article><strong>+3</strong><span>Paneles<br />empresariales</span></article><article><strong>+6</strong><span>Talleres<br />prácticos</span></article><article><strong>+</strong><span>Salas de<br />networking</span></article></div></section>
      <section id="ponentes" className="speakers section-dark"><div className="section-heading"><p className="section-label">[ 03 / VOCES ]</p><h2>Personas que <i>crean</i> futuro.</h2><p>Conocimiento, experiencias reales y comunidad tecnológica en un mismo lugar.</p></div><div className="speaker-grid">{speakers.map(([color, portrait, initials, name, role, city]) => <article className={`speaker ${color}`} key={name}><div className={`portrait ${portrait}`}><span>{initials}</span></div><div className="speaker-info"><p>{name}</p><span>{role}<br />{city}</span></div></article>)}</div><a className="text-link" href="#programa">Conoce al resto de la comunidad <span>→</span></a></section>
      <section id="programa" className="schedule"><header className="schedule-header"><p className="section-label">[ 04 / PROGRAMA ]</p><h2>Programa del <i>evento.</i></h2><div><time dateTime="2026-10-17">17 de octubre de 2026</time><a className="schedule-calendar" href="#entradas">Añadir al calendario</a></div></header><div className="schedule-list"><p className="schedule-break">Bienvenida · 09:30</p>{talks.map(([time, title, place, type], index) => <article className={`talk${index === 0 ? ' featured-talk' : ''}`} key={time}><time>{time}</time><div><p className="talk-type">{type}</p><h3>{title}</h3><p>{place}</p></div></article>)}<p className="schedule-break">Pausa de café · 14:00</p></div></section>
      <section id="experiencia" className="experience"><p className="section-label">[ 05 / MÁS ALLÁ DEL AULA ]</p><div className="experience-copy"><h2>Más que<br />un <i>congreso.</i></h2><p>Una comunidad que conversa, colabora y comparte desafíos. ByteCon reúne a quienes quieren convertir sus ideas en tecnología con impacto.</p></div><div className="sticker sticker-one">IDEAS<br />QUE<br />CONECTAN</div><div className="sticker sticker-two">HECHO<br />EN<br />COMUNIDAD</div><div className="experience-image" role="img" aria-label="Personas conversando en un evento" /></section>
      <section id="entradas" className="tickets"><p className="section-label">[ 06 / PARTICIPA ]</p><h2>Tu lugar en<br />la <i>conversación.</i></h2><article className="ticket-card"><header><p>ETNRADA</p></header><strong>Q. 250</strong><ul><li>Acceso a todas las conferencias</li><li>Welcome kit</li><li>Coffee break Y Almuerzo</li><li>Acceso a las areas de recreación</li></ul><a href="https://tally.so/r/dWGE6z" target="_blank" rel="noopener noreferrer" className="button button-outline">Comprar aquí <span>↗</span></a></article></section>
      <section id="eventos" className="past-events" ref={eventsSectionRef}><div className="past-events-sticky"><div className="past-events-heading"><p className="section-label">[ 02 / MEMORIA ]</p><h2>Así vivimos <br /><i>la edicion 2025</i></h2><p>Desliza para recorrer los momentos que ya nos conectaron.</p></div><div className="events-window"><div className="events-ribbon" ref={eventsRibbonRef}>{ribbonEvents.map((event, index) => <figure className="event-card" key={`${event.label}-${index}`} aria-hidden={index >= pastEvents.length}><img src={event.image} alt={index < pastEvents.length ? event.alt : ''} loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><span>BYTECON UMG</span>{event.label}</figcaption></figure>)}</div></div><p className="scroll-cue" aria-hidden="true">SCROLL PARA AVANZAR <span>↓</span></p></div></section>
    </main>
    <footer><p>BYTECON UMG 2026</p><p>CONGRESO TECNOLÓGICO DE SISTEMAS.</p><a href="mailto:consis@umg.edu.gt">CONSIS@UMG.EDU.GT ↗</a></footer>
    <a className="whatsapp-button" href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.1 19.8L3 29l6.4-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.5.7c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.7l.4-.5.2-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.3s.9 2.7 1 2.9c.1.2 1.8 2.8 4.3 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z" /></svg></a>
  </>;
}
