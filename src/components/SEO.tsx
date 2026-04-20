import { Helmet } from "react-helmet-async";

const SITE_URL = "https://regcdigital.co.za";
const DEFAULT_OG = `${SITE_URL}/og-default.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/about" or "/domains/medical-dental"
  image?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO = ({ title, description, path, image = DEFAULT_OG, jsonLd }: SEOProps) => {
  const url = `${SITE_URL}${path.endsWith("/") ? path : path + "/"}`.replace(/\/+$/, "/");
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="REGC Digital" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;