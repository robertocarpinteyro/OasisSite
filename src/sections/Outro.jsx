import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Outro = () => {
  useGSAP(() => {
    gsap.set('.final-message', { marginTop: '-100vh', opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.final-message',
        start: 'top 30%',
        end: 'top 10%',
        scrub: true,
      }
    })

    tl.to('.final-content', { opacity: 0, duration: 1, ease: 'power1.inOut' })
    tl.to('.final-message', { opacity: 1, duration: 1, ease: 'power1.inOut' })
  })

  return (
    <section className="final-message">
      <div className="h-full col-center gap-12 px-6 text-center">
        <h3 className="gradient-title">
          Lancemos tu marca <br /> con producción <br /> de otro nivel.
        </h3>

        <div className="flex-center gap-5 flex-wrap">
          <a href="#" className="cta-pill cta-primary">Agendar reunión</a>
          <a href="#" className="cta-pill cta-secondary">Solicitar propuesta formal</a>
        </div>

        <footer className="outro-footer">
          <img
            src="https://res.cloudinary.com/dwxns5ke0/image/upload/v1782440968/Snow_white_silyb1.png"
            alt="Oasis Creativa"
            className="md:w-48 w-36"
          />
          <div className="footer-contact">
            <a href="mailto:hola@oasiscreativa.com">hola@oasiscreativa.com</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Outro