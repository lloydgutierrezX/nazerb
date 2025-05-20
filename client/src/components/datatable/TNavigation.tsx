import { Icon } from "Components/icon/Icon";
import { ITNavigationConfig } from "./IDatatable";

type TNavigationProps = {
  config: ITNavigationConfig[];
};

export const TNavigation = ({ config }: TNavigationProps) => {
  return (
    <div className="flex flex-row gap-2">
      {config.map((c, idx) => (
        <button
          key={idx}
          className="btn btn-square btn-xs"
          onClick={(e) => c.onClick(e)}
          disabled={c.disabled}
        >
          <Icon icon={c.icon} classNames="" />
        </button>
      ))}
    </div>
  );
};
