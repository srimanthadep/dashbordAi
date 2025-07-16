import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DataRow } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility: Parse CSV string to DataRow[]
export function parseCsvToDataRows(csv: string): DataRow[] {
  const lines = csv.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: DataRow = {};
    headers.forEach((header, index) => {
      const value = values[index] || '';
      const numValue = parseFloat(value);
      row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
    });
    return row;
  });
}

// Utility: Export DataRow[] to CSV and trigger download
export function exportDataToCsv(data: DataRow[], columns: string[], fileName: string) {
  const csvContent = [
    columns.join(','),
    ...data.map(row => columns.map(col => `"${row[col]}"`).join(','))
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
