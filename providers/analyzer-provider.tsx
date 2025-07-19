"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import {
  createAnalyzerStore,
  initAnalyzerStore,
  type AnalyzerState,
  type AnalyzerStore,
} from "@/stores/analyzer-store"
import { useStore } from "zustand"

export type AnalyzerStoreApi = ReturnType<typeof createAnalyzerStore>

export const AnalyzerStoreContext = createContext<AnalyzerStoreApi | undefined>(
  undefined
)

export interface AnalyzerStoreProviderProps {
  children: ReactNode
  state?: AnalyzerState
}

export const AnalyzerStoreProvider = ({
  children,
  state,
}: AnalyzerStoreProviderProps) => {
  const storeRef = useRef<AnalyzerStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createAnalyzerStore(state ?? initAnalyzerStore())
  }

  return (
    <AnalyzerStoreContext.Provider value={storeRef.current}>
      {children}
    </AnalyzerStoreContext.Provider>
  )
}

export const useAnalyzerStore = <T,>(
  selector: (store: AnalyzerStore) => T
): T => {
  const analyzerStoreContext = useContext(AnalyzerStoreContext)

  if (!analyzerStoreContext) {
    throw new Error(
      `useAnalyzerStore must be used within AnalyzerStoreProvider`
    )
  }

  return useStore(analyzerStoreContext, selector)
}
