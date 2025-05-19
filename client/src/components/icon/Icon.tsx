import {
  CalendarClock,
  CircleUser,
  FileUser,
  FolderCog,
  House,
  ShieldUser,
  UserCog,
  ChevronUp,
  ChevronDown,
  PencilOff,
  Trash,
  Plus,
  Menu,
  User,
  Settings,
  LogOut,
  Component,
  X,
  Check,
  ToggleLeft,
  ToggleRight,
  TriangleAlert,
  RotateCcw,
} from "lucide-react";
import { memo } from "react";

export const Icon = memo(function Icon(props: {
  icon: string | undefined;
  classNames: string;
  color?: string;
}) {
  const { icon, classNames, color } = props;

  if (!icon) {
    return;
  }

  return (
    <>
      {(() => {
        switch (icon) {
          case "component":
            return (
              <Component className={classNames} color={color ?? undefined} />
            );
          case "log-out":
            return <LogOut className={classNames} color={color ?? undefined} />;
          case "settings":
            return (
              <Settings className={classNames} color={color ?? undefined} />
            );
          case "user-cog":
            return (
              <UserCog className={classNames} color={color ?? undefined} />
            );
          case "user":
            return <User className={classNames} color={color ?? undefined} />;
          case "menu":
            return <Menu className={classNames} color={color ?? undefined} />;
          case "house":
            return <House className={classNames} color={color ?? undefined} />;
          case "calendarclock":
            return (
              <CalendarClock
                className={classNames}
                color={color ?? undefined}
              />
            );
          case "foldercog":
            return (
              <FolderCog className={classNames} color={color ?? undefined} />
            );
          case "fileuser":
            return (
              <FileUser className={classNames} color={color ?? undefined} />
            );
          case "usercog":
            return (
              <UserCog className={classNames} color={color ?? undefined} />
            );
          case "circleuser":
            return (
              <CircleUser className={classNames} color={color ?? undefined} />
            );
          case "shielduser":
            return (
              <ShieldUser className={classNames} color={color ?? undefined} />
            );
          case "chevronup":
            return (
              <ChevronUp className={classNames} color={color ?? undefined} />
            );
          case "chevrondown":
            return (
              <ChevronDown className={classNames} color={color ?? undefined} />
            );
          case "penciloff":
            return (
              <PencilOff className={classNames} color={color ?? undefined} />
            );
          case "trash":
            return <Trash className={classNames} color={color ?? undefined} />;
          case "plus":
            return <Plus className={classNames} color={color ?? undefined} />;
          case "x":
            return <X className={classNames} color={color ?? undefined} />;
          case "check":
            return <Check className={classNames} color={color ?? undefined} />;
          case "toggle-left":
            return (
              <ToggleLeft className={classNames} color={color ?? undefined} />
            );
          case "toggle-right":
            return (
              <ToggleRight className={classNames} color={color ?? undefined} />
            );
          case "triangle-alert":
            return (
              <TriangleAlert
                className={classNames}
                color={color ?? undefined}
              />
            );
          case "rotate-ccw":
            return (
              <RotateCcw className={classNames} color={color ?? undefined} />
            );
          default:
            console.warn(`No icon for ${icon}`);
            return "";
        }
      })()}
    </>
  );
});
