/**
 * Site-wide metadata constants.
 *
 * Consumed by the root layout, the sitemap, robots.txt, and any page
 * that needs to render a canonical URL. Point `NEXT_PUBLIC_SITE_URL`
 * at your production host to override the placeholder default.
 */

const DEFAULT_SITE_URL = "https://hollerith.example.de";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "HollerithEnergyML";

export const SITE_TAGLINE =
  "Predict ML training energy consumption";

export const SITE_DESCRIPTION =
  "Estimate the energy consumption of training classical scikit-learn " +
  "algorithms from the shape of your dataset. A research project of the " +
  "Herman Hollerith Zentrum at Reutlingen University.";

export const GITHUB_URL = "https://github.com/lukasgro63/hollerithengeryml";

export const HHZ_URL = "https://www.hhz.de";

export const REUTLINGEN_UNIVERSITY_URL = "https://www.reutlingen-university.de";
