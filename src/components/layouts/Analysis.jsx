import React from 'react'

const Analysis = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Analysis Complete!</h2>
          <p className='text-sm sm:text-base text-gray-600'>123 Maple Street, Omaha, NE 68102</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6'>
            <h3 className='text-xl sm:text-2xl font-bold'>Kitchen</h3>
            <span className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">11 Items</span>
          </div>
          <div className="bg-gray-100 h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">[Kitchen Photo]</div>

          <div className="space-y-3 overflow-hidden">
            <div className="space-y-3">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded ">
                <div className="text-sm sm:text-base font-bold mb-1">1. Kitchen</div>
                <p className="text-xs sm:text-sm">Remove knife block, spray bottles, and keys.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">🛋️ Living Room</h3>
            <span className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">✓ Ready!</span>
          </div>
          <div className="bg-gray-100 h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">[Living Room Photo]</div>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-6 rounded">
            <h4 className="text-sm sm:text-base font-bold text-emerald-900 mb-2">✓ This Room Looks Great!</h4>
            <p className="text-xs sm:text-sm text-emerald-800">Ready for professional photography!</p>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">🛏️ Primary Bedroom</h3>
            <span className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">✓ Ready!</span>
          </div>
          <div className="bg-gray-100 h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">[Pimary Bedroom Photo]</div>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-6 rounded">
            <h4 className="text-sm sm:text-base font-bold text-emerald-900 mb-2">✓ This Room Looks Great!</h4>
            <p className="text-xs sm:text-sm text-emerald-800">Ready for professional photography!</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">🚿 Primary Bathroom</h3>
            <span className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">✓ Ready!</span>
          </div>
          <div className="bg-gray-100 h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">[Primary Bathroom Photo]</div>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-6 rounded">
            <h4 className="text-sm sm:text-base font-bold text-emerald-900 mb-2">✓ This Room Looks Great!</h4>
            <p className="text-xs sm:text-sm text-emerald-800">Ready for professional photography!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis
