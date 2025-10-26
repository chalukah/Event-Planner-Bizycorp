/**
 * Event Panel Tracker Viewer Component
 *
 * Displays and manages event registration tracking with ICP classification and conversion metrics.
 * Supports file upload (Excel/CSV) to import registration data.
 *
 * Features:
 * - Real-time metrics dashboard (ICP vs Non-ICP, MSMs, conversions)
 * - Registration list with comprehensive tracking fields
 * - ICP confirmation workflow
 * - Attendance tracking
 * - MSM and sales conversion tracking
 * - Excel/CSV import functionality
 * - Export to Excel
 * - Manager verification system
 */

import { useState, useEffect } from 'react';
import { Upload, Download, TrendingUp, Users, Target, CheckCircle2, XCircle } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import type { EventPanelTracker, PanelRegistration } from '../types';
import { readExcelFile, parseEventPanelTracker, exportEventPanelTrackerToExcel, parseCSVFile } from '../utils/excelParser';

type EventPanelTrackerViewerProps = {
  trackerId?: string;
};

export function EventPanelTrackerViewer({ trackerId }: EventPanelTrackerViewerProps) {
  const eventPanelTrackers = usePanelStore((s) => s.eventPanelTrackers);
  const updateEventPanelTracker = usePanelStore((s) => s.updateEventPanelTracker);
  const importEventPanelTracker = usePanelStore((s) => s.importEventPanelTracker);
  const showToast = usePanelStore((s) => s.showToast);

  const [selectedTracker, setSelectedTracker] = useState<EventPanelTracker | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filterICP, setFilterICP] = useState<'all' | 'icp' | 'non-icp'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load tracker
  useEffect(() => {
    if (trackerId) {
      const tracker = eventPanelTrackers.find((t) => t.id === trackerId);
      setSelectedTracker(tracker || null);
    } else if (eventPanelTrackers.length > 0) {
      setSelectedTracker(eventPanelTrackers[0]);
    }
  }, [trackerId, eventPanelTrackers]);

  // File upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // Excel file
        const workbook = await readExcelFile(file);
        const tracker = parseEventPanelTracker(workbook);
        importEventPanelTracker(tracker);
        setSelectedTracker(tracker);
      } else if (file.name.endsWith('.csv')) {
        // CSV file
        const result = await parseCSVFile(file);
        if (result && 'registrations' in result) {
          importEventPanelTracker(result as EventPanelTracker);
          setSelectedTracker(result as EventPanelTracker);
        } else {
          showToast('Invalid tracker format', 'error');
        }
      } else {
        showToast('Please upload an Excel (.xlsx) or CSV file', 'error');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      showToast('Failed to import tracker', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Export handler
  const handleExport = () => {
    if (!selectedTracker) return;
    exportEventPanelTrackerToExcel(selectedTracker);
  };

  // Update registration field
  const updateRegistration = (regId: string, field: keyof PanelRegistration, value: any) => {
    if (!selectedTracker) return;

    const updatedRegistrations = selectedTracker.registrations.map((reg) =>
      reg.id === regId ? { ...reg, [field]: value } : reg
    );

    // Recalculate metrics
    const metrics = calculateMetrics(updatedRegistrations);

    updateEventPanelTracker(selectedTracker.id, {
      registrations: updatedRegistrations,
      ...metrics,
    });
  };

  // Calculate metrics from registrations
  const calculateMetrics = (registrations: PanelRegistration[]) => {
    const icpRegs = registrations.filter((r) => r.icpConfirmation === 'ICP Confirmed');
    const nonIcpRegs = registrations.filter((r) => r.icpConfirmation === 'Non-ICP');
    const attendees = registrations.filter((r) => r.attendance);
    const icpAttendees = attendees.filter((r) => r.icpConfirmation === 'ICP Confirmed');
    const directRegs = registrations.filter((r) => r.leadType === 'Direct');
    const partnerRegs = registrations.filter((r) => r.leadType === 'Partner');

    return {
      totalRegistrations: registrations.length,
      totalIcpRegistrations: icpRegs.length,
      totalNonIcpRegistrations: nonIcpRegs.length,
      totalAttendees: attendees.length,
      icpAttendees: icpAttendees.length,
      nonIcpAttendees: attendees.length - icpAttendees.length,
      directRegistrations: directRegs.length,
      partnerRegistrations: partnerRegs.length,
    };
  };

  // Filter registrations
  const filteredRegistrations = selectedTracker?.registrations.filter((reg) => {
    // ICP filter
    if (filterICP === 'icp' && reg.icpConfirmation !== 'ICP Confirmed') return false;
    if (filterICP === 'non-icp' && reg.icpConfirmation === 'ICP Confirmed') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        reg.firstName.toLowerCase().includes(query) ||
        reg.lastName.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.practiceName?.toLowerCase().includes(query) ||
        reg.sourceName.toLowerCase().includes(query)
      );
    }

    return true;
  }) || [];

  if (!selectedTracker) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h2 className="text-xl font-semibold mb-2">No Event Panel Tracker</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Upload an Event Panel Tracker Excel file to track registrations and conversions
          </p>
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Upload Tracker
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Event Panel Tracker</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {selectedTracker.eventName} • {selectedTracker.eventDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm">
              <Upload className="w-4 h-4" />
              Import
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Total Registrations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Total Registrations</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {selectedTracker.totalRegistrations}
            </p>
          </div>

          {/* ICP Registrations */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">ICP Registrations</span>
            </div>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {selectedTracker.totalIcpRegistrations}
            </p>
          </div>

          {/* Non-ICP Registrations */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Non-ICP</span>
            </div>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {selectedTracker.totalNonIcpRegistrations}
            </p>
          </div>

          {/* Attendees */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Attendees</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {selectedTracker.totalAttendees}
            </p>
          </div>

          {/* ICP MSMs Completed */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-medium text-teal-600 dark:text-teal-400">ICP MSMs</span>
            </div>
            <p className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              {selectedTracker.totalIcpMsmsCompleted}
            </p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Conversion Rate</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
              {selectedTracker.totalIcpRegistrations > 0
                ? Math.round((selectedTracker.totalIcpMsmsCompleted / selectedTracker.totalIcpRegistrations) * 100)
                : 0}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            placeholder="Search by name, email, practice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
          />
          <select
            value={filterICP}
            onChange={(e) => setFilterICP(e.target.value as any)}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
          >
            <option value="all">All Registrations</option>
            <option value="icp">ICP Only</option>
            <option value="non-icp">Non-ICP Only</option>
          </select>
        </div>
      </div>

      {/* Registration Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium">Date Added</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Email</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Practice</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Role</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Source</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Country</th>
              <th className="px-3 py-2 text-left text-xs font-medium">ICP Status</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Attended</th>
              <th className="px-3 py-2 text-left text-xs font-medium">MSM Status</th>
              <th className="px-3 py-2 text-left text-xs font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg, index) => (
              <tr
                key={reg.id}
                className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                {/* Date Added */}
                <td className="px-3 py-2 text-xs">{reg.dateAdded}</td>

                {/* Name */}
                <td className="px-3 py-2">
                  <div className="font-medium text-xs">
                    {reg.firstName} {reg.lastName}
                  </div>
                </td>

                {/* Email */}
                <td className="px-3 py-2 text-xs">{reg.email}</td>

                {/* Practice */}
                <td className="px-3 py-2 text-xs">{reg.practiceName || '-'}</td>

                {/* Role */}
                <td className="px-3 py-2 text-xs">{reg.role || '-'}</td>

                {/* Source */}
                <td className="px-3 py-2 text-xs">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                    {reg.sourceName}
                  </span>
                </td>

                {/* Country */}
                <td className="px-3 py-2 text-xs">{reg.country}</td>

                {/* ICP Status */}
                <td className="px-3 py-2">
                  <select
                    value={reg.icpConfirmation}
                    onChange={(e) => updateRegistration(reg.id, 'icpConfirmation', e.target.value)}
                    className={`w-full px-2 py-1 border-0 rounded text-xs font-medium ${
                      reg.icpConfirmation === 'ICP Confirmed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : reg.icpConfirmation === 'Non-ICP'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}
                  >
                    <option value="">Pending</option>
                    <option value="ICP Confirmed">ICP Confirmed</option>
                    <option value="Non-ICP">Non-ICP</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </td>

                {/* Attended */}
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={reg.attendance}
                    onChange={(e) => updateRegistration(reg.id, 'attendance', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>

                {/* MSM Status */}
                <td className="px-3 py-2">
                  <select
                    value={reg.msmConversionStatus || ''}
                    onChange={(e) => updateRegistration(reg.id, 'msmConversionStatus', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="">-</option>
                    <option value="Booked">Booked</option>
                    <option value="Completed">Completed</option>
                    <option value="No Show">No Show</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Notes */}
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={reg.notes || ''}
                    onChange={(e) => updateRegistration(reg.id, 'notes', e.target.value)}
                    placeholder="Add notes..."
                    className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>
            Showing {filteredRegistrations.length} of {selectedTracker.registrations.length} registrations
          </span>
          <span>Changes saved automatically</span>
        </div>
      </div>
    </div>
  );
}
