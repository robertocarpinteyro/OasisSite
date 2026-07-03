import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useMaskSettings } from '../../constants';
import ComingSoon from "./ComingSoon"

// Secuencia de clips del fondo: primero el vertical, luego el horizontal.
const HERO_CLIPS = [
  {
    src: "https://res.cloudinary.com/dxcr9utre/video/upload/v1783103607/reel1_d1nzzx.mp4",
    orientation: "vertical",
  },
  {
    src: "https://res.cloudinary.com/dxcr9utre/video/upload/v1783103447/reel2_rmmept.mp4",
    orientation: "horizontal",
  },
];

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();
  // En móvil el logo (horizontal) no encaja como máscara sobre una pantalla
  // vertical y termina ocultando el video. Ahí mostramos el video directo.
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [clipIndex, setClipIndex] = useState(0);
  const clip = HERO_CLIPS[clipIndex];

  // Al terminar un clip, avanza al siguiente (y vuelve al inicio en bucle).
  const handleEnded = () => {
    setClipIndex((i) => (i + 1) % HERO_CLIPS.length);
  };

  useGSAP(() => {
    if (isMobile) {
      // Sin máscara: el video se ve completo desde el inicio.
      gsap.set('.mask-wrapper', { maskImage: 'none', webkitMaskImage: 'none' });
    } else {
      gsap.set('.mask-wrapper', {
        maskPosition: initialMaskPos,
        maskSize: initialMaskSize,
      });
    }

    gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });

    gsap.set('.entrance-message', { marginTop: '0vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        scrub: 2.5,
        end: '+=200%',
        pin: true,
      }
    })

    tl.to('.fade-out', { opacity: 0, ease: 'power1.inOut' })

    // El revelado por logo solo aplica en desktop/tablet.
    if (!isMobile) {
      tl.to('.scale-out', { scale: 1, ease: 'power1.inOut' })
        .to('.mask-wrapper', { maskSize, ease: 'power1.inOut' }, '<');
    }

    tl.to('.mask-wrapper', { opacity: 0 })
      .to('.overlay-logo', { opacity: 1, onComplete: () => {
        gsap.to('.overlay-logo', { opacity: 0 });
      } }, '<')
      .to('.entrance-message', { duration: 1, ease: 'power1.inOut', maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)' }, '<')
  }, { dependencies: [isMobile] });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        {/* Fondo desenfocado — mismo clip cubriendo toda la pantalla */}
        <video
          key={`bg-${clipIndex}`}
          src={clip.src}
          autoPlay
          muted
          playsInline
          className="hero-video-bg"
        />
        {/* Video principal centrado y nítido; onEnded encadena al siguiente */}
        <video
          key={`main-${clipIndex}`}
          src={clip.src}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          data-orientation={clip.orientation}
          className="scale-out hero-video"
        />
        <div className="hero-side-left" />
        <div className="hero-side-right" />
      </div>

      <div>
        <img src="/images/big-hero-text.svg" alt="logo" className="size-full object-cover mask-logo" />
      </div>

      <div className="fake-logo-wrapper">
        <img src="/images/big-hero-text.svg" className="overlay-logo" />
      </div>

      <ComingSoon />
    </section>
  )
}

export default Hero
