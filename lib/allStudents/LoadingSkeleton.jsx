export default function LoadingSkeleton() {
  return (
    <div className=" w-full h-full flex flex-col mt-3 justify-center items-center">
      <h2 className=" font-medium ">Loading All Students....</h2>
      <div className="w-full h-full flex-wrap flex justify-around bg-gray-200 animate-pulse">
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
      </div>
    </div>
  );
}
