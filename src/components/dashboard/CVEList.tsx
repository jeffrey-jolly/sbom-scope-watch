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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Search, ExternalLink } from "lucide-react";
import { CVE, SeverityLevel } from "@/types";
import { useState } from "react";

interface CVEListProps {
  cves: CVE[];
  workstationId?: string;
}

export function CVEList({ cves, workstationId }: CVEListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | 'ALL'>('ALL');

  const filteredCVEs = cves.filter((cve) => {
    const matchesSearch = cve.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cve.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || cve.severity === selectedSeverity;
    const matchesWorkstation = !workstationId || cve.workstationIds.includes(workstationId);
    
    return matchesSearch && matchesSeverity && matchesWorkstation;
  });

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return <Badge className="bg-critical text-critical-foreground">Critical</Badge>;
      case 'HIGH':
        return <Badge className="bg-high text-high-foreground">High</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-medium text-medium-foreground">Medium</Badge>;
      case 'LOW':
        return <Badge className="bg-low text-low-foreground">Low</Badge>;
      case 'INFO':
        return <Badge className="bg-info text-info-foreground">Info</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Common Vulnerabilities and Exposures</span>
          </span>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search CVEs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardTitle>
        <div className="flex space-x-2">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((severity) => (
            <Button
              key={severity}
              variant={selectedSeverity === severity ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity(severity)}
            >
              {severity}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CVE ID</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Affected Packages</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Workstations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCVEs.map((cve) => (
                <TableRow key={cve.id} className="hover:bg-accent/50">
                  <TableCell className="font-mono font-medium">{cve.id}</TableCell>
                  <TableCell>{getSeverityBadge(cve.severity)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">{cve.score}</span>
                      <span className="text-muted-foreground text-xs">/10</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cve.affectedPackages.slice(0, 2).map((pkg) => (
                        <Badge key={pkg} variant="outline" className="text-xs">
                          {pkg}
                        </Badge>
                      ))}
                      {cve.affectedPackages.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{cve.affectedPackages.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(cve.publishedDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {cve.workstationIds.length} affected
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}