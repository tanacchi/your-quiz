import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// Tag model
model Tag {
  id: TagId;
  name: string;
  type: TagType;
  createdBy?: UserId; // null for official tags
  createdAt: UtcDateTime;
}

// Tag Relation model for hierarchies
model TagRelation {
  id: TagRelationId;
  parentTagId: TagId;
  childTagId: TagId;
  relationType: RelationType;
  createdAt: UtcDateTime;
}

// Quiz-Tag association
model QuizTag {
  id: QuizTagId;
  quizId: QuizId;
  tagId: TagId;
  assignedAt: UtcDateTime;
}

// Extended models for API responses
model TagWithChildren {
  ...Tag;
  children: Tag[];
  childrenCount: int32;
}

model TagWithParents {
  ...Tag;
  parents: Tag[];
  parentsCount: int32;
}

model TagHierarchy {
  tag: Tag;
  ancestors: Tag[];
  descendants: Tag[];
  level: int32;
}

model TagUsageStatistics {
  tag: Tag;
  quizCount: int32;
  popularityScore: float32;
  recentUsage: int32; // usage in last 30 days
}

// Request/Response models
model CreateTagRequest {
  name: string;
  type?: TagType = TagType.user;
  parentTagId?: TagId;
  relationType?: RelationType = RelationType.hierarchy;
}

model CreateTagResponse {
  tag: Tag;
  relation?: TagRelation;
}

model UpdateTagRequest {
  name?: string;
}

model CreateTagRelationRequest {
  parentTagId: TagId;
  childTagId: TagId;
  relationType: RelationType;
}

model TagSearchRequest {
  query?: string;
  type?: TagType;
  parentTagId?: TagId;
  includeHierarchy?: boolean = false;
}

model TagListResponse extends PaginationResponse<TagWithChildren> {}

model TagHierarchyResponse extends PaginationResponse<TagHierarchy> {}

model TagStatisticsResponse extends PaginationResponse<TagUsageStatistics> {}