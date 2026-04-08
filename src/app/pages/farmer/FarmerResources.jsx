import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Search } from 'lucide-react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const FarmerResources = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState({ categories: [], items: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [message, setMessage] = useState('');
  const articleItems = data.items ?? [];

  useEffect(() => {
    api.getFarmerResources(search)
      .then((response) => {
        const items = (response.items ?? []).filter(
          (item) => (item.type ?? '').toLowerCase() === 'article'
        );
        setData({
          categories: [
            {
              label: 'Articles & Guides',
              count: items.length,
              color: '#1B5E20',
            },
          ],
          items,
        });
      })
      .catch((error) => setMessage(error.message));
  }, [search]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Learning Resources</h1>
        <p className="text-gray-600">
          Read published articles and guides from the platform in full detail
        </p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card hover={false}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card hover={false}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Articles & Guides</h2>
              <p className="text-sm text-gray-600">Only article and guide content is shown in the farmer resource page.</p>
            </div>
            <span className="rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
              {articleItems.length} live articles
            </span>
          </div>

          {articleItems.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Published Articles Found"
              description="Only published articles and guides are shown in this portal. Try another search term or publish content from the admin side."
            />
          ) : (
            <div className="space-y-4">
              {articleItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]"
                  onClick={() => setSelectedArticle(item)}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.authorName} | {item.topic}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">
                      Article & Guide
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                    Read full article
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <DetailModal
        isOpen={Boolean(selectedArticle)}
        title={selectedArticle?.title}
        subtitle={selectedArticle ? `${selectedArticle.authorName} | ${selectedArticle.topic}` : ''}
        onClose={() => setSelectedArticle(null)}
        maxWidth="max-w-4xl"
        actions={
          selectedArticle?.resourceUrl ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open(selectedArticle.resourceUrl, '_blank', 'noopener,noreferrer')}
            >
              Open Source Link
            </Button>
          ) : null
        }
      >
        {selectedArticle ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Format
                </div>
                <div className="mt-2 text-sm text-gray-700">Article & Guide</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Status
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedArticle.status}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Published
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {formatDisplayDateTime(selectedArticle.createdAt)}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5">
              <div className="text-sm font-semibold text-gray-900">Article Summary</div>
              <p className="mt-3 text-sm leading-7 text-gray-600">{selectedArticle.description}</p>
            </div>

            <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">
              {selectedArticle.contentBody}
            </article>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default FarmerResources;
