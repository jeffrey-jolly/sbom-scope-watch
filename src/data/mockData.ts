import { Workstation, SBOM, CVE, Package } from '../types';

export const mockWorkstations: Workstation[] = [
  {
    id: 'ws-001',
    hostname: 'DESKTOP-FINANCE-01',
    ip: '192.168.1.101',
    os: 'Windows 11 Pro',
    status: 'online',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    riskScore: 85,
    criticalCVEs: 3,
    highCVEs: 7,
    mediumCVEs: 12,
    lowCVEs: 4
  },
  {
    id: 'ws-002',
    hostname: 'LAPTOP-DEV-02',
    ip: '192.168.1.102',
    os: 'Ubuntu 20.04 LTS',
    status: 'warning',
    lastSeen: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    riskScore: 72,
    criticalCVEs: 1,
    highCVEs: 5,
    mediumCVEs: 8,
    lowCVEs: 3
  },
  {
    id: 'ws-003',
    hostname: 'WORKSTATION-HR-03',
    ip: '192.168.1.103',
    os: 'Windows 10 Pro',
    status: 'offline',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    riskScore: 94,
    criticalCVEs: 5,
    highCVEs: 9,
    mediumCVEs: 15,
    lowCVEs: 2
  },
  {
    id: 'ws-004',
    hostname: 'MACBOOK-DESIGN-04',
    ip: '192.168.1.104',
    os: 'macOS Monterey 12.6',
    status: 'online',
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    riskScore: 45,
    criticalCVEs: 0,
    highCVEs: 2,
    mediumCVEs: 6,
    lowCVEs: 8
  },
  {
    id: 'ws-005',
    hostname: 'SERVER-PROD-01',
    ip: '10.0.1.50',
    os: 'CentOS 7.9',
    status: 'online',
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    riskScore: 78,
    criticalCVEs: 2,
    highCVEs: 6,
    mediumCVEs: 10,
    lowCVEs: 5
  }
];

export const mockPackages: Package[] = [
  {
    name: 'openssl',
    version: '1.1.1f',
    type: 'library',
    supplier: 'OpenSSL Project',
    filesAnalyzed: true,
    licenseConcluded: 'Apache-2.0',
    vulnerabilities: ['CVE-2022-0778', 'CVE-2021-3712']
  },
  {
    name: 'node.js',
    version: '16.14.0',
    type: 'runtime',
    supplier: 'Node.js Foundation',
    filesAnalyzed: true,
    licenseConcluded: 'MIT',
    vulnerabilities: ['CVE-2022-21824']
  },
  {
    name: 'apache-httpd',
    version: '2.4.41',
    type: 'server',
    supplier: 'Apache Software Foundation',
    filesAnalyzed: true,
    licenseConcluded: 'Apache-2.0',
    vulnerabilities: ['CVE-2021-44790', 'CVE-2021-44224']
  },
  {
    name: 'linux-kernel',
    version: '5.4.0-74',
    type: 'kernel',
    supplier: 'Linux Foundation',
    filesAnalyzed: true,
    licenseConcluded: 'GPL-2.0',
    vulnerabilities: ['CVE-2022-0847']
  },
  {
    name: 'python',
    version: '3.8.10',
    type: 'runtime',
    supplier: 'Python Software Foundation',
    filesAnalyzed: true,
    licenseConcluded: 'PSF-2.0',
    vulnerabilities: ['CVE-2021-3737']
  },
  {
    name: 'mysql',
    version: '8.0.25',
    type: 'database',
    supplier: 'Oracle Corporation',
    filesAnalyzed: true,
    licenseConcluded: 'GPL-2.0',
    vulnerabilities: ['CVE-2022-21245']
  }
];

export const mockSBOMs: SBOM[] = [
  {
    id: 'sbom-ws-001',
    workstationId: 'ws-001',
    name: 'DESKTOP-FINANCE-01-SBOM',
    version: '2.3.1',
    creationTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    integrity: {
      hash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef',
      verified: true,
      lastCheck: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    packages: mockPackages.slice(0, 4),
    totalPackages: 247
  },
  {
    id: 'sbom-ws-002',
    workstationId: 'ws-002',
    name: 'LAPTOP-DEV-02-SBOM',
    version: '2.3.1',
    creationTime: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    integrity: {
      hash: 'sha256:b2c3d4e5f6789012345678901234567890abcdef01',
      verified: false,
      lastCheck: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    packages: mockPackages.slice(1, 5),
    totalPackages: 189
  }
];

export const mockCVEs: CVE[] = [
  {
    id: 'CVE-2022-0778',
    severity: 'HIGH',
    score: 7.5,
    vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
    description: 'The BN_mod_sqrt() function, which computes a modular square root, contains a bug that can cause it to loop forever for non-prime moduli.',
    affectedPackages: ['openssl'],
    workstationIds: ['ws-001', 'ws-002', 'ws-003'],
    publishedDate: '2022-03-15T00:00:00Z',
    lastModifiedDate: '2022-03-21T00:00:00Z',
    references: ['https://www.openssl.org/news/secadv/20220315.txt'],
    solution: 'Update OpenSSL to version 1.1.1n or later'
  },
  {
    id: 'CVE-2021-44790',
    severity: 'CRITICAL',
    score: 9.8,
    vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    description: 'A carefully crafted request body can cause a buffer overflow in the mod_lua multipart parser.',
    affectedPackages: ['apache-httpd'],
    workstationIds: ['ws-001', 'ws-005'],
    publishedDate: '2021-12-20T00:00:00Z',
    lastModifiedDate: '2022-01-10T00:00:00Z',
    references: ['https://httpd.apache.org/security/vulnerabilities_24.html'],
    solution: 'Update Apache HTTP Server to version 2.4.52 or later'
  },
  {
    id: 'CVE-2022-0847',
    severity: 'HIGH',
    score: 7.8,
    vector: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
    description: 'A flaw was found in the way the "flags" member of the new pipe buffer structure was lacking proper initialization in copy_page_to_iter_pipe and push_pipe functions.',
    affectedPackages: ['linux-kernel'],
    workstationIds: ['ws-002', 'ws-005'],
    publishedDate: '2022-03-07T00:00:00Z',
    lastModifiedDate: '2022-03-14T00:00:00Z',
    references: ['https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/'],
    solution: 'Update Linux kernel to version 5.16.11 or later'
  },
  {
    id: 'CVE-2022-21824',
    severity: 'HIGH',
    score: 8.2,
    vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:H',
    description: 'Due to the formatting logic of the "console.table()" function it was not safe to allow user controlled input to be passed to the properties parameter.',
    affectedPackages: ['node.js'],
    workstationIds: ['ws-002'],
    publishedDate: '2022-02-16T00:00:00Z',
    lastModifiedDate: '2022-02-23T00:00:00Z',
    references: ['https://nodejs.org/en/blog/vulnerability/february-2022-security-releases/'],
    solution: 'Update Node.js to version 16.14.1 or later'
  },
  {
    id: 'CVE-2021-3712',
    severity: 'HIGH',
    score: 7.4,
    vector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:H',
    description: 'ASN.1 strings are represented internally within OpenSSL as an ASN1_STRING structure which contains a buffer holding the string data and a field holding the buffer length.',
    affectedPackages: ['openssl'],
    workstationIds: ['ws-001', 'ws-002', 'ws-003'],
    publishedDate: '2021-08-24T00:00:00Z',
    lastModifiedDate: '2021-09-02T00:00:00Z',
    references: ['https://www.openssl.org/news/secadv/20210824.txt'],
    solution: 'Update OpenSSL to version 1.1.1l or later'
  }
];