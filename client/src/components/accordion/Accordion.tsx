import { ReactNode } from "react";

type IAccordion = {
  title: {
    value: string;
    className?: string;
  };
  defaultChecked?: boolean;
  content?: {
    className?: string;
    value: string;
  };
  children?: ReactNode;
};

export const Accordion = ({
  children,
  title,
  content,
  defaultChecked,
}: IAccordion) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input
        type="radio"
        name="my-accordion-2"
        defaultChecked={defaultChecked ?? false}
      />

      <div className={`collapse-title ${title.className ?? "font-semibold"}`}>
        {title.value}
      </div>

      <div className={`collapse-content ${content?.className ?? "text-sm"}`}>
        {content?.value ?? children}
      </div>
    </div>
  );
};
