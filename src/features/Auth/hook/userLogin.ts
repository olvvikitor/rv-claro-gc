import { LoginDto } from "../services/authServices";
import { useState } from "react";
import api from "../../../service/api";

export function useLogin(
) {
  const [loading, setLaoding] = useState(false)
  const [data, setData] = useState<any>()
  const [error, setError] = useState()

  async function logar(payload:LoginDto){

  try{
    setLaoding(true)
    const response = await api.post('/auth/login', payload)
    setData(response.data)
  }

  catch(err :any){
    setError(err)
  }
  }

  return {data, loading, error, logar};
  }

