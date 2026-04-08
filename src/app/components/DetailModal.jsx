import React from 'react';
import { Button } from './Button';

export const DetailModal = ({
  isOpen,
  title,
  subtitle,
  onClose,
  children,
  actions = null,
  maxWidth = 'max-w-4xl',
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle ? <p className="mt-2 text-sm text-gray-600">{subtitle}</p> : null}
          </div>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        {children}

        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
};
