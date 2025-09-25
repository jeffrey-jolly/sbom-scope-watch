import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Package, Clock, Hash } from "lucide-react";
import { SBOM, Workstation } from "@/types";

interface SBOMViewerProps {
  sbom: SBOM;
  workstation: Workstation;
}

export function SBOMViewer({ sbom, workstation }: SBOMViewerProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getVulnerabilityBadges = (vulnerabilities: string[]) => {
    return vulnerabilities.slice(0, 3).map((cve) => (
      <Badge key={cve} variant="destructive" className="text-xs">
        {cve}
      </Badge>
    ));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Software Bill of Materials</span>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {workstation.hostname} • {sbom.totalPackages} total packages
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Vulnerabilities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sbom.packages.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell className="font-mono text-sm">{pkg.version}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{pkg.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{pkg.licenseConcluded || 'Unknown'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {pkg.vulnerabilities.length > 0 ? (
                          getVulnerabilityBadges(pkg.vulnerabilities)
                        ) : (
                          <Badge className="bg-low text-low-foreground text-xs">None</Badge>
                        )}
                        {pkg.vulnerabilities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pkg.vulnerabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>SBOM Metadata</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{sbom.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Version</div>
              <div className="font-mono">{sbom.version}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Packages</div>
              <div className="font-semibold text-primary">{sbom.totalPackages}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Created</div>
              <div className="text-sm">{formatDate(sbom.creationTime)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-sm">{formatDate(sbom.lastUpdated)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              {sbom.integrity.verified ? (
                <CheckCircle className="h-4 w-4 text-online" />
              ) : (
                <XCircle className="h-4 w-4 text-critical" />
              )}
              <span>Integrity Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              {sbom.integrity.verified ? (
                <>
                  <CheckCircle className="h-4 w-4 text-online" />
                  <span className="text-sm font-medium text-online">Verified</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-critical" />
                  <span className="text-sm font-medium text-critical">Failed</span>
                </>
              )}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Hash</div>
              <div className="text-xs font-mono bg-accent p-2 rounded break-all">
                {sbom.integrity.hash}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Last Check</div>
              <div className="text-sm">{formatDate(sbom.integrity.lastCheck)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}