"use client"

import { useUnanalyzedImagesList } from "@/hooks/data/useUnanalyzedImages"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import UnalayzedImages from "./components/unanalyzed-images"

export default function Page() {
  const { unalyzedImgsListData } = useUnanalyzedImagesList()

  console.log(unalyzedImgsListData)

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="h-full w-7xl">
        <Card className="h-[80vh] w-7xl">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="items-center justify-center">
            <UnalayzedImages images={unalyzedImgsListData} />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
