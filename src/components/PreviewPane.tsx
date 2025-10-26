import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PreviewPaneProps = {
  content: string;
  type: 'html' | 'md';
};

export function PreviewPane({ content, type }: PreviewPaneProps) {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto p-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {type === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
