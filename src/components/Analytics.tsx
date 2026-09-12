"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID, initializeAnalytics, isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

const subscribe = () => () => {};
const serverSnapshot = () => false;

export default function Analytics() {
  const enabled = useSyncExternalStore(subscribe, isAnalyticsEnabled, serverSnapshot);
  const pathname = usePathname();

  useEffect(() => { trackPageView(); }, [pathname]);

  if (!enabled) return null;

  return (
    <Script
      id="capitol-artists-ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onReady={initializeAnalytics}
    />
  );
}
