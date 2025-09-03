# Mutant c2d16ae0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1650
**Stable ID**: c2d16ae0
**Location**: L30:13–L30:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1650
@@ -26,9 +26,9 @@
       id: "solution-456",
       value: true,
     },
     explanation: "TypeScript adds static typing to JavaScript",
-    status: "pending_approval",
+    status: "",
     creatorId: "creator-789",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
