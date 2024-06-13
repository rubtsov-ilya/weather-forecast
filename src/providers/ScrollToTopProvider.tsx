import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTopProvider() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}