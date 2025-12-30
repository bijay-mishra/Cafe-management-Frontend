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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity ${className}`} />
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
                  bg-white/90 backdrop-blur-xl
                  shadow-2xl ring-1 ring-black/5
                  text-left align-middle transition-all
                  border border-white/20
                `}
              >
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-8 py-6 border-b border-amber-200/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <Dialog.Title as="h3" className="text-3xl font-bold text-gray-900">
                        {title}
                      </Dialog.Title>
                      {subtitle && (
                        <p className="mt-2 text-lg text-amber-700 font-medium opacity-90">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="rounded-full p-2 bg-white/70 hover:bg-white shadow-md transition hover:scale-105"
                      onClick={handleClose}
                      ref={cancelButtonRef}
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="px-8 py-8 bg-white/60">
                  {children}
                </div>
                {showFooter && (
                  <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 px-8 py-6 border-t border-amber-200/30 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-8 py-3.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition transform hover:scale-105 shadow-md"
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
                            ? 'bg-amber-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
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