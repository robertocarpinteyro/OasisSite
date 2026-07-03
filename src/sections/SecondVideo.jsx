import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SecondVideo = () => {
  useGSAP(() => {
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
  })

  return (
    <section className="lucia">
      <div className="h-dvh">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/videos/output2.mp4"
          className="size-full object-cover second-vd"
        />
      </div>
    </section>
  )
}

export default SecondVideo
