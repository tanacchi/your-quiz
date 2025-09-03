# Mutant 439c4abf Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6106
**Stable ID**: 439c4abf
**Location**: L27:14–L27:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6106
@@ -23,9 +23,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("UserId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "user-1", true],
         ["valid with numbers", "user123", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
