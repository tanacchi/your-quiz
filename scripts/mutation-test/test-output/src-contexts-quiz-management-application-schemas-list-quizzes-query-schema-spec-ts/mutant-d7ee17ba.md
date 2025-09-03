# Mutant d7ee17ba Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 301
**Stable ID**: d7ee17ba
**Location**: L164:47–L197:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #301
@@ -160,43 +160,10 @@
         }
       });
     });
 
-    describe("Offset Field Validation", () => {
-      it.each([
-        ["zero offset", 0, true],
-        ["small offset", 10, true],
-        ["large offset", 1000, true],
-        ["very large offset", 999999, true],
-        ["negative offset", -1, false],
-        ["decimal number", 5.5, false],
-        ["string number", "0", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
-        const input = offset === undefined ? {} : { offset };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
+    describe("Offset Field Validation", () => {});
 
-        if (isValid && result.success) {
-          if (offset !== undefined) {
-            expect(result.data.offset).toBe(offset);
-          } else {
-            expect(result.data.offset).toBe(0); // default
-          }
-        }
-      });
-
-      it("should apply default offset when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.offset).toBe(0);
-        }
-      });
-    });
-
     describe("Complex Validation Scenarios", () => {
       it("should accept valid complete query", () => {
         const validQuery = {
           status: ["approved", "pending_approval"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
