# Mutant 590f23be Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7795
**Stable ID**: 590f23be
**Location**: L508:55–L517:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7795
@@ -504,16 +504,7 @@
       const executionTime = endTime - startTime;
       expect(executionTime).toBeLessThan(100); // Should complete within 100ms
     });
 
-    test("should handle edge cases gracefully", () => {
-      const edgeCases = [{}, null, undefined, "", 123, []];
-
-      edgeCases.forEach((input) => {
-        expect(isQuizRow(input)).toBe(false);
-        expect(isCountResult(input)).toBe(false);
-        expect(isBasicQuizInfo(input)).toBe(false);
-        expect(isParsedChoice(input)).toBe(false);
-      });
-    });
+    test("should handle edge cases gracefully", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
