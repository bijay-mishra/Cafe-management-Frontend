'use client';

import React, { Fragment,  useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalSize = 'sm' | 'md' | 'lg' | 'xxl';

interface ModalProps {
  title: string;
  children: ReactNode;
  show: boolean;
  onSuccess?: () => void;
  onCancel: () => void;
  successButtonTitle?: string;
  size?: ModalSize;
  showFooter?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  show,
  onSuccess,
  onCancel,
  successButtonTitle = 'Submit',
  size = 'sm',
  showFooter = true,
}) => {
  const [open, setOpen] = useState(show);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    onCancel();
    setOpen(false);
  };

  const handleSuccess = () => {
    onSuccess?.();
    setOpen(false);
  };

  const sizeClasses = {
    sm: 'max-w-xl',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
    xxl: 'max-w-7xl',
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full ${sizeClasses[size]} p-6`}
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="mt-4">{children}</div>

                {/* Footer */}
                {showFooter && (
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
                    >
                      Cancel
                    </button>
                    {onSuccess && (
                      <button
                        type="button"
                        onClick={handleSuccess}
                        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                      >
                        {successButtonTitle}
                      </button>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;