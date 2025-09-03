# Mutant 281bef50 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4429
**Stable ID**: 281bef50
**Location**: L324:43–L344:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4429
@@ -320,29 +320,9 @@
         );
         expect(result).toEqual([]);
       });
 
-      describe("Patch Application", () => {
-        it("should apply approvedAt patch correctly", () => {
-          const mockDate = "2023-12-01T10:00:00.000Z";
-          vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
-
-          const input = {
-            ...validQuizSummaryInput,
-            status: "approved" as const,
-            approvedAt: undefined,
-          };
-          const patches = suggestApprovedAtPatches(input);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.approvedAt).toBe(mockDate);
-
-          vi.restoreAllMocks();
-        });
-      });
+      describe("Patch Application", () => {});
     });
   });
 
   describe("Integrated Patch Suggester", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
