import React, { useState } from "react";
import { useLogin } from "../hook/userLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate()
    const{mutate, isPending , error} = useLogin()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        mutate(
        {email, password},{
            onSuccess:(user:any)=>{
                console.log("Logado: ", user)
                localStorage.setItem(user, JSON.stringify(user))
                navigate('/dashboard')
            }

        });
    }

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <br />

          <div>
            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" >
            {
                isPending ? "Entrando..." : "Entrar"
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
