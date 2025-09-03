# Mutant e4ed36ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4995
**Stable ID**: e4ed36ed
**Location**: L63:33–L74:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4995
@@ -59,20 +59,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("CreatorId", () => {
-      it.each([
-        ["valid format", "creator-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = CreatorId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("CreatorId", () => {});
 
     describe("TagId", () => {
       it.each([
         ["valid format", "tag-123", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
