import React from 'react';

const CalendarFlipPage = React.forwardRef(({ dateText, daysRemaining, isTorn }, ref) => {
  return (
    <div className="page" ref={ref} style={{ backgroundColor: 'white' }}>
      <div className="w-full h-full flex flex-col relative overflow-hidden bg-white border border-neutral-200">
        
        {/* Binder / Calendar Holes at the top */}
        <div className="absolute top-0 left-0 w-full h-8 bg-neutral-100 flex justify-evenly items-center border-b border-neutral-200 z-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3 h-3 bg-neutral-800 rounded-full shadow-inner" />
          ))}
        </div>

        <div className="pt-12 px-6 flex justify-between items-center w-full z-10 relative">
          <h2 className="text-xl font-bold text-neutral-800 tracking-wider uppercase">
            {dateText}
          </h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative">
            <span className="absolute -top-6 -left-8 text-neutral-400 font-semibold text-lg tracking-widest">
              Today
            </span>
            
            <h1 className="text-[9rem] font-black text-neutral-900 leading-none tracking-tighter" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.1)' }}>
              {daysRemaining}
            </h1>
            
            <span className="absolute -bottom-2 -right-10 text-neutral-400 font-bold text-xl">
              Th day
            </span>
          </div>
        </div>
        
        <div className="pb-6 text-center text-neutral-300 text-sm font-medium tracking-widest uppercase z-10 relative">
          UNTIL 2027
        </div>

      </div>
    </div>
  );
});

export default CalendarFlipPage;
