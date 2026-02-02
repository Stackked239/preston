"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";
import type { Project, Requirement, Comment, Attachment, ProjectInsert } from "@/types/database";

type ProjectRow = Omit<Project, "requirements" | "comments" | "attachments">;

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError("Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("priority", { ascending: true })
        .order("name");

      if (projectsError) throw projectsError;

      const { data: requirementsData, error: requirementsError } = await supabase
        .from("requirements")
        .select("*")
        .order("sort_order", { ascending: true });

      if (requirementsError) throw requirementsError;

      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (commentsError) throw commentsError;

      const { data: attachmentsData, error: attachmentsError } = await supabase
        .from("attachments")
        .select("*")
        .order("created_at", { ascending: false });

      if (attachmentsError) throw attachmentsError;

      const projectsWithData: Project[] = ((projectsData || []) as ProjectRow[]).map((project) => ({
        ...project,
        requirements: ((requirementsData || []) as Requirement[]).filter(
          (req) => req.project_id === project.id
        ),
        comments: ((commentsData || []) as Comment[]).filter(
          (comment) => comment.project_id === project.id
        ),
        attachments: ((attachmentsData || []) as Attachment[]).filter(
          (attachment) => attachment.project_id === project.id
        ),
      }));

      setProjects(projectsWithData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const createProject = async (project: ProjectInsert): Promise<ProjectRow> => {
    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();

    if (error) throw error;

    const createdProject = data as ProjectRow;
    setProjects((prev) => [...prev, { ...createdProject, requirements: [], comments: [], attachments: [] }]);
    return createdProject;
  };

  const deleteProject = async (id: string): Promise<void> => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleRequirement = async (projectId: string, requirementId: string): Promise<void> => {
    const project = projects.find((p) => p.id === projectId);
    const requirement = project?.requirements?.find((r) => r.id === requirementId);

    if (!requirement) return;

    const { error } = await supabase
      .from("requirements")
      .update({ done: !requirement.done })
      .eq("id", requirementId);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            requirements: p.requirements?.map((r) =>
              r.id === requirementId ? { ...r, done: !r.done } : r
            ),
          };
        }
        return p;
      })
    );
  };

  const addRequirement = async (projectId: string, text: string, tags: string[] = []): Promise<Requirement> => {
    const project = projects.find((p) => p.id === projectId);
    const maxSortOrder = Math.max(0, ...(project?.requirements?.map((r) => r.sort_order) || [0]));

    const { data, error } = await supabase
      .from("requirements")
      .insert({ project_id: projectId, text, tags, done: false, sort_order: maxSortOrder + 1 })
      .select()
      .single();

    if (error) throw error;

    const createdRequirement = data as Requirement;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            requirements: [...(p.requirements || []), createdRequirement],
          };
        }
        return p;
      })
    );

    return createdRequirement;
  };

  const updateRequirement = async (requirementId: string, updates: Partial<Requirement>): Promise<void> => {
    const { error } = await supabase
      .from("requirements")
      .update(updates)
      .eq("id", requirementId);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => ({
        ...p,
        requirements: p.requirements?.map((r) =>
          r.id === requirementId ? { ...r, ...updates } : r
        ),
      }))
    );
  };

  const deleteRequirement = async (projectId: string, requirementId: string): Promise<void> => {
    const { error } = await supabase
      .from("requirements")
      .delete()
      .eq("id", requirementId);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            requirements: p.requirements?.filter((r) => r.id !== requirementId),
          };
        }
        return p;
      })
    );
  };

  // Bulk operations
  const bulkToggleRequirements = async (projectId: string, requirementIds: string[], done: boolean): Promise<void> => {
    const { error } = await supabase
      .from("requirements")
      .update({ done })
      .in("id", requirementIds);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            requirements: p.requirements?.map((r) =>
              requirementIds.includes(r.id) ? { ...r, done } : r
            ),
          };
        }
        return p;
      })
    );
  };

  const bulkDeleteRequirements = async (projectId: string, requirementIds: string[]): Promise<void> => {
    const { error } = await supabase
      .from("requirements")
      .delete()
      .in("id", requirementIds);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            requirements: p.requirements?.filter((r) => !requirementIds.includes(r.id)),
          };
        }
        return p;
      })
    );
  };

  // Reorder requirements
  const reorderRequirements = async (projectId: string, reorderedRequirements: Requirement[]): Promise<void> => {
    // Update local state immediately for smooth UX
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, requirements: reorderedRequirements };
        }
        return p;
      })
    );

    // Batch update sort_order in database
    const updates = reorderedRequirements.map((req, index) => ({
      id: req.id,
      sort_order: index,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from("requirements")
        .update({ sort_order: update.sort_order })
        .eq("id", update.id);

      if (error) throw error;
    }
  };

  // Comments
  const addComment = async (projectId: string, text: string, author: string = "User"): Promise<Comment> => {
    const { data, error } = await supabase
      .from("comments")
      .insert({ project_id: projectId, text, author })
      .select()
      .single();

    if (error) throw error;

    const createdComment = data as Comment;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: [createdComment, ...(p.comments || [])],
          };
        }
        return p;
      })
    );

    return createdComment;
  };

  const deleteComment = async (projectId: string, commentId: string): Promise<void> => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: p.comments?.filter((c) => c.id !== commentId),
          };
        }
        return p;
      })
    );
  };

  // Attachments
  const uploadAttachment = async (projectId: string, file: File): Promise<Attachment> => {
    const fileExt = file.name.split(".").pop();
    const filePath = `${projectId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data, error } = await supabase
      .from("attachments")
      .insert({
        project_id: projectId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })
      .select()
      .single();

    if (error) throw error;

    const createdAttachment = data as Attachment;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            attachments: [createdAttachment, ...(p.attachments || [])],
          };
        }
        return p;
      })
    );

    return createdAttachment;
  };

  const deleteAttachment = async (projectId: string, attachmentId: string, filePath: string): Promise<void> => {
    const { error: storageError } = await supabase.storage
      .from("attachments")
      .remove([filePath]);

    if (storageError) console.error("Storage delete error:", storageError);

    const { error } = await supabase
      .from("attachments")
      .delete()
      .eq("id", attachmentId);

    if (error) throw error;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            attachments: p.attachments?.filter((a) => a.id !== attachmentId),
          };
        }
        return p;
      })
    );
  };

  const getAttachmentUrl = (filePath: string): string => {
    const { data } = supabase.storage.from("attachments").getPublicUrl(filePath);
    return data.publicUrl;
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    updateProject,
    createProject,
    deleteProject,
    toggleRequirement,
    addRequirement,
    updateRequirement,
    deleteRequirement,
    bulkToggleRequirements,
    bulkDeleteRequirements,
    reorderRequirements,
    addComment,
    deleteComment,
    uploadAttachment,
    deleteAttachment,
    getAttachmentUrl,
  };
}
