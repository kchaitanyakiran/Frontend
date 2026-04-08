import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Calendar, Download, FileBarChart2 } from 'lucide-react';
import { api } from '../../lib/api';

const AdminReports = () => {
  const [data, setData] = useState({ reports: [] });
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [loadingKey, setLoadingKey] = useState('');

  useEffect(() => {
    api.getAdminReports().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const downloadReport = async (key) => {
    try {
      setLoadingKey(`download-${key}`);
      const csv = await api.downloadAdminReport(key);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${key}-report.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      setMessage('Report downloaded successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingKey('');
    }
  };

  const previewReport = async (key) => {
    try {
      setLoadingKey(`preview-${key}`);
      const response = await api.getAdminReportPreview(key);
      setPreview(response);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingKey('');
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate live previews and download reports from the current database state</p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <Card hover={false}>
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Generate opens a report preview popup. Download exports the report file.</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.reports.map((report) => (
          <Card key={report.key}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600">{report.status}</p>
              </div>
              <FileBarChart2 className="h-6 w-6 text-[#1B5E20]" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => previewReport(report.key)}
                disabled={loadingKey === `preview-${report.key}`}
              >
                Generate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadReport(report.key)}
                disabled={loadingKey === `download-${report.key}`}
              >
                <Download size={16} />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{preview.title}</h2>
                <p className="text-sm text-gray-600">Generated from live application data at {new Date(preview.generatedAt).toLocaleString()}</p>
              </div>
              <Button type="button" variant="outline" onClick={() => setPreview(null)}>Close</Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {preview.columns.map((column) => (
                      <th key={column} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {preview.rows.map((row, index) => (
                    <tr key={`${preview.key}-${index}`}>
                      {preview.columns.map((column) => (
                        <td key={`${preview.key}-${index}-${column}`} className="px-4 py-3 text-sm text-gray-700">
                          {row[column] ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {preview.rows.length === 0 && (
              <div className="py-12 text-center text-gray-500">No rows are available in this report yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
