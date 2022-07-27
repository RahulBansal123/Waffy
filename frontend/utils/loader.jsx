const Loader = () => (
  <div className="flex justify-center items-center">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-2 rounded-full"
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
