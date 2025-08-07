/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.md": "pnpm lint:md",
  "*.{js,ts,jsx,tsx}": "pnpm lint:biome",
};
