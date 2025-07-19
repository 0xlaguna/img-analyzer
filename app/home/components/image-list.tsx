"use client"

import Image from "next/image"
import { useAnalyzerStore } from "@/providers/analyzer-provider"

import { UnanalyzedImage } from "@/types/v0/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ImageListProps {
  images: UnanalyzedImage[] | undefined
}
export default function ImageList(props: ImageListProps) {
  const { selectedImageId, setSelectedImage } = useAnalyzerStore(
    (state) => state
  )

  return (
    <div className="p-4">
      <h2 className="mb-2">Next images in queue:</h2>
      <div className="flex space-x-2 overflow-x-auto">
        {props.images?.map((img, i) => (
          <div key={i} className="flex items-center justify-center">
            <Card
              className={cn(
                "flex min-h-[100px] cursor-pointer flex-col justify-center transition-all duration-200 hover:shadow-md",
                selectedImageId === img.id
                  ? "ring-primary bg-primary/5 ring-2"
                  : "hover:bg-muted/50"
              )}
              onClick={() => setSelectedImage(img.id)}
            >
              <CardContent>
                <Image src={img.url} width={100} height={100} alt="thumbnail" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
