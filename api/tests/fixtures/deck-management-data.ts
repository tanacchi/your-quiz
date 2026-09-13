// Deck Management test data for PactumJS specs
// issue #47（quiz-learning Deck管理）

export const deckManagementData = {
  // Deck新規作成の正常系シナリオ
  createDeckScenarios: [
    {
      description: "name/description省略・単一quizId",
      requestBody: {
        quizIds: ["quiz-1"],
        source: "manual_selection",
      },
    },
    {
      description: "name/description指定・複数quizId",
      requestBody: {
        name: "JavaScript基礎問題集",
        description: "配列・オブジェクト操作の基本",
        quizIds: ["quiz-1", "quiz-2", "quiz-3"],
        source: "manual_selection",
      },
    },
  ],
} as const;
