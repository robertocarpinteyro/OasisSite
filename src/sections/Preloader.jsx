import { useEffect, useState } from "react";

// Splash con el logo mientras cargan los recursos pesados (videos).
// Se oculta cuando la ventana termina de cargar o tras un tope de seguridad.
const Preloader = () => {
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const finish = () => setReady(true);

    if (document.readyState === "complete") {
      // Da un pequeño margen para que el hero empiece a reproducirse.
      const t = setTimeout(finish, 1200);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", finish);
    const hardTimeout = setTimeout(finish, 10000);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(hardTimeout);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setHidden(true), 800);
      return () => clearTimeout(t);
    }
  }, [ready]);

  if (hidden) return null;

  return (
    <div className={`preloader ${ready ? "preloader-hide" : ""}`}>
      <img
        src="https://res.cloudinary.com/dwxns5ke0/image/upload/v1782440968/Snow_white_silyb1.png"
        alt="Oasis Creativa"
        className="preloader-logo"
      />
      <div className="preloader-spinner" />
    </div>
  );
};

export default Preloader;
