import axios, {AxiosResponse, CancelTokenSource} from 'axios'
import {useCallback, useState} from 'react'

export const useUpload = (params: {
  fileFieldName?: string
  onError?: (error) => void
  onFinish?: () => void
  onSuccess?: (params: {response: AxiosResponse<{location: string}>}) => void
  onStart?: (params: {source: CancelTokenSource}) => void
  setUploadProgress?: (progress: number) => void
  urlOrPath: string
}): {
  isUploading: boolean
  isUploadError: boolean
  upload: (file: Blob) => Promise<AxiosResponse | undefined>
} => {
  const [isUploading, setStateIsUploading] = useState<boolean>(false)
  const [isUploadError, setIsUploadError] = useState<any>(false)

  const upload = useCallback(async (file: Blob) => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const config = {
      cancelToken: source.token,

      onUploadProgress: progressEvent => {
        if(typeof params.setUploadProgress === 'function') {
          params.setUploadProgress(Math.round(progressEvent.loaded * 100 / progressEvent.total))
        }
      },
    }

    const data = new FormData()
    data.append(params.fileFieldName || 'file', file)

    if(typeof params.onStart === 'function') {
      params.onStart({source})
    }

    try {
      setIsUploadError(null)
      setStateIsUploading(true)
      const response = await axios.put(params.urlOrPath, data, config)

      if(typeof params.onSuccess === 'function') {
        params.onSuccess({response})
      }

      return response
    } catch(error) {
      setIsUploadError(error)

      if(typeof params.onError === 'function') {
        params.onError(error)
      }
    } finally {
      setStateIsUploading(false)

      if(typeof params.onFinish === 'function') {
        params.onFinish()
      }
    }
  }, [params])

  return {isUploadError, isUploading, upload}
}
