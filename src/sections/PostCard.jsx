import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const tiers = [
  {
    name: "Impulso",
    recommended: true,
    productions: "4",
    reels: "12",
    photos: "100",
    price: "desde $22,000",
  },
  {
    name: "Referente",
    recommended: false,
    productions: "6",
    reels: "18",
    photos: "150",
    price: "desde $30,000",
  },
  {
    name: "Producción a Medida",
    recommended: false,
    productions: "por proyecto",
    reels: "—",
    photos: "—",
    price: "desde $48,000",
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
          <img
            src="https://res.cloudinary.com/dwxns5ke0/image/upload/v1782440968/Snow_white_silyb1.png"
            alt="Oasis Creativa"
            className="entry-logo"
          />
          <span className="entry-tag">Exclusivo · solo para [Cliente]</span>
          <h2>Paquete de Entrada</h2>
          <div className="entry-specs">
            <span>2 producciones/mes</span>
            <span>6 reels</span>
            <span>50 fotos</span>
          </div>
          <p className="entry-price">$10,000<span>/mes</span></p>
        </div>

        {/* Los 3 niveles */}
        <div className="tiers-table-wrap">
          <table className="tiers-table">
            <thead>
              <tr>
                <th>Paquete</th>
                <th>Producciones/mes</th>
                <th>Reels</th>
                <th>Fotos</th>
                <th>Inversión mensual</th>
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
          Todas las producciones incluyen la calidad premium completa
          (drone FPV, VFX, color grading, etc.).
        </p>
      </div>
    </section>
  )
}

export default PostCard
