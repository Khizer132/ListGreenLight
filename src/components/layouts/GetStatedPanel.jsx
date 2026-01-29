import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStepNavigation } from '../context/StepNavigationContext'

const GetStatedPanel = () => {

    const navigate = useNavigate()
    const { registerNext } = useStepNavigation()


    const handleNext = () => {
        navigate("/user-info")
    }

    useEffect(() => {
        registerNext(handleNext)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
            <div className="max-w-lg px-4 mx-auto">
                <div className="bg-linear-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-6 sm:p-8 mb-4 sm:mb-6 text-center">
                    <h1 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">
                        Get Properties Photos Ready-
                        <br />
                        Before Your Photographer Arives
                    </h1>
                    <p className=" sm:text-lg mb-4 text-emerald-100">AI catches staging issues quickly-before your photographer arrives</p>

                    <div className="space-y-2 text-xs sm:text-sm">
                        <div>✓ Save time with pre-shoot property analysis</div>
                        <div>✓ Avoid Photographer reshoots and scheduling delays</div>
                        <div>✓ Share the instants checklist with sellers</div>
                    </div>

                </div>
                <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center">
                    <div className="inline-block bg-yellow-400 text-gray-900 px-3  py-1 rounded-full text-xs font-bold mb-4">🚀 BETA LAUNCH SPECIAL</div>
                    <div className="text-gray-500 line-through text-xl sm:text-2xl mb-2">$39</div>
                    <div className="text-4xl sm:text-6xl font-bold text-emerald-600 mb-2">$19.99</div>
                    <div className="text-sm sm:text-base text-gray-600 mb-1">Single Property Analysis</div>
                    <div className="inline-block bg-emerald-100 text-emerald-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">50% OFF - Beta Special</div>

                    <div className="space-y-3 text-left mb-6 sm:mb-8">
                        <div className="flex gap-2 sm:gap-3">
                            <span className='text-emerald-600 flex'>✓</span>
                            <span>AI-powered staging analysis</span>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                            <span className='text-emerald-600 flex'>✓</span>
                            <span>Detailed room-by-room checklists</span>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                            <span className='text-emerald-600 flex'>✓</span>
                            <span>Before/after approval system</span>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                            <span className='text-emerald-600'>✓</span>
                            <span>Quick results</span>
                        </div>
                    </div>
                    <button
                        onClick={handleNext}
                        className=" w-full px-30 bg-emerald-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-emerald-700" >
                        Get Started - $19.99
                    </button>
                    <span className='flex items-center justify-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600' >🛡️  100% Money-Back Guarantee</span>
                </div>
            </div>

        </div>
    )
}

export default GetStatedPanel
