import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Jason = () => {
  useGSAP(() => {
    gsap.set('.jason', { marginTop: '-80vh' });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.jason',
        start: 'top 90%',
        end: '10% center',
        scrub: 2,
      }
    }).to('.first-vd', { opacity: 0, duration: 1, ease: 'power1.inOut' });

    gsap.fromTo('.jason .pillar',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.jason .pillars', start: 'top 95%', once: true }
      }
    )
  })

  return (
    <section className="jason">
      <div className="jason-content">
        <h1>Marca Blanca</h1>
        <h2>Tú al frente. Nosotros, invisibles.</h2>
        <p>
          Tú vendes los servicios como propios; Oasis produce detrás, de forma
          invisible. Tu cliente solo ve tu marca — la producción premium ocurre
          tras bambalinas.
        </p>

        <div className="pillars">
          <div className="pillar">
            <span className="pillar-num">01</span>
            <h3>Tu marca al frente</h3>
            <p>Todo se entrega bajo tu identidad.</p>
          </div>
          <div className="pillar">
            <span className="pillar-num">02</span>
            <h3>Producción premium garantizada</h3>
            <p>La calidad de Oasis en cada pieza.</p>
          </div>
          <div className="pillar">
            <span className="pillar-num">03</span>
            <h3>Tú defines tus precios</h3>
            <p>El margen de reventa es tuyo.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jason
