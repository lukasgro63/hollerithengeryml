/**
 * Site-wide metadata constants.
 *
 * Consumed by the root layout, the sitemap, robots.txt, and any page
 * that needs to render a canonical URL or cite the research paper.
 * Point `NEXT_PUBLIC_SITE_URL` at your production host to override the
 * placeholder default.
 */

const DEFAULT_SITE_URL = "https://hollerith.example.de";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "HollerithEnergyML";

export const SITE_TAGLINE = "Predict ML training energy consumption";

export const SITE_DESCRIPTION =
  "Estimate the energy consumption of training classical scikit-learn " +
  "algorithms from the shape of your dataset. A research project of the " +
  "Herman Hollerith Zentrum at Reutlingen University.";

export const GITHUB_URL = "https://github.com/lukasgro63/hollerithengeryml";

export const HHZ_URL = "https://www.hhz.de";

export const REUTLINGEN_UNIVERSITY_URL = "https://www.reutlingen-university.de";

/* --------------------------------------------------------------------------
 * Research paper — INFORMATIK 2024
 * -------------------------------------------------------------------------- */

export const PAPER_TITLE =
  "HollerithEnergyML: A Prototype of a Machine Learning Energy Consumption Recommender System";

export const PAPER_AUTHORS: readonly string[] = [
  "Michael Zanger",
  "Alexander Schulz",
  "Lukas Grodmeier",
  "Dion Agaj",
  "Rafael Schindler",
  "Lukas Weiss",
  "Michael Möhring",
] as const;

export const PAPER_VENUE =
  "INFORMATIK 2024 · Lecture Notes in Informatics (LNI) · Gesellschaft für Informatik, Bonn";

export const PAPER_PAGES = "1519–1523";

export const PAPER_YEAR = 2024;

export const PAPER_DOI = "10.18420/inf2024_132";

export const PAPER_DOI_URL = `https://doi.org/${PAPER_DOI}`;

export const PAPER_PDF_URL =
  "https://dl.gi.de/server/api/core/bitstreams/e73bf183-410e-4526-adad-240d69fc9ccd/content";
