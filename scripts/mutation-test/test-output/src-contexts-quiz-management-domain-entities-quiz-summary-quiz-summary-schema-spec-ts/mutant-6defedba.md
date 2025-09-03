# Mutant 6defedba Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4972
**Stable ID**: 6defedba
**Location**: L50:34–L61:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4972
@@ -46,20 +46,9 @@
         }
       });
     });
 
-    describe("SolutionId", () => {
-      it.each([
-        ["valid format", "solution-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = SolutionId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("SolutionId", () => {});
 
     describe("CreatorId", () => {
       it.each([
         ["valid format", "creator-123", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
