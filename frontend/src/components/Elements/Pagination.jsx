import React,{useState} from "react";

export const Pagination = ({page,pages,total,setCurrentPage,currentPage}) => {
  return (
    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 py-4">
      {/* First Button */}
      <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-lg">
        First
      </button>

      {/* Previous Button */}
      <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-lg">
        Previous
      </button>

      {/* Page Numbers */}
      {
        Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            onClick={()=>setCurrentPage(currentPage)}
            key={pageNumber}
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded-lg ${currentPage === page? 'bg-purple-500 shadow-[0px_0px_10px_rgba(138,43,226,0.8)]' : ''}`}
          >
            {pageNumber}
          </button>
        ))
      }
 

      {/* Next Button */}
      <button onClick={()=>setCurrentPage(currentPage+1)} className="text-white hover:bg-gray-700 px-3 py-2 rounded-lg">
        Next
      </button>

      {/* Last Button */}
      <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-lg">
        Last
      </button>
    </nav>
  );
};


