export const Loader=()=> {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative w-24 h-24">
          {/* Glowing Circular Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-blue animate-spin"></div>
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-full border-4 border-glowing-white blur-md"></div>
        </div>
      </div>
    );
  }
  


  