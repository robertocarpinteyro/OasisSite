import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useRef } from "react"

import { usePreload } from '../PreloadContext';

const FirstVideo = () => {
  const videoRef = useRef(null);
  const { ready, sources } = usePreload();

  useGSAP(() => {
    if (!ready) return;

    gsap.set('.first-vd-wrapper', { marginTop: '-150vh', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.first-vd-wrapper',
        start: 'top top',
        end: '+=200% top',
        scrub: true,
        pin: true,
      }
    })

    tl.to('.hero-section', { delay: 0.5, opacity: 0, ease: 'power1.inOut' });
    tl.to('.first-vd-wrapper', { opacity: 1, duration: 2, ease: 'power1.inOut' });

    const addSeek = () => {
      tl.to(videoRef.current, { currentTime: videoRef.current.duration, duration: 3, ease: 'none' }, '<');
      ScrollTrigger.refresh();
    };
    if (videoRef.current.readyState >= 1) addSeek();
    else videoRef.current.onloadedmetadata = addSeek;
  }, { dependencies: [ready] });

  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh flex-center">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src={ready ? sources.output1 : undefined}
          className="first-vd"
        />
      </div>
    </section>
  )
}

export default FirstVideo
