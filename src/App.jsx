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
  ['speaker-yellow', 'portrait-1', 'Carlos Adolfo Monterroso Martinez', 'Más allá de la Inteligencia Artificial Generativa', 'https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Expositores/Expositor1.jpg'],
  ['speaker-pink', 'portrait-2', 'Juan Carlos Sicaja Lutin', 'Ciberseguridad + IA', 'https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Expositores/Expositor2.png'],
  ['speaker-blue', 'portrait-3', 'Jose Rolando Morales Batres', 'Las Mejores Prácticas de Licenciamiento de Software', 'https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Expositores/Expositor3.jpg'],
];

const talks = [
  ['7:00', 'Registro', 'Registro y acceso a todos los estudiantes', '30 min'],
  ['7:30', 'Bienvenida', 'Bienvenida y presentación de la actividad', '15 min'],
  ['7:45', '1er Conferencista', 'Tema 1', '30 min'],
  ['8:15', 'Transición', 'Cambio de actividad y preparación', '15 min'],
  ['8:30', 'Desayuno', 'Espacio donde los estudiantes pueden desayunar', '45 min'],
  ['9:15', 'Tiempo de holgura', 'Tiempo para que los estudiantes regresen a sus lugares y continúen la actividad', '15 min'],
  ['9:30', '2do Conferencista', 'Tema 2', '30 min'],
  ['10:00', 'Transición', 'Cambio a la siguiente conferencia y preparación del espacio', '15 min'],
  ['10:15', '3ro Conferencista', 'Tema 3', '30 min'],
  ['10:45', 'Transición', 'Cambio a la siguiente conferencia y preparación del espacio', '15 min'],
  ['11:00', '4to Conferencista', 'Tema 4', '30 min'],
  ['11:30', 'Transición', 'Cambio a la siguiente conferencia y preparación del espacio', '15 min'],
  ['11:45', '5to Conferencista', 'Tema 5', '30 min'],
  ['12:15', 'Transición', 'Cambio de actividad y preparación', '15 min'],
  ['12:30', 'Almuerzo', 'Espacio donde los estudiantes pueden almorzar', '1 h'],
  ['13:30', 'Actividad y final de evento', 'Actividad del parque', '2 h 30 min'],
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
  const [socialMenuOpen, setSocialMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [raffleModalOpen, setRaffleModalOpen] = useState(false);
  const announcementRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const eventsRibbonRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRaffleModalOpen(true), 5_000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!raffleModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setRaffleModalOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [raffleModalOpen]);

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

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.15 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="ByteCon UMG 2026, inicio"><img src={logoImage} alt="" />BYTECON <span>UMG 2026</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen(!menuOpen)}>Menú <span>{menuOpen ? '−' : '+'}</span></button>
      <nav id="menu" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Navegación principal">
        <a href="#eventos" onClick={closeMenu}>Eventos</a><a href="#ponentes" onClick={closeMenu}>Ponentes</a><a href="#programa" onClick={closeMenu}>Programa</a><a href="#entradas" onClick={closeMenu} className="nav-ticket">Entradas <span>↗</span></a><div className="social-links" aria-label="Redes sociales"><a className="facebook-link" href="https://www.facebook.com/byteconumg/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de ByteCon UMG"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3.1Z" /></svg></a><a className="instagram-link" href="https://www.instagram.com/byteconumg/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de ByteCon UMG"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.9 1.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5ZM12 6.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" /></svg></a></div>
      </nav>
    </header>
    <main id="main">
      {/* <section id="inicio" className="hero"><iframe className="hero-video" src="https://www.youtube-nocookie.com/embed/pv7D22EGzzg?autoplay=1&mute=1&loop=1&playlist=pv7D22EGzzg&controls=0&playsinline=1&rel=0" title="Video de ByteCon UMG" allow="autoplay" aria-hidden="true" tabIndex="-1" /><div className="hero-overlay" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><p className="eyebrow">Congreso Tecnológico 2026</p><h1>EL FUTURO<br />SE <em>PIENSA.</em><br />SE CONSTRUYE.</h1><div className="hero-bottom"><p>UNIVERSIDAD MARIANO GÁLVEZ<br />CENTRO UNIVERSITARIO SAN JOSÉ PINULA<br />17 DE OCTUBRE 2026 · FUN PARK</p><a className="button button-dark" href="#entradas">Quiero estar <span>↘</span></a></div><div className="hero-number" aria-hidden="true">26</div></section> */}
      <section id="inicio" className="hero"><iframe className="hero-video" src="https://www.youtube.com/embed/H1suqOUnwyI?si=UgHTQbNyBwulRgk2&autoplay=1&mute=1&playlist=H1suqOUnwyI&loop=1&&controls=0&playsinline=1&rel=0" title="Video de ByteCon UMG" allow="autoplay" aria-hidden="true" tabIndex="-1" /><div className="hero-overlay" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><p className="eyebrow">Congreso Tecnológico 2026</p><h1>EL FUTURO<br />SE <em>PIENSA.</em><br />SE CONSTRUYE.</h1><div className="hero-bottom"><p>UNIVERSIDAD MARIANO GÁLVEZ<br />CENTRO UNIVERSITARIO SAN JOSÉ PINULA<br />17 DE OCTUBRE 2026 · FUN PARK</p><a className="button button-dark" href="#entradas">Quiero estar <span>↘</span></a></div><div className="hero-number" aria-hidden="true">26</div></section>
      <section className={`announcement${announcementVisible ? ' announcement-visible' : ''}`} ref={announcementRef} aria-label="Anuncio del evento"><img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Anuncio.png" alt="ByteCon UMG 2026: El futuro está cargando. 17 de octubre de 2026." /></section>
      <section className="manifesto"><p className="section-label" data-reveal>[ 01 / EL CONGRESO ]</p><div data-reveal><h2>Una mirada al <i>futuro de sistemas.</i></h2><p className="lead">Un espacio académico e innovador que se llevará a cabo el día 17 de octubre del presente año. El evento se realizará en FUNPARK (Santa Lucía Los Ocotes, Zona 25, Ciudad de Guatemala). Este evento reunirá a estudiantes, catedráticos y profesionales de las ciencias de la computación y sistemas con el objetivo de intercambiar conocimientos sobre las últimas tendencias, innovaciones y herramientas tecnológicas que están transformando el sector.</p></div><div className="event-highlights" data-reveal aria-label="Datos relevantes del evento"><article><strong>+300</strong><span>Asistentes<br />presenciales</span></article><article><strong>+5</strong><span>Speakers<br />líderes</span></article><article><strong>+6</strong><span>Horas de Conferencias<br />especializadas</span></article><article><strong>+20</strong><span>Docentes<br />de UMG</span></article></div></section>
      <section id="ponentes" className="speakers section-dark"><div className="section-heading" data-reveal><p className="section-label">[ 03 / VOCES ]</p><h2>Personas que <i>crean</i> futuro.</h2><p>Conocimiento, experiencias reales y comunidad tecnológica en un mismo lugar.</p></div><div className="speaker-grid" data-reveal>{speakers.map(([color, portrait, name, topic, image]) => <article className={`speaker ${color}`} key={image}><div className={`portrait ${portrait}`}><img src={image} alt={`Fotografía de ${name}`} /></div><div className="speaker-info"><p>{name}</p><span>{topic}</span></div></article>)}</div><a className="text-link" data-reveal href="#programa">Conoce al resto de la comunidad <span>→</span></a></section>
      <section className="sponsors"><div className="sponsors-heading" data-reveal><p className="section-label">[ 04 / ALIANZAS ]</p><h2>Patrocinadores que<br /><i>impulsan</i> el futuro.</h2></div><div className="sponsor-grid" data-reveal>{/* <article className="sponsor-card"><img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Claro_logo_(2017).svg" alt="Claro" /></article> */}<article className="sponsor-card"><img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/FunPark_logo.png" alt="FunPark" /></article><article className="sponsor-card"><img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/Patrocinadores/WhatsApp+Image+2026-08-29+at+12.25.23+PM.jpeg" alt="Patrocinador de ByteCon UMG" /></article></div></section>
      <section id="programa" className="schedule"><header className="schedule-header" data-reveal><p className="section-label">[ 04 / PROGRAMA ]</p><h2>Programa del <i>evento.</i></h2><div><time dateTime="2026-10-17">17 de octubre de 2026</time><a className="schedule-calendar" href="#entradas">Añadir al calendario</a></div></header><div className="schedule-list" data-reveal>{talks.map(([time, title, description, duration], index) => <article className={`talk${index === 0 ? ' featured-talk' : ''}`} key={`${time}-${title}`}><time>{time}</time><div><p className="talk-type">{duration}</p><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
      <section id="experiencia" className="experience"><p className="section-label" data-reveal>[ 05 / MÁS ALLÁ DEL AULA ]</p><div className="experience-copy" data-reveal><h2>Más que<br />un <i>congreso.</i></h2><p>Una comunidad que conversa, colabora y comparte desafíos. ByteCon reúne a quienes quieren convertir sus ideas en tecnología con impacto.</p></div><div className="sticker sticker-one">IDEAS<br />QUE<br />CONECTAN</div><div className="sticker sticker-two">HECHO<br />EN<br />COMUNIDAD</div><div className="experience-image" data-reveal role="img" aria-label="Personas conversando en un evento" /></section>
      <section id="entradas" className="tickets"><p className="section-label" data-reveal>[ 06 / PARTICIPA ]</p><h2 data-reveal>Tu lugar en<br />la <i>conversación.</i></h2><article className="ticket-card" data-reveal><header><p>ENTRADA</p></header><strong>Q. 250.00</strong><ul><li>Acceso a todas las conferencias</li><li>Welcome kit</li><li>Desayuno Y Almuerzo</li><li>Acceso a las areas de recreación</li></ul><a href="https://tickets.jaz-systems.com/" target="_blank" rel="noopener noreferrer" className="button button-outline">Comprar aquí <span>↗</span></a></article></section>
      <section className="venue"><p className="section-label" data-reveal>[ 07 / LA SEDE ]</p><div className="venue-grid"><article className="venue-info" data-reveal><h2>Conoce<br />la <i>sede.</i></h2><p>La información detallada del lugar estará disponible próximamente.</p></article><article className="venue-media" data-reveal><span>Imágenes y videos<br />próximamente</span></article></div><div className="venue-map" data-reveal><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d123541.1010122543!2d-90.5033112!3d14.6184681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589bd06c6e04e73%3A0x99afcc187f0be7cb!2sFun%20Park%20%7C%20Go%20Karts%20%26%20Adventure!5e0!3m2!1ses!2sgt!4v1786650216837!5m2!1ses!2sgt" title="Mapa de Fun Park" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section>
      <section id="eventos" className="past-events" ref={eventsSectionRef}><div className="past-events-sticky"><div className="past-events-heading"><p className="section-label">[ 02 / MEMORIA ]</p><h2>Así vivimos <br /><i>la edicion 2025</i></h2><p>Desliza para recorrer los momentos que ya nos conectaron.</p></div><div className="events-window"><div className="events-ribbon" ref={eventsRibbonRef}>{ribbonEvents.map((event, index) => <figure className="event-card" key={`${event.label}-${index}`} aria-hidden={index >= pastEvents.length}><img src={event.image} alt={index < pastEvents.length ? event.alt : ''} loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><span>BYTECON UMG</span>{event.label}</figcaption></figure>)}</div></div><p className="scroll-cue" aria-hidden="true">SCROLL PARA AVANZAR <span>↓</span></p></div></section>
    </main>
    <footer><p>BYTECON UMG 2026</p><p>CONGRESO TECNOLÓGICO DE SISTEMAS.</p><a href="mailto:consis@umg.edu.gt">CONSIS@UMG.EDU.GT ↗</a></footer>
    {raffleModalOpen && <div className="raffle-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setRaffleModalOpen(false); }}>
      <section className="raffle-modal" role="dialog" aria-modal="true" aria-labelledby="raffle-title" aria-describedby="raffle-description">
        <button className="raffle-modal-close" type="button" onClick={() => setRaffleModalOpen(false)} aria-label="Cerrar noticia" autoFocus>×</button>
        <div className="raffle-modal-heading"><p>[ NOTICIA / BYTECON UMG ]</p><h2 id="raffle-title">Primera rifa - <i>Smartphone</i></h2></div>
        <div className="raffle-modal-content">
          <div id="raffle-description" className="raffle-modal-copy"><p>El día sábado 22 de agosto se llevó a cabo nuestra primera rifa para recaudar fondos que nos ayudarán a lograr nuestro objetivo: financiar la ByteCon UMG 2026, conferencia tecnológica organizada por los alumnos del curso Seminario de Tecnologías de Información.</p><p>La rifa se realizó en la cafetería a la 1:00 p. m. con el apoyo de todos los presentes. Nuestro compañero Cristian Ramos fue el afortunado ganador de un smartphone.</p><p><strong>Agradecemos a todos los participantes que colaboraron con la compra de los números.</strong> Sigan pendientes de los próximos eventos que estaremos organizando.</p></div>
          <div className="raffle-modal-media">
            <video controls preload="metadata" poster="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/rifa_20260822/WhatsApp+Image+2026-08-22+at+1.41.39+PM.jpeg"><source src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/rifa_20260822/WhatsApp+Video+2026-08-22+at+1.15.11+PM.mp4" type="video/mp4" />Tu navegador no puede reproducir este video.</video>
            <img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/rifa_20260822/WhatsApp+Image+2026-08-22+at+1.41.39+PM+(1).jpeg" alt="Participantes de la primera rifa de ByteCon UMG" />
            <img src="https://desarrolloweb.s3.us-east-1.amazonaws.com/ByteConUMG/rifa_20260822/WhatsApp+Image+2026-08-22+at+1.41.39+PM.jpeg" alt="Ganador de la primera rifa de ByteCon UMG" />
          </div>
        </div>
        <button className="raffle-modal-button" type="button" onClick={() => setRaffleModalOpen(false)}>Cerrar noticia <span>×</span></button>
      </section>
    </div>}
    <div className={`floating-socials${socialMenuOpen ? ' open' : ''}`}><a className="scroll-top-button" href="#inicio" aria-label="Volver al inicio">↑</a><div id="floating-social-menu" className="floating-social-menu" aria-hidden={!socialMenuOpen}><a className="floating-facebook" href="https://www.facebook.com/byteconumg/" target="_blank" rel="noopener noreferrer" onClick={() => setSocialMenuOpen(false)} aria-label="Facebook de ByteCon UMG"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3.1Z" /></svg></a><a className="floating-instagram" href="https://www.instagram.com/byteconumg/" target="_blank" rel="noopener noreferrer" onClick={() => setSocialMenuOpen(false)} aria-label="Instagram de ByteCon UMG"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.9 1.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5ZM12 6.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" /></svg></a><a className="whatsapp-button" href="https://wa.me/50239535682" target="_blank" rel="noopener noreferrer" onClick={() => setSocialMenuOpen(false)} aria-label="Abrir WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.1 19.8L3 29l6.4-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.5.7c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.7l.4-.5.2-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.3s.9 2.7 1 2.9c.1.2 1.8 2.8 4.3 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z" /></svg></a></div><button className="social-toggle" type="button" aria-expanded={socialMenuOpen} aria-controls="floating-social-menu" onClick={() => setSocialMenuOpen(!socialMenuOpen)}>{socialMenuOpen ? '−' : '+'}</button></div>
  </>;
}
