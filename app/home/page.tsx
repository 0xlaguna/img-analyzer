"use client"

import dynamic from "next/dynamic"
import { AnalyzerStoreProvider } from "@/providers/analyzer-provider"
import { defaultState, type AnalyzerState } from "@/stores/analyzer-store"

import { useUnanalyzedImagesList } from "@/hooks/data/useUnanalyzedImages"

import ImageList from "./components/image-list"
import ImageOptions from "./components/image-options"

const Renderer = dynamic(() => import("./components/renderer"), {
  ssr: false,
})

export default function Page() {
  const { unalyzedImgsListData } = useUnanalyzedImagesList()

  const state: AnalyzerState = { ...defaultState, images: unalyzedImgsListData }

  return (
    <AnalyzerStoreProvider state={state}>
      <div className="flex min-h-[90vh] flex-col p-4">
        <div className="flex flex-1">
          <div className="border-4 border-solid">
            <Renderer />
          </div>
          <div className="flex-1">
            <ImageOptions />
          </div>
        </div>
        <ImageList images={unalyzedImgsListData} />
      </div>
    </AnalyzerStoreProvider>
  )
}
