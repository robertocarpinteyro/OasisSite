import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  // La posición y tamaño inicial son iguales en todos los dispositivos: con este
  // zoom la máscara cae sobre una zona opaca del logo, así el video se ve completo
  // desde el inicio. Solo cambia el tamaño final (tamaño del logo al revelarse).
  if (isMobile) {
    return {
      initialMaskPos: "50% 22%",
      initialMaskSize: "3500% 3500%",
      maskPos: "50% 22%",
      maskSize: "62% 62%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% 22%",
      initialMaskSize: "3500% 3500%",
      maskPos: "50% 22%",
      maskSize: "40% 40%",
    };
  }

  return {
    initialMaskPos: "50% 22%",
    initialMaskSize: "3500% 3500%",
    maskPos: "50% 22%",
    maskSize: "20% 20%",
  };
};