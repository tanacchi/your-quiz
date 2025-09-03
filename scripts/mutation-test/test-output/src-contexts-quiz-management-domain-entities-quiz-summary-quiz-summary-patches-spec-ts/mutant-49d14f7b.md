# Mutant 49d14f7b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4055
**Stable ID**: 49d14f7b
**Location**: L29:16–L29:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4055
@@ -25,9 +25,9 @@
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
     tagIds: ["tag-1", "tag-2"],
     status: "pending_approval",
-    creatorId: "creator-789",
+    creatorId: "",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
 
   describe("Individual Patch Suggesters", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
