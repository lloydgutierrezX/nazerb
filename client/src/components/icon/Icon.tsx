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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  KeyRound,
  Smartphone,
  Link,
  HandCoins,
  PhilippinePeso,
  WalletCards,
  FileCog,
  ChartSpline,
  Users,
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
          case "calendar-clock":
            return (
              <CalendarClock
                className={classNames}
                color={color ?? undefined}
              />
            );
          case "folder-cog":
            return (
              <FolderCog className={classNames} color={color ?? undefined} />
            );
          case "file-user":
            return (
              <FileUser className={classNames} color={color ?? undefined} />
            );

          case "circle-user":
            return (
              <CircleUser className={classNames} color={color ?? undefined} />
            );
          case "shield-user":
            return (
              <ShieldUser className={classNames} color={color ?? undefined} />
            );

          case "chevron-left":
            return (
              <ChevronLeft className={classNames} color={color ?? undefined} />
            );
          case "chevrons-left":
            return (
              <ChevronsLeft className={classNames} color={color ?? undefined} />
            );

          case "chevron-right":
            return (
              <ChevronRight className={classNames} color={color ?? undefined} />
            );
          case "chevrons-right":
            return (
              <ChevronsRight
                className={classNames}
                color={color ?? undefined}
              />
            );

          case "chevron-up":
            return (
              <ChevronUp className={classNames} color={color ?? undefined} />
            );
          case "chevron-down":
            return (
              <ChevronDown className={classNames} color={color ?? undefined} />
            );

          case "pencil-off":
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

          case "mail":
            return <Mail className={classNames} color={color ?? undefined} />;

          case "key-round":
            return (
              <KeyRound className={classNames} color={color ?? undefined} />
            );
          case "smartphone":
            return (
              <Smartphone className={classNames} color={color ?? undefined} />
            );
          case "link":
            return <Link className={classNames} color={color ?? undefined} />;

          case "hand-coins":
            return (
              <HandCoins className={classNames} color={color ?? undefined} />
            );

          case "peso":
            return (
              <PhilippinePeso
                className={classNames}
                color={color ?? undefined}
              />
            );

          case "wallet-cards":
            return (
              <WalletCards className={classNames} color={color ?? undefined} />
            );

          case "file-cog":
            return (
              <FileCog className={classNames} color={color ?? undefined} />
            );

          case "chart-spline":
            return (
              <ChartSpline className={classNames} color={color ?? undefined} />
            );

          case "users":
            return <Users className={classNames} color={color ?? undefined} />;

          default:
            console.warn(`No icon for ${icon}`);
            return "";
        }
      })()}
    </>
  );
});
