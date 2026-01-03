'use client';

import React, { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalSize = 'sm' | 'md' | 'lg' | 'xxl';

interface ModalProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  show: boolean;
  onSuccess?: () => void;
  onCancel: () => void;
  successButtonTitle?: string;
  successButtonDisabled?: boolean;
  cancelButtonTitle?: string;
  size?: ModalSize;
  showFooter?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  children,
  show,
  onSuccess,
  onCancel,
  successButtonTitle = 'Submit',
  successButtonDisabled = false,
  cancelButtonTitle = 'Cancel',
  size = 'sm',
  showFooter = true,
  className = '',
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
    if (!successButtonDisabled) {
      onSuccess?.();
      setOpen(false);
    }
  };

  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
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
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md transition-opacity ${className}`} />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <Dialog.Panel
                className={`
                  relative w-full ${sizeClasses[size]}
                  transform overflow-hidden rounded-3xl
                  bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl
                  shadow-2xl ring-1 ring-black/5 dark:ring-black/20
                  text-left align-middle transition-all
                  border border-white/20 dark:border-amber-800/30
                `}
              >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 px-8 py-6 border-b border-amber-200/30 dark:border-amber-800/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <Dialog.Title as="h3" className="text-3xl font-bold text-gray-900 dark:text-amber-100">
                        {title}
                      </Dialog.Title>
                      {subtitle && (
                        <p className="mt-2 text-lg text-amber-700 dark:text-amber-300 font-medium opacity-90">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="rounded-full p-2 bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 shadow-md transition hover:scale-105"
                      onClick={handleClose}
                      ref={cancelButtonRef}
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* BODY */}
                <div className="px-8 py-8 bg-white/60 dark:bg-gray-800/60">
                  {children}
                </div>

                {/* FOOTER */}
                {showFooter && (
                  <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30 px-8 py-6 border-t border-amber-200/30 dark:border-amber-800/40 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-8 py-3.5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition transform hover:scale-105 shadow-md"
                    >
                      {cancelButtonTitle}
                    </button>
                    {onSuccess && (
                      <button
                        type="button"
                        onClick={handleSuccess}
                        disabled={successButtonDisabled}
                        className={`
                          px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition transform hover:scale-105
                          ${successButtonDisabled
                            ? 'bg-amber-300 dark:bg-amber-800 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 hover:from-amber-600 hover:to-orange-700 dark:hover:from-amber-700 dark:hover:to-orange-800'
                          }
                        `}
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