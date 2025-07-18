"use client"

import { UnanalyzedImage } from "@/types/v0/image"

interface UnanalyzedImageProps {
  images: UnanalyzedImage[] | undefined
}
export default function UnalayzedImages(props: UnanalyzedImageProps) {
  console.log(props)
  return (
    <div>
      <p>Hey</p>
    </div>
  )
}
