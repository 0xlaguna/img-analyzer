"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { ImageCategory } from "@/types/v0/image"
import { GET } from "@/lib/api/api-client"

interface QueryParams {}

export const useImageCategoriesList = (params: QueryParams) => {
  const BASE = "f6fe9241e02b404689f62c585d0bd967"
  const ENDPOINT = "categories"
  const url = `https://${BASE}/${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINT}`

  useEffect(() => {}, [])

  const { isError, isLoading, isSuccess, data, refetch } = useQuery({
    queryKey: ["image-categories-list", params],
    queryFn: () => GET<ImageCategory[]>(url, params, {}),
  })

  return {
    imageCategoriesListError: isError,
    imageCategoriesListLoading: isLoading,
    imageCategoriesListSuccess: isSuccess,
    imageCategoriesListData: data,
    refetchImageCategories: refetch,
  }
}
