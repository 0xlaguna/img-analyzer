"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { UnanalyzedImage } from "@/types/v0/image"
import { GET } from "@/lib/api/api-client"

interface QueryParams {}

export const useUnanalyzedImagesList = (params: QueryParams = {}) => {
  const BASE = "5f2f729312b1481b9b1b4eb9d00bc455"
  const ENDPOINT = "unanalyzed-images"
  const url = `https://${BASE}.${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINT}`

  useEffect(() => {}, [])

  const { isError, isLoading, isSuccess, data, refetch } = useQuery({
    queryKey: ["unanalyzed-images-list", params],
    queryFn: () => GET<UnanalyzedImage[]>(url, params, {}),
  })

  return {
    unalyzedImgsListError: isError,
    unalyzedImgsListLoading: isLoading,
    unalyzedImgsListSuccess: isSuccess,
    unalyzedImgsListData: data,
    refetchUnanalyzedImgs: refetch,
  }
}
