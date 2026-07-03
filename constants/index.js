import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% 30%",
      initialMaskSize: "3100% 3100%",
      maskPos: "50% 30%",
      maskSize: "70% 70%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% 24%",
      initialMaskSize: "3500% 3500%",
      maskPos: "50% 24%",
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