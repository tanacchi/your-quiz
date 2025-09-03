import { z } from "zod";
import { sqliteDateTimeSchema } from "../../../../../shared/schemas/datetime.schema";

// Brand types for type safety
export const TagId = z.string().min(1).brand<"TagId">();
export type TagId = z.infer<typeof TagId>;

export const UserId = z.string().min(1).brand<"UserId">();
export type UserId = z.infer<typeof UserId>;

// Relation type for tag relationships
export const RelationType = z.enum([
  "hierarchy",
  "category",
  "synonym",
  "related",
]);
export type RelationType = z.infer<typeof RelationType>;

// Main Tag schema with simple related tags
export const TagSchema = z
  .object({
    id: TagId,
    name: z.string().min(1).max(50),
    createdBy: UserId,
    createdAt: sqliteDateTimeSchema,
    relatedTags: z
      .array(
        z.object({
          relationType: RelationType,
          id: TagId,
          name: z.string().min(1).max(50),
        }),
      )
      .nullish()
      .transform((val) => val ?? []),
  })
  .strict()
  .superRefine((tag, ctx) => {
    // Check for duplicate related tag IDs
    const relatedTagIds = tag.relatedTags.map((rt) => rt.id);
    const uniqueTagIds = new Set(relatedTagIds);
    if (uniqueTagIds.size !== relatedTagIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate related tag IDs are not allowed",
        path: ["relatedTags"],
      });
    }

    // Prevent self-reference in related tags
    const selfReferences = tag.relatedTags.filter((rt) => rt.id === tag.id);
    if (selfReferences.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Tag cannot reference itself in related tags",
        path: ["relatedTags"],
      });
    }
  });

export type TagData = z.output<typeof TagSchema>;
export type TagInput = z.input<typeof TagSchema>;
