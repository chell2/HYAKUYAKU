export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      breweries: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string | null
          region: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          region?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          region?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          id: string
          name: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      descriptions: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          id: number
          product_id: string
          title: string | null
        }
        Insert: {
          client_id?: string
          created_at?: string
          description?: string | null
          id?: number
          product_id?: string
          title?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          id?: number
          product_id?: string
          title?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_items_delivery_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          order_date: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          order_date?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          order_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          abv: string | null
          brewery_id: string | null
          created_at: string
          description: string | null
          fermentation: string | null
          hops: string[] | null
          ibu: number | null
          id: string
          is_bottled: boolean
          malts: string[] | null
          name: string | null
          others: string[] | null
          price: number | null
          status: string | null
          stock: number | null
          style: string | null
          volume: number | null
          yeast: string[] | null
        }
        Insert: {
          abv?: string | null
          brewery_id?: string | null
          created_at?: string
          description?: string | null
          fermentation?: string | null
          hops?: string[] | null
          ibu?: number | null
          id?: string
          is_bottled: boolean
          malts?: string[] | null
          name?: string | null
          others?: string[] | null
          price?: number | null
          status?: string | null
          stock?: number | null
          style?: string | null
          volume?: number | null
          yeast?: string[] | null
        }
        Update: {
          abv?: string | null
          brewery_id?: string | null
          created_at?: string
          description?: string | null
          fermentation?: string | null
          hops?: string[] | null
          ibu?: number | null
          id?: string
          is_bottled?: boolean
          malts?: string[] | null
          name?: string | null
          others?: string[] | null
          price?: number | null
          status?: string | null
          stock?: number | null
          style?: string | null
          volume?: number | null
          yeast?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brewery_id_fkey"
            columns: ["brewery_id"]
            isOneToOne: false
            referencedRelation: "breweries"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          name: string | null
          role: string | null
          updated_at: string
          user_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          name?: string | null
          role?: string | null
          updated_at?: string
          user_number?: number
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          name?: string | null
          role?: string | null
          updated_at?: string
          user_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
