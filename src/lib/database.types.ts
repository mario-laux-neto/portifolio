export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      experience_tags: {
        Row: {
          experience_id: string | null;
          id: string;
          tag: string;
        };
        Insert: {
          experience_id?: string | null;
          id?: string;
          tag: string;
        };
        Update: {
          experience_id?: string | null;
          id?: string;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experience_tags_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experiences";
            referencedColumns: ["id"];
          },
        ];
      };
      experience_tasks: {
        Row: {
          description: string;
          experience_id: string | null;
          id: string;
          order_index: number | null;
        };
        Insert: {
          description: string;
          experience_id?: string | null;
          id?: string;
          order_index?: number | null;
        };
        Update: {
          description?: string;
          experience_id?: string | null;
          id?: string;
          order_index?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "experience_tasks_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experiences";
            referencedColumns: ["id"];
          },
        ];
      };
      experiences: {
        Row: {
          company: string;
          created_at: string | null;
          id: string;
          order_index: number | null;
          period: string;
          role: string;
        };
        Insert: {
          company: string;
          created_at?: string | null;
          id?: string;
          order_index?: number | null;
          period: string;
          role: string;
        };
        Update: {
          company?: string;
          created_at?: string | null;
          id?: string;
          order_index?: number | null;
          period?: string;
          role?: string;
        };
        Relationships: [];
      };
      links: {
        Row: {
          icon: string | null;
          id: string;
          label: string;
          order_index: number | null;
          url: string;
        };
        Insert: {
          icon?: string | null;
          id?: string;
          label: string;
          order_index?: number | null;
          url: string;
        };
        Update: {
          icon?: string | null;
          id?: string;
          label?: string;
          order_index?: number | null;
          url?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          about_paragraph_1: string | null;
          about_paragraph_2: string | null;
          hero_bio: string | null;
          id: number;
          name: string;
          photo_url: string | null;
          resume_url: string | null;
          role: string;
          updated_at: string | null;
          whatsapp: string | null;
        };
        Insert: {
          about_paragraph_1?: string | null;
          about_paragraph_2?: string | null;
          hero_bio?: string | null;
          id?: number;
          name: string;
          photo_url?: string | null;
          resume_url?: string | null;
          role: string;
          updated_at?: string | null;
          whatsapp?: string | null;
        };
        Update: {
          about_paragraph_1?: string | null;
          about_paragraph_2?: string | null;
          hero_bio?: string | null;
          id?: number;
          name?: string;
          photo_url?: string | null;
          resume_url?: string | null;
          role?: string;
          updated_at?: string | null;
          whatsapp?: string | null;
        };
        Relationships: [];
      };
      project_images: {
        Row: {
          id: string;
          image_url: string;
          order_index: number | null;
          project_id: string | null;
        };
        Insert: {
          id?: string;
          image_url: string;
          order_index?: number | null;
          project_id?: string | null;
        };
        Update: {
          id?: string;
          image_url?: string;
          order_index?: number | null;
          project_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_tags: {
        Row: {
          id: string;
          project_id: string | null;
          tag: string;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          tag: string;
        };
        Update: {
          id?: string;
          project_id?: string | null;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string | null;
          description: string;
          github_url: string | null;
          id: string;
          live_url: string | null;
          order_index: number | null;
          title: string;
          video_url: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          github_url?: string | null;
          id?: string;
          live_url?: string | null;
          order_index?: number | null;
          title: string;
          video_url?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          github_url?: string | null;
          id?: string;
          live_url?: string | null;
          order_index?: number | null;
          title?: string;
          video_url?: string | null;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          order_index: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          order_index?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals["public"];

export type Tables<
  TableName extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[TableName] extends {
  Row: infer R;
}
  ? R
  : never;

export type TablesInsert<TableName extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][TableName] extends { Insert: infer I } ? I : never;

export type TablesUpdate<TableName extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][TableName] extends { Update: infer U } ? U : never;
