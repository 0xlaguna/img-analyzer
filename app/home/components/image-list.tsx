"use client"

import Image from "next/image"

import { UnanalyzedImage } from "@/types/v0/image"
import { Card, CardContent } from "@/components/ui/card"

interface ImageListProps {
  images: UnanalyzedImage[] | undefined
}
export default function ImageList(props: ImageListProps) {
  return (
    <div className="p-4">
      <h2 className="mb-2">Next images in queue:</h2>
      <div className="flex space-x-2 overflow-x-auto">
        {props.images?.map((img, i) => (
          <div key={i} className="flex items-center justify-center">
            <Card className="flex min-h-[100px] flex-col justify-center">
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
