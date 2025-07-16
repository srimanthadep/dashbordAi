import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DataSummary } from '@/components/DataSummary';
import { DataVisualization } from '@/components/DataVisualization';
import { DataFilter } from '@/components/DataFilter';
import { ChatInterface } from '@/components/ChatInterface';
import { Brain, BarChart3, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { DataRow } from '../types';
import DashboardHeader from '../components/DashboardHeader';
import DashboardControls from '../components/DashboardControls';
import { exportDataToCsv } from '../lib/utils';

const Index = () => {
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [columns, setColumns] = useState<string[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleFileUpload = (uploadedData: DataRow[], uploadedFileName: string) => {
    setOriginalData(uploadedData);
    setFilteredData(uploadedData);
    setFileName(uploadedFileName);
    setColumns(uploadedData.length > 0 ? Object.keys(uploadedData[0]) : []);
  };

  const handleFilterChange = (newFilteredData: DataRow[]) => {
    setFilteredData(newFilteredData);
  };

  const exportData = (format: string) => {
    if (format === 'csv') {
      exportDataToCsv(filteredData, columns, `${fileName.replace('.csv', '')}_filtered.csv`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-gradient-card shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Analytics Platform</h1>
                <p className="text-muted-foreground">Intelligent data analysis with conversational insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <button
                aria-label="Toggle theme"
                className="rounded-full p-2 hover:bg-muted transition-colors"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <p className="text-sm text-muted-foreground">by Srimanth Adep</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
      {!originalData.length ? (
          /* Upload State */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Transform Your Data Into Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Upload your dataset and let AI help you discover patterns, trends, and actionable insights
              </p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        ) : !showDashboard ? (
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Preview Uploaded Data</h2>
            <div className="overflow-x-auto rounded border border-border/30 mb-4">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    {columns.map(col => (
                      <th key={col} className="px-3 py-2 bg-muted text-foreground font-semibold border-b border-border/30 text-left">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {originalData.slice(0, 10).map((row, i) => (
                    <tr key={i} className="even:bg-muted/50">
                      {columns.map(col => (
                        <td key={col} className="px-3 py-2 border-b border-border/30">
                          {row[col] as string | number}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4">Showing first 10 rows. If your data looks correct, continue to the dashboard.</p>
            <div className="flex gap-2">
              <Button variant="default" onClick={() => setShowDashboard(true)} aria-label="Continue to dashboard">Continue to Dashboard</Button>
              <Button variant="outline" onClick={() => { setOriginalData([]); setFilteredData([]); setFileName(''); setColumns([]); setShowDashboard(false); }} aria-label="Upload new dataset">Upload New Dataset</Button>
            </div>
          </div>
        ) : (
          /* Enhanced Analytics Dashboard */
          <div className="space-y-6">
            {/* Dashboard Header with KPIs */}
            <DashboardHeader 
              originalDataLength={originalData.length}
              filteredDataLength={filteredData.length}
              columnsLength={columns.length}
              fileName={fileName}
            />

            {/* Main Dashboard Content */}
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] text-center bg-muted rounded-lg p-4 sm:p-8">
                <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Data to Display</h3>
                <p className="text-muted-foreground mb-4">Your filters returned no results or your dataset is empty. Try adjusting your filters or uploading a new dataset.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOriginalData([]);
                    setFilteredData([]);
                    setFileName('');
                    setColumns([]);
                  }}
                >
                  Upload New Dataset
                </Button>
              </div>
            ) : columns.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] text-center bg-muted rounded-lg p-4 sm:p-8">
                <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Columns Detected</h3>
                <p className="text-muted-foreground mb-4">The uploaded file does not contain recognizable columns. Please check your CSV format and try again.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOriginalData([]);
                    setFilteredData([]);
                    setFileName('');
                    setColumns([]);
                  }}
                >
                  Upload New Dataset
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Panel - Filters & Controls */}
                <DashboardControls
                  originalData={originalData}
                  columns={columns}
                  onFilterChange={handleFilterChange}
                  exportData={exportData}
                  resetData={() => {
                    setOriginalData([]);
                    setFilteredData([]);
                    setFileName('');
                    setColumns([]);
                  }}
                />

                {/* Center Panel - Visualizations */}
                <div className="lg:col-span-6 space-y-6 mb-6 lg:mb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Data Visualization</h3>
                    <Badge variant="secondary" className="text-xs">
                      Interactive Charts
                    </Badge>
                  </div>
                  <DataVisualization data={filteredData} columns={columns} />
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Statistical Summary</h3>
                    <DataSummary data={filteredData} columns={columns} />
                  </div>
                </div>

                {/* Right Panel - AI Assistant */}
                <div className="lg:col-span-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
                    <Badge variant="default" className="text-xs bg-gradient-primary">
                      Powered by Gemini
                    </Badge>
                  </div>
                  <ChatInterface data={filteredData} dataColumns={columns} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © {new Date().getFullYear()} Srimanth Adep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
