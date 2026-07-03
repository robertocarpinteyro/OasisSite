import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { usePreload } from '../PreloadContext';

const SecondVideo = () => {
  const videoRef = useRef();
  const { ready, sources } = usePreload();

  useGSAP(() => {
    if (!ready) return;

    gsap.set('.lucia', { marginTop: '-60vh', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.lucia',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
        pin: true
      }
    })

    tl.to('.lucia', { opacity: 1, duration: 1, ease: 'power1.inOut' })

    const addSeek = () => {
      tl.to(videoRef.current, { currentTime: videoRef.current.duration, duration: 3, ease: 'none' }, '<')
      ScrollTrigger.refresh();
    };
    if (videoRef.current.readyState >= 1) addSeek();
    else videoRef.current.onloadedmetadata = addSeek;
  }, { dependencies: [ready] })

  return (
    <section className="lucia">
      <div className="h-dvh">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src={ready ? sources.output2 : undefined}
          className="size-full object-cover second-vd"
        />
      </div>
    </section>
  )
}

export default SecondVideo
