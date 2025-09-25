import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface DashboardHeaderProps {
  totalWorkstations: number;
  onlineWorkstations: number;
  totalCVEs: number;
  criticalCVEs: number;
}

export function DashboardHeader({ totalWorkstations, onlineWorkstations, totalCVEs, criticalCVEs }: DashboardHeaderProps) {
  const offlineWorkstations = totalWorkstations - onlineWorkstations;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-gradient-to-br from-card to-accent/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Workstations</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{totalWorkstations}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-online" />
              <span>{onlineWorkstations} Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-offline" />
              <span>{offlineWorkstations} Offline</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-card to-critical/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Vulnerabilities</CardTitle>
          <AlertTriangle className="h-4 w-4 text-critical" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-critical">{criticalCVEs}</div>
          <p className="text-xs text-muted-foreground">Require immediate attention</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-card to-warning/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total CVEs</CardTitle>
          <Shield className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalCVEs}</div>
          <p className="text-xs text-muted-foreground">Across all systems</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-card to-info/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <CheckCircle className="h-4 w-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-info">Monitoring</div>
          <p className="text-xs text-muted-foreground">Real-time SCA analysis</p>
        </CardContent>
      </Card>
    </div>
  );
}