/* Portfolio projects.
 * Each project needs a title; everything else is optional.
 *   date:        "YYYY-MM" (used for sorting, newest first)
 *   summary:     one line shown on the card
 *   description: full write-up; leave a blank line between paragraphs
 *   tags:        shown on the card and used as filters
 *   images:      paths inside the images/ folder; the first one is the cover
 */
const PROJECTS = [
  {
    title: "Sample Project",
    date: "2026-03",
    summary: "Placeholder. This will be replaced with a real project.",
    description:
      "This is a placeholder so you can see how a project looks.\n\nReal projects will have photos of the build and a write-up explaining what it is, how it works, and how it was made.",
    tags: ["Mechanical", "CAD"],
    images: ["images/sample-1.svg", "images/sample-2.svg"],
  },
  {
    title: "Another Sample",
    date: "2025-11",
    summary: "Second placeholder to show the grid layout.",
    description: "Placeholder description.",
    tags: ["Electronics"],
    images: ["images/sample-2.svg"],
  },
];
