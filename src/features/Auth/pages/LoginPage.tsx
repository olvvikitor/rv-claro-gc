import React, { useState } from "react";
import { useLogin } from "../hook/userLogin";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate()
    const{loading, data , error, logar} = useLogin()

    const [site, setSite] = useState("")
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")

    const sites =[{
       label:"Comercio", value:"COMERCIO" }]

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        // logar({site, login, senha})
        // localStorage.setItem("tokenRVGC", data.token)
        // localStorage.setItem("user", JSON.stringify(data.user))
        navigate('/')
    }

  return (
    <div className="bg-red-400" >
      <div>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>

          <div>
            <select
              value={site} 
              onChange={(e)=>setSite(e.target.value)}>

                <option value="">Selecione o site</option>
                {
                  sites.map((item) =>(
                    <option key={item.value} value={item.value}>
                    {item.label}
                    </option>
                  ))
                }
              </select>
          </div>

          <br />

          <div>
            <input 
              type="text" 
              placeholder="Email" 
              value={login}
              onChange={(e)=>setLogin(e.target.value)}
            />
          </div>
          <br />

          <div>
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e)=>setSenha(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" >
            {
                loading ? "Entrando..." : "Entrar"
            }
          </button>
          {error && (
            <p style={{color:"red"}}>
                {(error as Error).stack}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
