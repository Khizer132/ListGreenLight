import { createContext, useContext, useRef } from "react"

const StepNavigationContext = createContext(null)

export const StepNavigationProvider = ({ children }) => {
  const nextHandlerRef = useRef(null)


  // register the next handler
  const registerNext = (fn) => {
    nextHandlerRef.current = fn
  }

  // trigger the next handler
  const triggerNext = () => {
    if (nextHandlerRef.current) {
      nextHandlerRef.current()
    }
  }

  return (
    <StepNavigationContext.Provider
      value={{ registerNext, triggerNext }}
    >
      {children}
    </StepNavigationContext.Provider>
  )
}

export const useStepNavigation = () => useContext(StepNavigationContext)