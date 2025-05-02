import { NavLink } from "react-router-dom";
import Icon from "../icon/Icon";
import { IMenu } from "./MenuInterface";
import { memo, useMemo } from "react";
import { usePageContext } from "../../hooks/Page";

const activeNavLink = {
  backgroundColor: "#ffffffe6",
  color: "#343a40",
};

const isCollapse = (menu: IMenu, curPage: string) => {
  return (menu?.children ?? []).some((m: IMenu) => m.key === curPage);
};

const MenuItem = memo(function MenuItem(props: { items: IMenu[] }) {
  const currentPath = usePageContext();
  const currentPage = useMemo(
    () => currentPath[currentPath.length - 1],
    [currentPath]
  );

  return props.items.map((m: IMenu) => {
    const key = `${m.key}-path-${Math.random()}`;
    if (m.children) {
      return (
        <li key={key} className="uppercase py-3">
          <details open={isCollapse(m, currentPage)}>
            <summary className="hover:bg-gray-700">
              <Icon icon={m.icon} classNames="" />
              {m.key}
            </summary>
            <ul className="m-0">
              <MenuItem items={m.children} />
            </ul>
          </details>
        </li>
      );
    }

    return (
      <li
        key={key}
        className="uppercase mb-1 rounded-sm hover:bg-gray-700 hover:border-left-1 hover:border-gray-600"
      >
        <NavLink
          className="py-2"
          to={m.path || "/"}
          style={({ isActive }) => (isActive ? activeNavLink : {})}
        >
          <Icon icon={m.icon} classNames="" />
          {m.key}{" "}
        </NavLink>
      </li>
    );
  });
});

export default MenuItem;
