import { DataRow } from '../types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DataFilter } from './DataFilter';

interface DashboardControlsProps {
  originalData: DataRow[];
  columns: string[];
  onFilterChange: (filtered: DataRow[]) => void;
  exportData: (format: string) => void;
  resetData: () => void;
}

const DashboardControls = ({
  originalData,
  columns,
  onFilterChange,
  exportData,
  resetData,
}: DashboardControlsProps) => (
  <div className="lg:col-span-3 space-y-4 mb-6 lg:mb-0" role="region" aria-label="Data controls panel">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-foreground" id="data-controls-heading">Data Controls</h3>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportData('csv')}
        className="flex items-center gap-1"
        aria-label="Export filtered data as CSV"
      >
        <Download className="w-3 h-3" />
        Export
      </Button>
    </div>
    <DataFilter 
      data={originalData} 
      columns={columns} 
      onFilterChange={onFilterChange}
      aria-labelledby="data-controls-heading"
    />
    <Button
      variant="outline"
      className="w-full"
      onClick={resetData}
      aria-label="Upload new dataset"
    >
      Upload New Dataset
    </Button>
  </div>
);

export default DashboardControls; 