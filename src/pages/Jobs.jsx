const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>

      {/** Jobs listing */}
      <div className="text-center mt-8">
        <span className="text-2xl p-5 ml-auto mt-8 text-blue-500 underline">Available Jobs</span>
      </div>
    </div>
  );
};

export default Jobs;
