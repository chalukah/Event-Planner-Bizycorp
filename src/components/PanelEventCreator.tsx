import { useState } from 'react';
import { usePanelStore } from '../panelStore';
import { X, Upload, Download, FileText } from 'lucide-react';
import {
  parseEventDataFromFile,
  generateEventDataTemplate,
  generateEventDataTemplateCSV,
  validateEventData,
  parseEventDataFromUnstructuredText,
} from '../utils/eventDataParser';

type FormData = {
  name: string;
  panelTitle: string;
  panelSubtitle: string;
  panelPurpose: string;
  eventDate: string;
  eventDateFull: string;
  eventDateShort: string;
  eventDateMinus1: string;
  discussionPoint1: string;
  discussionPoint2: string;
  discussionPoint3: string;
  discussionPoint4: string;
  discussionPoint5: string;
  briefTopicDescription: string;
};

type PanelEventCreatorProps = {
  onComplete?: (eventId: string) => void;
  onCancel?: () => void;
};

export function PanelEventCreator({ onComplete, onCancel }: PanelEventCreatorProps) {
  const createEvent = usePanelStore((s) => s.createEvent);
  const selectEvent = usePanelStore((s) => s.selectEvent);
  const showToast = usePanelStore((s) => s.showToast);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    panelTitle: '',
    panelSubtitle: '',
    panelPurpose: '',
    eventDate: '',
    eventDateFull: '',
    eventDateShort: '',
    eventDateMinus1: '',
    discussionPoint1: '',
    discussionPoint2: '',
    discussionPoint3: '',
    discussionPoint4: '',
    discussionPoint5: '',
    briefTopicDescription: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [rawText, setRawText] = useState('');
  const [rawTextError, setRawTextError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Event name is required';
    if (!formData.panelTitle.trim()) newErrors.panelTitle = 'Panel title is required';
    if (!formData.panelSubtitle.trim()) newErrors.panelSubtitle = 'Panel subtitle is required';
    if (!formData.panelPurpose.trim()) newErrors.panelPurpose = 'Panel purpose is required';
    if (!formData.eventDate.trim()) newErrors.eventDate = 'Event date is required';
    if (!formData.eventDateFull.trim()) newErrors.eventDateFull = 'Full event date is required';
    if (!formData.eventDateShort.trim()) newErrors.eventDateShort = 'Short date is required';
    if (!formData.eventDateMinus1.trim()) newErrors.eventDateMinus1 = 'Previous day date is required';
    if (!formData.briefTopicDescription.trim())
      newErrors.briefTopicDescription = 'Brief description is required';

    // Check discussion points
    for (let i = 1; i <= 5; i++) {
      const key = `discussionPoint${i}` as keyof FormData;
      if (!formData[key].trim()) {
        newErrors[key] = `Discussion point ${i} is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventId = createEvent({
      name: formData.name,
      panelTitle: formData.panelTitle,
      panelSubtitle: formData.panelSubtitle,
      panelPurpose: formData.panelPurpose,
      eventDate: formData.eventDate,
      eventDateFull: formData.eventDateFull,
      eventDateShort: formData.eventDateShort,
      eventDateMinus1: formData.eventDateMinus1,
      discussionPoints: [
        formData.discussionPoint1,
        formData.discussionPoint2,
        formData.discussionPoint3,
        formData.discussionPoint4,
        formData.discussionPoint5,
      ],
      briefTopicDescription: formData.briefTopicDescription,
      panelists: [],
    });

    selectEvent(eventId);

    if (onComplete) {
      onComplete(eventId);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle file upload for auto-fill
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const parsedData = await parseEventDataFromFile(file);
      const validation = validateEventData(parsedData);

      if (!validation.isValid) {
        showToast(`File validation errors: ${validation.errors.join(', ')}`, 'error');
        setIsUploading(false);
        return;
      }

      // Auto-fill the form
      setFormData({
        name: parsedData.name,
        panelTitle: parsedData.panelTitle,
        panelSubtitle: parsedData.panelSubtitle,
        panelPurpose: parsedData.panelPurpose,
        eventDate: parsedData.eventDate,
        eventDateFull: parsedData.eventDateFull,
        eventDateShort: parsedData.eventDateShort,
        eventDateMinus1: parsedData.eventDateMinus1,
        discussionPoint1: parsedData.discussionPoints[0] || '',
        discussionPoint2: parsedData.discussionPoints[1] || '',
        discussionPoint3: parsedData.discussionPoints[2] || '',
        discussionPoint4: parsedData.discussionPoints[3] || '',
        discussionPoint5: parsedData.discussionPoints[4] || '',
        briefTopicDescription: parsedData.briefTopicDescription,
      });

      setErrors({});
      showToast('Event data loaded successfully! Review and create.', 'success');
    } catch (error) {
      console.error('Error parsing file:', error);
      showToast('Failed to parse file. Check format and try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleParseRawText = () => {
    if (!rawText.trim()) {
      setRawTextError('Paste an event brief or description first');
      return;
    }
    setRawTextError('');
    setIsParsing(true);

    try {
      const parsed = parseEventDataFromUnstructuredText(rawText);
      if (!parsed) {
        setRawTextError('Could not identify enough details. Please add headings (e.g., "Date:", "Topic:") or provide the template file.');
        return;
      }

      const validation = validateEventData(parsed);
      if (!validation.isValid) {
        setRawTextError(
          `We extracted some data but a few items are missing: ${validation.errors.join(', ')}. The form has been partially filled—please review.`
        );
      } else {
        showToast('Event details extracted from text', 'success');
      }

      setFormData({
        name: parsed.name,
        panelTitle: parsed.panelTitle,
        panelSubtitle: parsed.panelSubtitle,
        panelPurpose: parsed.panelPurpose,
        eventDate: parsed.eventDate,
        eventDateFull: parsed.eventDateFull,
        eventDateShort: parsed.eventDateShort,
        eventDateMinus1: parsed.eventDateMinus1,
        discussionPoint1: parsed.discussionPoints[0] || '',
        discussionPoint2: parsed.discussionPoints[1] || '',
        discussionPoint3: parsed.discussionPoints[2] || '',
        discussionPoint4: parsed.discussionPoints[3] || '',
        discussionPoint5: parsed.discussionPoints[4] || '',
        briefTopicDescription: parsed.briefTopicDescription,
      });
    } finally {
      setIsParsing(false);
    }
  };

  // Download template files
  const handleDownloadTextTemplate = () => {
    const template = generateEventDataTemplate();
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panel_event_template.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Template downloaded', 'success');
  };

  const handleDownloadCSVTemplate = () => {
    const template = generateEventDataTemplateCSV();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panel_event_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('CSV template downloaded', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Panel Event</h1>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Auto-Fill Section */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Auto-Fill from File
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Upload a text or CSV file with event details to automatically fill this form. Save time by preparing your event data in advance!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <Upload className="w-4 h-4" />
            {isUploading ? 'Uploading...' : 'Upload Event Data'}
            <input
              type="file"
              accept=".txt,.csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          <button
            type="button"
            onClick={handleDownloadTextTemplate}
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download .txt Template
          </button>

          <button
            type="button"
            onClick={handleDownloadCSVTemplate}
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download .csv Template
          </button>
        </div>
      </div>

      {/* Paste raw brief */}
      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Paste Event Brief (optional)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          Drop in any event outline, email, or notes. We’ll scan it for key details (date, topic,
          focus points) and fill the form for you. You can edit everything before saving.
        </p>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={8}
          placeholder={`Example:\nDate: Wednesday, October 8, 2025\nTime: 8:00 PM – 9:00 PM EST\nTopic: From Stuck to Thriving...\nWebinar Focus:\n- Redefining veterinary leadership...\n- Building cultures that foster innovation...`}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 font-mono text-sm"
        />
        {rawTextError && <p className="text-red-500 text-sm mt-2">{rawTextError}</p>}
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={handleParseRawText}
            disabled={isParsing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isParsing ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Parsing…
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Extract Event Details
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g., OCT 29 Panel Event"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Panel Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Panel Name (Short Title) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.panelTitle}
            onChange={(e) => updateField('panelTitle', e.target.value)}
            placeholder="e.g., Veterinary Culture & Leadership Panel"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Short name for the panel (used in subject lines and headers)
          </p>
          {errors.panelTitle && <p className="text-red-500 text-sm mt-1">{errors.panelTitle}</p>}
        </div>

        {/* Panel Subtitle */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Panel Topic (Full Descriptive Title) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.panelSubtitle}
            onChange={(e) => updateField('panelSubtitle', e.target.value)}
            placeholder="e.g., From Stuck to Thriving: Redefining Leadership, Communication, and Culture in Modern Veterinary Practices"
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Full topic description (this is what appears in quotes in invitation emails)
          </p>
          {errors.panelSubtitle && (
            <p className="text-red-500 text-sm mt-1">{errors.panelSubtitle}</p>
          )}
        </div>

        {/* Panel Purpose */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Panel Purpose <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.panelPurpose}
            onChange={(e) => updateField('panelPurpose', e.target.value)}
            placeholder="e.g., address the workforce crisis in veterinary medicine"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          {errors.panelPurpose && (
            <p className="text-red-500 text-sm mt-1">{errors.panelPurpose}</p>
          )}
        </div>

        {/* Event Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.eventDate}
              onChange={(e) => updateField('eventDate', e.target.value)}
              placeholder="e.g., October 29th"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Event Date (Full) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.eventDateFull}
              onChange={(e) => updateField('eventDateFull', e.target.value)}
              placeholder="e.g., Wednesday, October 29th, 2025"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            {errors.eventDateFull && (
              <p className="text-red-500 text-sm mt-1">{errors.eventDateFull}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Event Date (Short) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.eventDateShort}
              onChange={(e) => updateField('eventDateShort', e.target.value)}
              placeholder="e.g., 29th"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            {errors.eventDateShort && (
              <p className="text-red-500 text-sm mt-1">{errors.eventDateShort}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Previous Day <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.eventDateMinus1}
              onChange={(e) => updateField('eventDateMinus1', e.target.value)}
              placeholder="e.g., October 28th"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            {errors.eventDateMinus1 && (
              <p className="text-red-500 text-sm mt-1">{errors.eventDateMinus1}</p>
            )}
          </div>
        </div>

        {/* Discussion Points */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Discussion Points (5 required) <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => {
              const key = `discussionPoint${i}` as keyof FormData;
              return (
                <div key={i}>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    placeholder={`Discussion Point ${i}`}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                  />
                  {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Brief Topic Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Brief Topic Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.briefTopicDescription}
            onChange={(e) => updateField('briefTopicDescription', e.target.value)}
            placeholder="e.g., recruitment, retention, and rebuilding teams"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          <p className="text-sm text-slate-500 mt-1">
            Short summary used in some email templates
          </p>
          {errors.briefTopicDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.briefTopicDescription}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Event & Import Panelists
          </button>
        </div>
      </form>
    </div>
  );
}
