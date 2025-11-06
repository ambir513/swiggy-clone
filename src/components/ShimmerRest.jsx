export function ShimmerRestCard() {
  return (
    <div className="flex  flex-col gap-4">
      <div className="skeleton h-[200px] w-[300px]"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}
