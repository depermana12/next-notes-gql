import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-[125px] w-[350px] rounded-xl" />
      </div>
    </div>
  );
};
export default SkeletonLoader;
