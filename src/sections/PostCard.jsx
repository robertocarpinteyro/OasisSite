import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const tiers = [
  {
    name: "Extra",
    recommended: false,
    productions: "1",
    reels: "2",
    photos: "—",
    price: "$5,000",
  },
];

const PostCard = () => {
  useGSAP(() => {
    gsap.fromTo('.entry-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.pricing', start: 'top 80%', once: true }
      }
    );

    gsap.fromTo('.tiers-table tbody tr',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.tiers-table', start: 'top 90%', once: true }
      }
    );

    // The pinned sections above shift scroll positions; refresh once everything
    // (including videos) has settled so these triggers fire at the right spot.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  })

  return (
    <section className="post-card pricing">
      <div className="animated-gradient-bg" />

      <div className="pricing-inner">
        {/* Paquete de entrada exclusivo */}
        <div className="entry-card">
          <span className="entry-tag">Propuesta exclusiva · Isabela Rossano</span>
          <h2>Paquete de Entrada</h2>
          <div className="entry-specs">
            <span>2 producciones/mes</span>
            <span>4 reels</span>
          </div>
          <p className="entry-price">$10,000<span>/mes</span></p>
          <p className="entry-gift">
            De regalo para Isabel: <strong>1 reel adicional</strong> y
            <strong> 20 fotografías</strong> sin costo.
          </p>
          <p className="entry-bonus">
            🎁 Bono exclusivo al contratar: incluimos una
            <strong> landing page para tu embudo de ventas</strong> acompañada de
            un <strong>reel de ventas</strong> diseñado para convertir.
          </p>
        </div>

        {/* Los 3 niveles */}
        <div className="tiers-table-wrap">
          <table className="tiers-table">
            <thead>
              <tr>
                <th>Paquete</th>
                <th>Producciones</th>
                <th>Reels</th>
                <th>Fotos</th>
                <th>Inversión</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.name} className={t.recommended ? 'row-recommended' : ''}>
                  <td className="tier-name">
                    {t.name}
                    {t.recommended && <span className="tier-flag">⭐ recomendado</span>}
                  </td>
                  <td>{t.productions}</td>
                  <td>{t.reels}</td>
                  <td>{t.photos}</td>
                  <td className="tier-invest">{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="pricing-note">
          Isabel, cada producción se entrega con la calidad premium completa —
          drone FPV, VFX, color grading y audio profesional— sin versiones
          reducidas. Precios en pesos, no incluyen IVA.
        </p>

        {/* Producción a medida, fuera de la tabla */}
        <div className="custom-card">
          <span className="custom-tag">Producción a Medida</span>
          <h3>¿Tu proyecto necesita algo único?</h3>
          <p>
            Cuando la visión supera cualquier paquete, la construimos a tu
            medida. Diseñamos cada producción alrededor de tus objetivos,
            alcance y narrativa —sin límites de formato ni de ambición— y la
            cotizamos de forma individual para que pagues exactamente por lo
            que tu marca necesita.
          </p>
          <a
            href="https://wa.me/5212217201999?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20producci%C3%B3n%20a%20medida%20con%20Oasis%20Creativa"
            target="_blank"
            rel="noreferrer"
            className="custom-cta"
          >
            Cotizar mi proyecto
          </a>
        </div>
      </div>
    </section>
  )
}

export default PostCard
