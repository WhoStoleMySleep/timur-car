"use client";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface AlertProps {
  field: string
}

export const AlertSuccess: React.FC<AlertProps> = ({field}) => {
  const [showAlert, setShowAlert] = useState(true);

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return showAlert ? (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
          Listing successfully edited!
          </p>
        </div>
        <div className="pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              onClick={dismissAlert}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AlertSuccess;
