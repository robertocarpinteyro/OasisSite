import { useEffect, useState } from "react";
import { usePreload } from "../PreloadContext";

const Preloader = () => {
  const { ready, progress } = usePreload();
  const [hidden, setHidden] = useState(false);

  // Deja terminar la transición de salida antes de desmontar.
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
      <div className="preloader-bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Preloader;
