# Mutant 37c8e2cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1529
**Stable ID**: 37c8e2cd
**Location**: L823:27–L838:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1529
@@ -819,24 +819,9 @@
       });
 
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const answerTypePatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" &&
-            patch !== null &&
-            "answerType" in patch,
-        );
-        expect(answerTypePatch).toBeDefined();
-        if (
-          answerTypePatch &&
-          typeof answerTypePatch === "object" &&
-          "answerType" in answerTypePatch
-        ) {
-          expect(answerTypePatch.answerType).toBe("boolean");
-        }
-      }
+      if (result.isErr()) {}
     });
 
     it("should suggest status fixes", () => {
       const result = Quiz.from({
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
