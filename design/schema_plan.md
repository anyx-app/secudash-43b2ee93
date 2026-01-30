# Schema Plan - SecuDash

## Overview
This schema is designed to support a security dashboard featuring vulnerability scanning, compliance tracking, and real-time threat monitoring. It leverages Supabase (PostgreSQL) and integrates with Supabase Auth.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table to store application-specific user data.
- **id** (uuid, PK): References `auth.users.id`.
- **full_name** (text): User's display name.
- **role** (text): User role (e.g., 'admin', 'analyst', 'viewer'). Default: 'viewer'.
- **avatar_url** (text): URL to profile picture.
- **created_at** (timestamptz): Default `now()`.

### 2. assets
Represents the infrastructure being monitored (servers, databases, endpoints).
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **name** (text): Hostname or identifier.
- **type** (text): e.g., 'server', 'database', 'endpoint', 'cloud_resource'.
- **ip_address** (inet): Optional IP address.
- **status** (text): Current health status (e.g., 'online', 'offline', 'maintenance').
- **risk_score** (int): Calculated risk score based on vulnerabilities.
- **created_at** (timestamptz).

### 3. vulnerabilities
Stores detected security vulnerabilities linked to assets.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **asset_id** (uuid, FK): References `assets.id`.
- **cve_id** (text): Common Vulnerabilities and Exposures ID (e.g., CVE-2023-1234).
- **title** (text): Short description of the vulnerability.
- **severity** (text): 'low', 'medium', 'high', 'critical'.
- **status** (text): 'open', 'in_progress', 'resolved', 'false_positive'.
- **description** (text): Detailed description.
- **remediation** (text): Steps to fix.
- **discovered_at** (timestamptz).
- **resolved_at** (timestamptz): Nullable.

### 4. compliance_standards
Definitions of compliance frameworks (e.g., SOC2, GDPR, HIPAA).
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **name** (text): e.g., 'SOC2', 'ISO 27001'.
- **version** (text): e.g., '2023-Rev1'.
- **description** (text).

### 5. compliance_checks
Records the result of a specific compliance control check against an asset or general system.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **standard_id** (uuid, FK): References `compliance_standards.id`.
- **asset_id** (uuid, FK): References `assets.id`. Nullable (some checks are organizational).
- **control_id** (text): Specific control identifier (e.g., 'CC1.1').
- **status** (text): 'pass', 'fail', 'warning'.
- **last_checked_at** (timestamptz).

### 6. threat_events
Real-time security events and incidents for the timeline.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **asset_id** (uuid, FK): References `assets.id`.
- **type** (text): e.g., 'malware', 'intrusion_attempt', 'unauthorized_access', 'ddos'.
- **severity** (text): 'low', 'medium', 'high', 'critical'.
- **description** (text): What happened.
- **source_ip** (inet): Origin of threat.
- **status** (text): 'detected', 'investigating', 'contained', 'resolved'.
- **detected_at** (timestamptz).

## Relationships
- `profiles.id` -> `auth.users.id` (1:1)
- `vulnerabilities.asset_id` -> `assets.id` (Many:1)
- `compliance_checks.standard_id` -> `compliance_standards.id` (Many:1)
- `compliance_checks.asset_id` -> `assets.id` (Many:1)
- `threat_events.asset_id` -> `assets.id` (Many:1)

## Security Policies (RLS)
- **profiles**: Users can read all profiles, update their own.
- **assets**: Read-only for 'viewer', CRUD for 'admin'.
- **vulnerabilities**: Read-only for 'viewer', CRUD for 'analyst'/'admin'.
- **compliance_standards**: Read-only for all.
- **compliance_checks**: Read-only for 'viewer', Update for 'analyst'/'admin'.
- **threat_events**: Read-only for 'viewer', Update for 'analyst'/'admin'.
