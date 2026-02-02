export type ProjectStatus = "active" | "not-launched";
export type ProjectPriority = "high" | "medium" | "low";

export interface Requirement {
  id: string;
  project_id: string;
  text: string;
  done: boolean;
  tags: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  project_id: string;
  text: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface Attachment {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  category: string;
  icon: string;
  summary: string;
  notes: string;
  created_at: string;
  updated_at: string;
  requirements?: Requirement[];
  comments?: Comment[];
  attachments?: Attachment[];
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at" | "requirements" | "comments" | "attachments">;
export type ProjectUpdate = Partial<ProjectInsert>;

export type RequirementInsert = Omit<Requirement, "id" | "created_at" | "updated_at">;
export type RequirementUpdate = Partial<RequirementInsert>;

export type CommentInsert = Omit<Comment, "id" | "created_at" | "updated_at">;
export type AttachmentInsert = Omit<Attachment, "id" | "created_at">;
