import React from "react";

export function Seo({ title, description, keywords, canonical, ogType = "website", ogImage, schema }) {
  const defaultTitle = "WELCOME ENTERPRISES – TAJ REAL ESTATE & LEGAL SERVICES";
  const defaultDesc = "Integrated professional solutions for Hajj & Umrah travel packages, Advocate & Legal consultation (Adv. Farook Ahamed, B.A., B.L.), GCC Certificate Attestation, Online Government Services, and Real Estate in Chennai, Tamil Nadu.";
  const siteUrl = "https://welcomefivestarenterprises.in";
  
  const fullTitle = title ? `${title} | WELCOME ENTERPRISES` : defaultTitle;
  const fullDesc = description || defaultDesc;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const image = ogImage || `${siteUrl}/src/assets/logo.png`;

  return (
    <>
      {/* Title & Description */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Welcome Five Star Enterprises" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />

      {/* Geo Location / Local SEO tags */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai, Tambaram, Kanchipuram, Tiruvallur" />
      <meta name="geo.position" content="12.990889;80.101900" />
      <meta name="ICBM" content="12.990889, 80.101900" />

      {/* Structured JSON-LD Data Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
}

export default Seo;
