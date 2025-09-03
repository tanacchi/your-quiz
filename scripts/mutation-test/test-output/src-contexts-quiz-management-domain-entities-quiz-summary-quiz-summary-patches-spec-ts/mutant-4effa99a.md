# Mutant 4effa99a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4056
**Stable ID**: 4effa99a
**Location**: L30:16–L30:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4056
@@ -26,9 +26,9 @@
     explanation: "TypeScript is a superset of JavaScript",
     tagIds: ["tag-1", "tag-2"],
     status: "pending_approval",
     creatorId: "creator-789",
-    createdAt: "2023-12-01T10:00:00.000Z",
+    createdAt: "",
   };
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
