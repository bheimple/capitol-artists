const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export const GA_MEASUREMENT_ID = measurementId && /^G-[A-Z0-9]{10}$/.test(measurementId)
  ? measurementId
  : null;

type InquiryType = "church_booking" | "artist_representation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;
let lastPageLocation = "";
let lastPageReferrer = "";

export function isAnalyticsEnabled() {
  return Boolean(
    GA_MEASUREMENT_ID && process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" && window.location.protocol === "https:" &&
    ["capitol-artists.com", "www.capitol-artists.com"].includes(window.location.host)
  );
}

function pageContext() {
  let referrer = "";
  try {
    const url = new URL(document.referrer);
    if (url.protocol === "https:" || url.protocol === "http:") referrer = `${url.origin}${url.pathname}`;
  } catch {
    // Direct visits have no referrer.
  }
  return {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: referrer,
  };
}

export function initializeAnalytics() {
  try {
    if (!isAnalyticsEnabled() || initialized) return;
    window.dataLayer ??= [];
    // eslint-disable-next-line prefer-rest-params -- Google's command queue uses arguments objects.
    window.gtag ??= function () { window.dataLayer?.push(arguments); };
    window.gtag("js", new Date());
    // Also disable history page views in the GA stream's enhanced measurement.
    // Route changes are measured below so queries and hashes stay out of URLs.
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, ...pageContext() });
    initialized = true;
  } catch {
    // Analytics is optional and must never affect the website or its forms.
  }
}

export function trackPageView() {
  try {
    if (!isAnalyticsEnabled()) return;
    initializeAnalytics();
    const context = pageContext();
    if (context.page_location === lastPageLocation) return;
    if (lastPageLocation) context.page_referrer = lastPageLocation;
    window.gtag?.("set", context);
    window.gtag?.("event", "page_view", context);
    lastPageLocation = context.page_location;
    lastPageReferrer = context.page_referrer;
  } catch {
    // Measurement must not interfere with navigation.
  }
}

export function trackInquirySuccess(inquiryType: InquiryType) {
  try {
    if (!isAnalyticsEnabled()) return;
    initializeAnalytics();
    const context = pageContext();
    if (context.page_location === lastPageLocation) context.page_referrer = lastPageReferrer;
    window.gtag?.("event", "generate_lead", {
      inquiry_type: inquiryType,
      ...context,
    });
  } catch {
    // A blocked or unavailable tag must not change a confirmed inquiry result.
  }
}
