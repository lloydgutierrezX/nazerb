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
} from "lucide-react";
import { memo } from "react";

const Icon = memo(function Icon(props: {
  icon: string | undefined;
  classNames: string;
}) {
  const { icon, classNames } = props;

  if (!icon) {
    return;
  }

  return (
    <>
      {(() => {
        switch (icon) {
          case "log-out":
            return <LogOut className={classNames} />;
          case "settings":
            return <Settings className={classNames} />;
          case "user-cog":
            return <UserCog className={classNames} />;
          case "user":
            return <User className={classNames} />;
          case "menu":
            return <Menu className={classNames} />;
          case "house":
            return <House className={classNames} />;
          case "calendarclock":
            return <CalendarClock className={classNames} />;
          case "foldercog":
            return <FolderCog className={classNames} />;
          case "fileuser":
            return <FileUser className={classNames} />;
          case "usercog":
            return <UserCog className={classNames} />;
          case "circleuser":
            return <CircleUser className={classNames} />;
          case "shielduser":
            return <ShieldUser className={classNames} />;
          case "chevronup":
            return <ChevronUp className={classNames} />;
          case "chevrondown":
            return <ChevronDown className={classNames} />;
          case "penciloff":
            return <PencilOff className={classNames} />;
          case "trash":
            return <Trash className={classNames} />;
          case "plus":
            return <Plus className={classNames} />;
          default:
            console.warn(`No icon for ${icon}`);
            return "";
        }
      })()}
    </>
  );
});

export default Icon;
