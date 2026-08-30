"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Placeholder for analytics integration
    // Replace with your preferred analytics provider:
    //
    // Option 1: Vercel Analytics (recommended)
    //   import va from "@vercel/analytics";
    //   va.track("pageview", { path: pathname });
    //
    // Option 2: Plausible
    //   window.plausible?.("pageview", { props: { path: pathname } });
    //
    // Option 3: Google Analytics
    //   window.gtag?.("config", "G-XXXXXXXXXX", { page_path: pathname });
    //
    console.log("[Analytics] Page view:", pathname);
  }, [pathname]);

  return null;
}
