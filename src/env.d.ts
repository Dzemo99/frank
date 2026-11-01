/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_ADS_CONVERSION_ID?: string;
  readonly PUBLIC_ADS_LABEL_FORMULAR?: string;
  readonly PUBLIC_ADS_LABEL_ANRUF?: string;
  readonly PUBLIC_ADS_LABEL_WHATSAPP?: string;
  readonly PUBLIC_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
  hatEinwilligung?: () => boolean;
  SITE_CONFIG?: {
    gtmId?: string;
    adsConversionId?: string;
    conversionLabels?: Record<string, string>;
    ga4MeasurementId?: string;
    tagVorEinwilligungLaden?: boolean;
    phoneDisplay?: string;
  };
}
