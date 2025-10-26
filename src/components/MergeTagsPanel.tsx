import { Tag } from 'lucide-react';

type MergeTagsPanelProps = {
  onInsertTag: (tag: string) => void;
};

const MERGE_TAGS = [
  { label: 'Event Name', tag: '{{EventName}}' },
  { label: 'Event Date', tag: '{{EventDate}}' },
  { label: 'Start Time', tag: '{{StartTime}}' },
  { label: 'End Time', tag: '{{EndTime}}' },
  { label: 'Venue', tag: '{{Venue}}' },
  { label: 'Join Link', tag: '{{JoinLink}}' },
  { label: 'Speaker Name', tag: '{{SpeakerName}}' },
  { label: 'Moderator Name', tag: '{{ModeratorName}}' },
  { label: 'RSVP Link', tag: '{{RSVPLink}}' },
  { label: 'Contact Email', tag: '{{ContactEmail}}' },
  { label: 'Organizer Name', tag: '{{OrganizerName}}' }
];

export function MergeTagsPanel({ onInsertTag }: MergeTagsPanelProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-800">
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Tag className="w-4 h-4" />
          Merge Tags
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {MERGE_TAGS.map(({ label, tag }) => (
          <button
            key={tag}
            onClick={() => onInsertTag(tag)}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
          >
            <div className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {label}
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {tag}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
