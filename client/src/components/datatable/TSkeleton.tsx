import { memo } from "react";

type ISekeletonColumn = { columnCount: number };
interface ISkeletonTableProps extends ISekeletonColumn {
  type: "column" | "pagination";
}

const SkeletonColumn = ({ columnCount }: ISekeletonColumn) => {
  return (
    <tbody>
      {[...Array(10).keys()].map((_, idx) => (
        <tr key={idx}>
          {[...Array(columnCount).keys()].map((_, idx) => (
            <td key={idx}>
              <div className="skeleton h-10" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const SkeletonTable = memo(function SkeletonTable({
  columnCount,
  type,
}: ISkeletonTableProps) {
  return type === "column" ? (
    <SkeletonColumn columnCount={columnCount + 1} />
  ) : (
    <div className="flex flex-col w-full shadow-md c">
      {/* {[...Array(10).keys()].map((_, idx) => ( */}
      <div></div>
      {/* // <SkeletonColumn key={idx} columnCount={columnCount} type={type} /> */}
      {/* ))} */}
    </div>
  );
});
