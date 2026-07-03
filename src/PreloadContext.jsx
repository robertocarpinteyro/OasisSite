import { createContext, useContext, useEffect, useState } from "react";

// Videos que se "scrubean" con el scroll: se descargan completos como blob
// para que el seek por currentTime sea fluido (sin brincar entre keyframes).
const SCRUB_VIDEOS = {
  output1: "/videos/output1.mp4",
  output2: "/videos/output2.mp4",
  output3: "/videos/output3.mp4",
};

// Video del hero (Cloudinary) — solo se espera a que pueda reproducirse.
const HERO_VIDEO =
  "https://res.cloudinary.com/dxcr9utre/video/upload/v1783103607/reel1_d1nzzx.mp4";

const PreloadContext = createContext({
  ready: false,
  progress: 0,
  sources: SCRUB_VIDEOS,
});

export const usePreload = () => useContext(PreloadContext);

export const PreloadProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sources, setSources] = useState(SCRUB_VIDEOS);

  useEffect(() => {
    let cancelled = false;
    const objectUrls = [];

    const fetchAsBlob = async (key, url) => {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const objUrl = URL.createObjectURL(blob);
        objectUrls.push(objUrl);
        return [key, objUrl];
      } catch {
        // Si falla la descarga, se usa la ruta original.
        return [key, url];
      }
    };

    const preloadHero = () =>
      new Promise((resolve) => {
        const v = document.createElement("video");
        v.muted = true;
        v.preload = "auto";
        v.src = HERO_VIDEO;
        const done = () => resolve();
        v.oncanplaythrough = done;
        v.onerror = done;
        // Red de seguridad por si el evento no dispara.
        setTimeout(done, 6000);
      });

    const run = async () => {
      const tasks = Object.entries(SCRUB_VIDEOS).map(([k, u]) =>
        fetchAsBlob(k, u)
      );
      const total = tasks.length + 1; // + hero
      let completed = 0;
      const bump = () => {
        completed += 1;
        if (!cancelled) setProgress(Math.round((completed / total) * 100));
      };

      const results = await Promise.all(
        tasks.map((p) => p.then((r) => (bump(), r)))
      );
      await preloadHero().then(bump);

      if (cancelled) return;
      const next = { ...SCRUB_VIDEOS };
      results.forEach(([k, v]) => (next[k] = v));
      setSources(next);
      setReady(true);
    };

    run();

    // Nunca dejar la pantalla de carga colgada más de 12s.
    const hardTimeout = setTimeout(() => !cancelled && setReady(true), 12000);

    return () => {
      cancelled = true;
      clearTimeout(hardTimeout);
      objectUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  return (
    <PreloadContext.Provider value={{ ready, progress, sources }}>
      {children}
    </PreloadContext.Provider>
  );
};
