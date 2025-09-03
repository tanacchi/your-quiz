# Mutant fe9f2c73 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 919
**Stable ID**: fe9f2c73
**Location**: L35:44–L46:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #919
@@ -31,20 +31,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("CreatorId validation", () => {
-      it.each([
-        ["valid alphanumeric", "creator-1", true],
-        ["valid with numbers", "creator123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = CreatorId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("CreatorId validation", () => {});
   });
 
   describe("Entity Creation", () => {
     it("should create valid quiz from complete data", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
