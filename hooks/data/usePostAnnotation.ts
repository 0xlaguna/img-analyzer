"use client"

import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

import { POST } from "@/lib/api/api-client"

interface QueryParams {}

export interface AnnotationCreate {
  imageId: number
  annotations: any
}

export const usePostAnnnotation = () => {
  const BASE = "eb1b6f8bfab448df91c68bd442d6a968"
  const ENDPOINT = "annotations"
  const url = `https://${BASE}.${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINT}`

  useEffect(() => {}, [])

  const { isError, isSuccess, mutate, isPending, data } = useMutation<
    any,
    Error,
    AnnotationCreate
  >({
    mutationFn: (annotationData) => POST(url, annotationData, {}),
  })

  return {
    createAnnotationError: isError,
    createAnnotationSuccess: isSuccess,
    createAnnotation: mutate,
    createAnnotationPending: isPending,
    createAnnotationData: data,
  }
}
