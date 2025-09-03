# Mutant 3549e9a6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5078
**Stable ID**: 3549e9a6
**Location**: L105:59–L105:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5078
@@ -101,9 +101,9 @@
         }
       });
 
       it("should reject invalid tag formats in array", () => {
-        const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
+        const result = TagIds.safeParse(["valid-tag", "", ""]);
         expect(result.success).toBe(false);
       });
     });
   });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
