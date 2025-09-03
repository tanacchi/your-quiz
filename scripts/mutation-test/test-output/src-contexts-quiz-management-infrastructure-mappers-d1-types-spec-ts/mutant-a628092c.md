# Mutant a628092c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7781
**Stable ID**: a628092c
**Location**: L483:61–L506:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7781
@@ -479,33 +479,10 @@
     });
   });
 
   describe("Performance and Edge Cases", () => {
-    test("should validate large dataset efficiently", () => {
-      const startTime = performance.now();
-      const largeDataset = Array.from(
-        { length: 1000 },
-        (_, i) =>
-          ({
-            id: String(i),
-            question: `Question ${i}`,
-            answer_type: "boolean",
-            solution_id: `sol-${i}`,
-            status: "approved",
-            creator_id: `user-${i}`,
-            created_at: "2023-01-01T00:00:00Z",
-          }) satisfies unknown,
-      );
+    test("should validate large dataset efficiently", () => {});
 
-      largeDataset.forEach((item) => {
-        expect(isQuizRow(item)).toBe(true);
-      });
-
-      const endTime = performance.now();
-      const executionTime = endTime - startTime;
-      expect(executionTime).toBeLessThan(100); // Should complete within 100ms
-    });
-
     test("should handle edge cases gracefully", () => {
       const edgeCases = [{}, null, undefined, "", 123, []];
 
       edgeCases.forEach((input) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
