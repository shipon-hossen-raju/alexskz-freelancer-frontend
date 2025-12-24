const SkeletonNotificationLoader = () => {
  // Skeleton notification loader 10x
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse max-w-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonNotificationLoader;
