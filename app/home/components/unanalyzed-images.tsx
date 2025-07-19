"use client"

import { UnanalyzedImage } from "@/types/v0/image"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface UnanalyzedImageProps {
  images: UnanalyzedImage[] | undefined
}
export default function UnalayzedImages(props: UnanalyzedImageProps) {
  console.log(props)
  return (
    <Card>
      <CardContent>
        {props.images?.map((i) => (
          <div key={i.id}>{i.id}</div>
        ))}
      </CardContent>
    </Card>
  )
}
