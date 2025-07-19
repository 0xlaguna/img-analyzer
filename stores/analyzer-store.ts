import { createStore } from "zustand/vanilla"

import { UnanalyzedImage } from "@/types/v0/image"

export type RendererConfig = {
  width: number
  height: number
}

export type AnalyzerState = {
  imageCategoryId?: number
  searchTerm?: string
  images?: UnanalyzedImage[]
  rendererConfig: RendererConfig
}

export type AnalyzerActions = {
  setImageCategory: (id: number) => void
  setSearchTerm: (search: string) => void
}

export type AnalyzerStore = AnalyzerState & AnalyzerActions

export const defaultState: AnalyzerState = {
  imageCategoryId: undefined,
  searchTerm: undefined,
  images: undefined,
  rendererConfig: {
    width: 100,
    height: 100,
  },
}

export const defaultInitAnalyzerState: AnalyzerState = defaultState

export const initAnalyzerStore = (): AnalyzerState => {
  return defaultInitAnalyzerState
}

export const createAnalyzerStore = (
  initState: AnalyzerState = defaultInitAnalyzerState
) => {
  return createStore<AnalyzerStore>()((set) => ({
    ...initState,
    setImageCategory: (id) =>
      set((state) => ({ ...state, imageCategoryId: id })),
    setSearchTerm: (term) => set((state) => ({ ...state, searchTerm: term })),
  }))
}
