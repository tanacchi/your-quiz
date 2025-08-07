export default {
  default: {
    require: [
      "tests/support/hooks.ts",
      "tests/support/world.ts",
      "tests/steps/common-steps.ts",
      "tests/steps/quiz-creation-steps.ts",
      "tests/steps/quiz-retrieval-steps.ts",
      "tests/steps/quiz-search-steps.ts",
      "tests/steps/type-safety-steps.ts",
      "tests/features/**.ts",
    ],
    requireModule: ["tsx"],
    format: ["pretty", "json:tests/reports/cucumber-report.json"],
    paths: ["tests/features/**/*.feature"],
    publishQuiet: true,
  },
};
