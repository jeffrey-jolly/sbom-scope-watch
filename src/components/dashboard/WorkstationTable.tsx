import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Eye, Search, AlertCircle } from "lucide-react";
import { Workstation } from "@/types";

interface WorkstationTableProps {
  workstations: Workstation[];
  onSelectWorkstation: (workstation: Workstation) => void;
}

export function WorkstationTable({ workstations, onSelectWorkstation }: WorkstationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkstations = workstations.filter(
    (ws) =>
      ws.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ws.ip.includes(searchTerm) ||
      ws.os.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-online text-online-foreground">Online</Badge>;
      case 'offline':
        return <Badge className="bg-offline text-offline-foreground">Offline</Badge>;
      case 'warning':
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskScoreBadge = (score: number) => {
    if (score >= 80) {
      return <Badge className="bg-critical text-critical-foreground">Critical</Badge>;
    } else if (score >= 60) {
      return <Badge className="bg-high text-high-foreground">High</Badge>;
    } else if (score >= 40) {
      return <Badge className="bg-medium text-medium-foreground">Medium</Badge>;
    } else {
      return <Badge className="bg-low text-low-foreground">Low</Badge>;
    }
  };

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Workstation Overview</span>
          </span>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workstations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostname</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>CVEs</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkstations.map((workstation) => (
                <TableRow key={workstation.id} className="hover:bg-accent/50">
                  <TableCell className="font-medium">{workstation.hostname}</TableCell>
                  <TableCell className="font-mono text-sm">{workstation.ip}</TableCell>
                  <TableCell>{workstation.os}</TableCell>
                  <TableCell>{getStatusBadge(workstation.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">{workstation.riskScore}</span>
                      {getRiskScoreBadge(workstation.riskScore)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1 text-xs">
                      {workstation.criticalCVEs > 0 && (
                        <Badge className="bg-critical text-critical-foreground px-1 py-0">{workstation.criticalCVEs}C</Badge>
                      )}
                      {workstation.highCVEs > 0 && (
                        <Badge className="bg-high text-high-foreground px-1 py-0">{workstation.highCVEs}H</Badge>
                      )}
                      {workstation.mediumCVEs > 0 && (
                        <Badge className="bg-medium text-medium-foreground px-1 py-0">{workstation.mediumCVEs}M</Badge>
                      )}
                      {workstation.lowCVEs > 0 && (
                        <Badge className="bg-low text-low-foreground px-1 py-0">{workstation.lowCVEs}L</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatLastSeen(workstation.lastSeen)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectWorkstation(workstation)}
                      className="text-primary hover:text-primary-foreground hover:bg-primary"
                    >
                      <Eye className="h-4 w-4" />
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