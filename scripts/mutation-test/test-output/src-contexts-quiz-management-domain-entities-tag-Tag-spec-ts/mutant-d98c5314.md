# Mutant d98c5314 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6108
**Stable ID**: d98c5314
**Location**: L28:15–L34:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6108
@@ -24,15 +24,9 @@
       });
     });
 
     describe("UserId validation", () => {
-      it.each([
-        ["valid alphanumeric", "user-1", true],
-        ["valid with numbers", "user123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = UserId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
