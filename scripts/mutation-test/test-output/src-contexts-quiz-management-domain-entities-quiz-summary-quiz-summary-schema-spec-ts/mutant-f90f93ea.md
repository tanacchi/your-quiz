# Mutant f90f93ea Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5039
**Stable ID**: f90f93ea
**Location**: L83:69–L86:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5039
@@ -79,12 +79,9 @@
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {});
     });
 
     describe("TagIds", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
