
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IncidentStatus {
  REPORTED = 'REPORTED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export interface Visitor {
  id: string;
  name: string;
  host: string;
  purpose: string;
  checkIn: string;
  checkOut?: string;
  badgeId: string;
  status: 'Expected' | 'In Building' | 'Checked Out';
}

export interface Incident {
  id: string;
  type: 'Fire' | 'Medical' | 'Unauthorized Access' | 'Power Failure' | 'Theft' | 'Other';
  description: string;
  severity: Severity;
  status: IncidentStatus;
  timestamp: string;
  location: string;
  reportedBy: string;
}

export interface Guard {
  id: string;
  name: string;
  vendor: string;
  shift: 'Day' | 'Night' | 'Swing';
  post: string;
  status: 'On Duty' | 'Off Duty' | 'On Break';
}

export interface SOP {
  id: string;
  title: string;
  category: string;
  version: string;
  lastUpdated: string;
}
