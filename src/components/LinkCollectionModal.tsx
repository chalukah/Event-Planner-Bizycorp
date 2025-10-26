import React, { useState, useEffect } from 'react';
import { usePanelStore } from '../panelStore';
import type { Panelist } from '../types';

interface LinkCollectionModalProps {
  eventId: string;
  onClose: () => void;
  onComplete: () => void;
}

export const LinkCollectionModal: React.FC<LinkCollectionModalProps> = ({
  eventId,
  onClose,
  onComplete,
}) => {
  const { panelEvents, updatePanelist } = usePanelStore();
  const event = panelEvents.find((e) => e.id === eventId);

  const [currentPanelistIndex, setCurrentPanelistIndex] = useState(0);
  const [linkData, setLinkData] = useState<Record<string, Partial<Panelist>>>({});

  useEffect(() => {
    if (!event) return;

    // Initialize link data for all panelists
    const initialData: Record<string, Partial<Panelist>> = {};
    event.panelists.forEach((panelist) => {
      initialData[panelist.id] = {
        zoomJoinLink: panelist.zoomJoinLink || '',
        registrationTrackingLink: panelist.registrationTrackingLink || '',
        promotionalMaterialsLink: panelist.promotionalMaterialsLink || '',
        finalBannerLink: panelist.finalBannerLink || '',
      };
    });
    setLinkData(initialData);
  }, [event]);

  if (!event) return null;

  const currentPanelist = event.panelists[currentPanelistIndex];
  if (!currentPanelist) return null;

  const currentLinks = linkData[currentPanelist.id] || {};

  const handleLinkChange = (field: keyof Panelist, value: string) => {
    setLinkData({
      ...linkData,
      [currentPanelist.id]: {
        ...currentLinks,
        [field]: value,
      },
    });
  };

  const handleNext = () => {
    if (currentPanelistIndex < event.panelists.length - 1) {
      setCurrentPanelistIndex(currentPanelistIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPanelistIndex > 0) {
      setCurrentPanelistIndex(currentPanelistIndex - 1);
    }
  };

  const handleSaveAndClose = () => {
    // Save all link data to panelists
    Object.entries(linkData).forEach(([panelistId, links]) => {
      updatePanelist(eventId, panelistId, links);
    });
    onComplete();
  };

  const handleSkip = () => {
    onClose();
  };

  const isComplete = Object.values(currentLinks).every((link) => typeof link === 'string' && link.trim() !== '');
  const allComplete = event.panelists.every((panelist) => {
    const links = linkData[panelist.id];
    return (
      links &&
      links.zoomJoinLink?.trim() &&
      links.registrationTrackingLink?.trim() &&
      links.promotionalMaterialsLink?.trim() &&
      links.finalBannerLink?.trim()
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Collect Required Links</h2>
            <p className="text-sm text-gray-600 mt-1">
              Panelist {currentPanelistIndex + 1} of {event.panelists.length}: {currentPanelist.fullName}
            </p>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> These links are required for the email templates. You can add
              them now or skip and add them later before sending emails.
            </p>
          </div>

          <div className="space-y-6">
            {/* Zoom Join Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Zoom Join Link (Panelist)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Used in: E-10 Promotional Materials, E-4 3 Days Reminder, E-2 Tomorrow Panel, E-1
                Today is Day, E-DAY (2 hours), E-DAY (Starting Now)
              </p>
              <input
                type="url"
                value={currentLinks.zoomJoinLink || ''}
                onChange={(e) => handleLinkChange('zoomJoinLink', e.target.value)}
                placeholder="https://us02web.zoom.us/w/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Registration Tracking Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Tracking Link (Unique per Panelist)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Used in: E-10 Promotional Materials, E-5 Help Reach More, E-4 3 Days Reminder, E-2
                Tomorrow Panel
              </p>
              <input
                type="url"
                value={currentLinks.registrationTrackingLink || ''}
                onChange={(e) => handleLinkChange('registrationTrackingLink', e.target.value)}
                placeholder="https://us02web.zoom.us/webinar/register/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Promotional Materials Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Promotional Materials Google Doc Link
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Used in: E-10 Promotional Materials, E-4 3 Days Reminder, E-2 Tomorrow Panel
              </p>
              <input
                type="url"
                value={currentLinks.promotionalMaterialsLink || ''}
                onChange={(e) => handleLinkChange('promotionalMaterialsLink', e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Final Banner Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Final Banner Link ("Going Live Tonight" Graphic)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Used in: E-1 Today is Day</p>
              <input
                type="url"
                value={currentLinks.finalBannerLink || ''}
                onChange={(e) => handleLinkChange('finalBannerLink', e.target.value)}
                placeholder="https://docs.google.com/document/d/...?tab=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Progress Indicator */}
            <div className="pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  {isComplete ? '✓ All links complete' : 'Please fill all required fields'}
                </span>
                <span>
                  Completed: {event.panelists.filter((p) => {
                    const links = linkData[p.id];
                    return (
                      links &&
                      links.zoomJoinLink?.trim() &&
                      links.registrationTrackingLink?.trim() &&
                      links.promotionalMaterialsLink?.trim() &&
                      links.finalBannerLink?.trim()
                    );
                  }).length}{' '}
                  / {event.panelists.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      (event.panelists.filter((p) => {
                        const links = linkData[p.id];
                        return (
                          links &&
                          links.zoomJoinLink?.trim() &&
                          links.registrationTrackingLink?.trim() &&
                          links.promotionalMaterialsLink?.trim() &&
                          links.finalBannerLink?.trim()
                        );
                      }).length /
                        event.panelists.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPanelistIndex === 0}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPanelistIndex === event.panelists.length - 1}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip for Now
            </button>
            <button
              onClick={handleSaveAndClose}
              disabled={!allComplete}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              {allComplete ? 'Save All Links & Update Emails' : 'Complete All to Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
