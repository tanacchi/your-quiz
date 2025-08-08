export default {
  default: {
    require: ["tests/steps/**/*.ts"],
    requireModule: ["tsx"],
    format: ["pretty", "json:tests/reports/cucumber-report.json"],
    // paths: ["tests/features/**/*.feature"],
    publishQuiet: false,
    strict: true,
  },
};
