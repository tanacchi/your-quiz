# Mutant 8d22ce57 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5018
**Stable ID**: 8d22ce57
**Location**: L76:29–L87:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5018
@@ -72,20 +72,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("TagId", () => {
-      it.each([
-        ["valid format", "tag-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("TagId", () => {});
 
     describe("TagIds", () => {
       it.each([
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
