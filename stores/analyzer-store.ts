import { createStore } from "zustand/vanilla"

import { UnanalyzedImage } from "@/types/v0/image"

export type RendererConfig = {
  width: number
  height: number
  scale: number
  imageWidth: number
  imageHeight: number
}

export type BoundingBox = {
  topLeftX: number
  topLeftY: number
  width: number
  height: number
}

export type AnalyzerState = {
  imageCategoryId?: number
  selectedImage?: UnanalyzedImage
  searchTerm?: string
  images?: UnanalyzedImage[]
  rendererConfig: RendererConfig
  boundingBox?: BoundingBox
}

export type AnalyzerActions = {
  setImageCategory: (id: number) => void
  setSelectedImage: (id: UnanalyzedImage) => void
  setSearchTerm: (search: string) => void
  setScale: (scale: number) => void
  setImageSize: (imageWidth: number, imageHeight: number) => void
  setSize: (width: number, height: number) => void
  setBoundingBox: (box: BoundingBox) => void
}

export type AnalyzerStore = AnalyzerState & AnalyzerActions

export const defaultState: AnalyzerState = {
  imageCategoryId: undefined,
  searchTerm: undefined,
  selectedImage: undefined,
  images: undefined,
  rendererConfig: {
    width: 100,
    height: 100,
    scale: 1,
    imageHeight: 100,
    imageWidth: 100,
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
    setSelectedImage: (image) =>
      set((state) => ({ ...state, selectedImage: image })),
    setImageSize: (imageWidth: number, imageHeight: number) =>
      set((state) => ({
        ...state,
        rendererConfig: { ...state.rendererConfig, imageWidth, imageHeight },
      })),
    setScale: (scale: number) =>
      set((state) => ({
        ...state,
        rendererConfig: { ...state.rendererConfig, scale },
      })),
    setSize: (width: number, height: number) =>
      set((state) => ({
        ...state,
        rendererConfig: { ...state.rendererConfig, width, height },
      })),
    setBoundingBox: (box: BoundingBox) =>
      set((state) => ({
        ...state,
        boundingBox: { ...state.boundingBox, ...box },
      })),
  }))
}
