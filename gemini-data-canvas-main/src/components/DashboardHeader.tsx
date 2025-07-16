import { BarChart3, Filter, Brain, Download } from 'lucide-react';

interface DashboardHeaderProps {
  originalDataLength: number;
  filteredDataLength: number;
  columnsLength: number;
  fileName: string;
}

const DashboardHeader = ({
  originalDataLength,
  filteredDataLength,
  columnsLength,
  fileName,
}: DashboardHeaderProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" role="region" aria-label="Dashboard key performance indicators">
    <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Rows</p>
          <p className="text-2xl font-bold text-foreground">{originalDataLength.toLocaleString()}</p>
        </div>
      </div>
    </div>
    <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <Filter className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Filtered Rows</p>
          <p className="text-2xl font-bold text-foreground">{filteredDataLength.toLocaleString()}</p>
        </div>
      </div>
    </div>
    <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Columns</p>
          <p className="text-2xl font-bold text-foreground">{columnsLength}</p>
        </div>
      </div>
    </div>
    <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
          <Download className="w-5 h-5 text-warning" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Dataset</p>
          <p className="text-lg font-semibold text-foreground truncate" title={fileName}>
            {fileName.length > 12 ? `${fileName.substring(0, 12)}...` : fileName}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHeader; 