# Mutant 15d9794d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2383
**Stable ID**: 15d9794d
**Location**: L679:17–L679:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2383
@@ -675,9 +675,9 @@
         it("should handle truncation patches correctly", () => {
           const input = {
             question: "A".repeat(501),
             explanation: "B".repeat(1001),
-            id: "quiz-123",
+            id: "",
             answerType: "boolean" as const,
             solution: { id: "solution-123", value: true },
             status: "pending_approval" as const,
             creatorId: "creator-789",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
