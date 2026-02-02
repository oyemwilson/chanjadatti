import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return true;
        }
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        return true;
      }

      return false;
    };

    // Try immediately
    if (scrollToHash()) return;

    // Retry after DOM / loading finishes
    const timeout = setTimeout(() => {
      scrollToHash();
    }, 500); // adjust if needed

    return () => clearTimeout(timeout);

  }, [pathname, hash]);

  return null;
}
