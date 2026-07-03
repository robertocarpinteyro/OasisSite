import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { useRef } from "react";

import { usePreload } from '../PreloadContext';

const Final = () => {
  const videoRef = useRef(null);
  const { ready, sources } = usePreload();

  useGSAP(() => {
    if (!ready) return;

    gsap.set('.final-content', { opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.final',
        start: 'top top',
        end: '90% top',
        scrub: true,
        pin: true,
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.final',
        start: 'top 80%',
        end: '90% top',
        scrub: true,
      }
    })

    tl.to('.final-content', { opacity: 1, duration: 1, scale: 1, ease: 'power1.inOut' });

    const addSeek = () => {
      tl.to(videoRef.current, { currentTime: videoRef.current.duration, duration: 3, ease: 'none' }, '<');
      ScrollTrigger.refresh();
    };
    if (videoRef.current.readyState >= 1) addSeek();
    else videoRef.current.onloadedmetadata = addSeek;
  }, { dependencies: [ready] });

  return (
    <section className="final">
      <div className="final-content size-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src={ready ? sources.output3 : undefined}
          className="size-full object-cover"
        />
      </div>
    </section>
  )
}

export default Final
