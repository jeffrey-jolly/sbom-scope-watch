import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WorkstationTable } from "@/components/dashboard/WorkstationTable";
import { SBOMViewer } from "@/components/dashboard/SBOMViewer";
import { CVEList } from "@/components/dashboard/CVEList";
import { mockWorkstations, mockSBOMs, mockCVEs } from "@/data/mockData";
import { Workstation, SBOM } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Package, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation | null>(null);
  const [selectedSBOM, setSelectedSBOM] = useState<SBOM | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const totalWorkstations = mockWorkstations.length;
  const onlineWorkstations = mockWorkstations.filter(ws => ws.status === 'online').length;
  const totalCVEs = mockCVEs.length;
  const criticalCVEs = mockCVEs.filter(cve => cve.severity === 'CRITICAL').length;

  const handleSelectWorkstation = (workstation: Workstation) => {
    setSelectedWorkstation(workstation);
    const sbom = mockSBOMs.find(s => s.workstationId === workstation.id);
    setSelectedSBOM(sbom || null);
    setActiveTab("sbom");
  };

  const handleBackToOverview = () => {
    setSelectedWorkstation(null);
    setSelectedSBOM(null);
    setActiveTab("overview");
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span>SCA Security Dashboard</span>
            </h1>
            <p className="text-muted-foreground ml-11">
              Software Composition Analysis and Vulnerability Management
            </p>
          </div>
          
          {selectedWorkstation && (
            <Button 
              variant="outline" 
              onClick={handleBackToOverview}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Overview</span>
            </Button>
          )}
        </div>

        {!selectedWorkstation ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Workstation Overview</span>
              </TabsTrigger>
              <TabsTrigger value="cves" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>All CVEs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <DashboardHeader
                totalWorkstations={totalWorkstations}
                onlineWorkstations={onlineWorkstations}
                totalCVEs={totalCVEs}
                criticalCVEs={criticalCVEs}
              />
              <WorkstationTable
                workstations={mockWorkstations}
                onSelectWorkstation={handleSelectWorkstation}
              />
            </TabsContent>

            <TabsContent value="cves" className="space-y-6">
              <DashboardHeader
                totalWorkstations={totalWorkstations}
                onlineWorkstations={onlineWorkstations}
                totalCVEs={totalCVEs}
                criticalCVEs={criticalCVEs}
              />
              <CVEList cves={mockCVEs} />
            </TabsContent>
          </Tabs>
        ) : (
          selectedSBOM && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sbom" className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>SBOM Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="cves" className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Workstation CVEs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sbom" className="space-y-6">
                <SBOMViewer 
                  sbom={selectedSBOM} 
                  workstation={selectedWorkstation}
                />
              </TabsContent>

              <TabsContent value="cves" className="space-y-6">
                <CVEList 
                  cves={mockCVEs} 
                  workstationId={selectedWorkstation.id}
                />
              </TabsContent>
            </Tabs>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;