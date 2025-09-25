export interface Workstation {
  id: string;
  hostname: string;
  ip: string;
  os: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  riskScore: number;
  criticalCVEs: number;
  highCVEs: number;
  mediumCVEs: number;
  lowCVEs: number;
}

export interface Package {
  name: string;
  version: string;
  type: string;
  supplier?: string;
  downloadLocation?: string;
  filesAnalyzed: boolean;
  copyrightText?: string;
  licenseConcluded?: string;
  vulnerabilities: string[];
}

export interface SBOM {
  id: string;
  workstationId: string;
  name: string;
  version: string;
  creationTime: string;
  lastUpdated: string;
  integrity: {
    hash: string;
    verified: boolean;
    lastCheck: string;
  };
  packages: Package[];
  totalPackages: number;
}

export interface CVE {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  score: number;
  vector: string;
  description: string;
  affectedPackages: string[];
  workstationIds: string[];
  publishedDate: string;
  lastModifiedDate: string;
  references: string[];
  solution?: string;
}

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';