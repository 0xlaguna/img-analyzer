"use client"

import { useAnalyzerStore } from "@/providers/analyzer-provider"

import { cn } from "@/lib/utils"
import { useImageCategoriesList } from "@/hooks/data/useImageCategories"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ImageOptions() {
  const { imageCategoryId, setImageCategory } = useAnalyzerStore(
    (state) => state
  )
  const { imageCategoriesListData } = useImageCategoriesList()

  return (
    <div className="flex w-[300px] flex-col p-4">
      <Input type="text" placeholder="Search..." className="mb-4 p-2" />
      <div className="max-h-[60vh] flex-1 overflow-y-scroll">
        <div className="space-y-2">
          {imageCategoriesListData?.map((i) => (
            <Card
              key={i.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                imageCategoryId === i.id
                  ? "ring-primary bg-primary/5 ring-2"
                  : "hover:bg-muted/50"
              )}
              onClick={() => setImageCategory(i.id)}
            >
              <CardContent>{i.name}</CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button>Discard</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  )
}
