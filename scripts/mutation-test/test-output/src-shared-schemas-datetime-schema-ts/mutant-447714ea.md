# Mutant 447714ea Report

**File**: src/shared/schemas/datetime.schema.ts
**Mutator**: Regex
**Original ID**: 9722
**Stable ID**: 447714ea
**Location**: L8:17–L8:67

## Diff

```diff
Index: src/shared/schemas/datetime.schema.ts
===================================================================
--- src/shared/schemas/datetime.schema.ts	original
+++ src/shared/schemas/datetime.schema.ts	mutated #9722
@@ -4,9 +4,9 @@
  * ISO8601 datetime format regex
  * Matches: YYYY-MM-DDTHH:mm:ss.sssZ (with optional milliseconds)
  * Examples: 2024-01-15T10:30:00Z, 2024-01-15T10:30:00.123Z
  */
-const iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
+const iso8601 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
 
 /**
  * Schema for validating ISO8601 datetime strings and transforming to Date objects
  * Use this when you need Date objects for business logic
```

## Hint

ミューテータ "Regex" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
