# Mutant acdf49ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 940
**Stable ID**: acdf49ed
**Location**: L42:61–L45:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #940
@@ -38,12 +38,9 @@
         ["valid with numbers", "creator123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = CreatorId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
   });
 
   describe("Entity Creation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
