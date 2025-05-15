import { memo } from "react";

export const SkeletonTable = memo(function SkeletonTable() {
  return (
    <div className="flex w-full max-w-[600px] flex-col rounded-xl border border-base-content/5 bg-base-100 shadow-md justify-self-center mt-10">
      <div className="flex flex-row h-15 border-b-1 border-gray-200">
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
      </div>
      <div className="flex flex-row h-15 border-b-1 border-gray-200">
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
      </div>
      <div className="flex flex-row h-15 border-gray-200">
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
        <div className="flex skeleton h-2 flex-grow mx-10 self-center"></div>
      </div>
    </div>
  );
});
