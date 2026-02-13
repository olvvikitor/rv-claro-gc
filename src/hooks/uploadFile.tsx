import api from "../service/api"
import { useState } from "react"

export function useUploadFile(
) {
  const [loading, setLaoding] = useState(false)
  const [data, setData] = useState<any>()
  const [error, setError] = useState()
  const token = localStorage.getItem("tokenRVGC")
console.log(token)
  async function enviarFile(file:File){
    const formData = new FormData()
    formData.append('file', file)

  try{

    setLaoding(true)
    const response = await api.post('/upload/input-base', formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization: token
        },
        
    })
    setData(response.data)
    setLaoding(false)
  }

  catch(err :any){
    console.log(err)
    setError(err)
  }
  }

  return {data, loading, error, enviarFile};
  }

