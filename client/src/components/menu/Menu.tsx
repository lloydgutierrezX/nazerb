import { memo } from "react";
import { IMenu, jsonMenu } from "./IMenu";
import { MenuItem } from "./MenuItem";

export const Menu = memo(function Menu() {
  const menu: IMenu[] = jsonMenu;
  return (
    <ul className="menu w-full bg-transparent px-0 pt-5">
      <MenuItem items={menu} />
    </ul>
  );
});
