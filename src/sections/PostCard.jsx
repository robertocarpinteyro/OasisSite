import gsap from "gsap";
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
    gsap.from('.entry-card', {
      scrollTrigger: { trigger: '.pricing', start: 'top 75%' },
      y: 60, opacity: 0, duration: 1, ease: 'power2.out'
    });

    gsap.from('.tier-card', {
      scrollTrigger: { trigger: '.tiers', start: 'top 80%' },
      y: 80, opacity: 0, stagger: 0.18, duration: 1, ease: 'power2.out'
    });
  })

  return (
    <section className="post-card pricing">
      <div className="animated-gradient-bg" />

      <div className="pricing-inner">
        {/* Paquete de entrada exclusivo */}
        <div className="entry-card">
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
        <div className="tiers">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`tier-card${t.recommended ? ' tier-recommended' : ''}`}
            >
              {t.recommended && <span className="tier-badge">⭐ Recomendado</span>}
              <h3>{t.name}</h3>
              <ul>
                <li><strong>{t.productions}</strong> producciones/mes</li>
                <li><strong>{t.reels}</strong> reels</li>
                <li><strong>{t.photos}</strong> fotos</li>
              </ul>
              <p className="tier-price">{t.price}</p>
            </div>
          ))}
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
