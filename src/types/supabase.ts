export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'admin' | 'analyst' | 'viewer'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'admin' | 'analyst' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'admin' | 'analyst' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          name: string
          type: string
          ip_address: string | null
          status: string
          risk_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          ip_address?: string | null
          status?: string
          risk_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          ip_address?: string | null
          status?: string
          risk_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      vulnerabilities: {
        Row: {
          id: string
          asset_id: string
          cve_id: string | null
          title: string
          severity: 'low' | 'medium' | 'high' | 'critical' | null
          status: 'open' | 'in_progress' | 'resolved' | 'false_positive'
          description: string | null
          remediation: string | null
          discovered_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          asset_id: string
          cve_id?: string | null
          title: string
          severity?: 'low' | 'medium' | 'high' | 'critical' | null
          status?: 'open' | 'in_progress' | 'resolved' | 'false_positive'
          description?: string | null
          remediation?: string | null
          discovered_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          asset_id?: string
          cve_id?: string | null
          title?: string
          severity?: 'low' | 'medium' | 'high' | 'critical' | null
          status?: 'open' | 'in_progress' | 'resolved' | 'false_positive'
          description?: string | null
          remediation?: string | null
          discovered_at?: string
          resolved_at?: string | null
        }
      }
    }
  }
}
