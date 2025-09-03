# Mutant 220e69c2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1651
**Stable ID**: 220e69c2
**Location**: L31:16–L31:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1651
@@ -27,9 +27,9 @@
       value: true,
     },
     explanation: "TypeScript adds static typing to JavaScript",
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
