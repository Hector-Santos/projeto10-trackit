import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import {useState, useEffect} from "react"
import Cadastro from "./Cadastro"
import Habitos from "./Habitos"
import Hoje from "./Hoje"
import Historico from "./Historico.js"
import Login from "./Login"
import styled from 'styled-components'
import TokenContext from './contexts/TokenContext'

export default function Tela(){
   const [token, setToken] = useState("");
   const [percentage, setPercentage] = useState(0);
   const [url, setUrl] = useState("")
      
  
   return(
    <TokenContext.Provider value={{token, setToken, percentage, setPercentage, url, setUrl}}>
    <BrowserRouter>
    
    <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/cadastro" element={<Cadastro />}/>
     <Route path="/habitos" element={<Habitos />}/>
     <Route path="/hoje" element={<Hoje />}/>
     <Route path="/historico" element={<Historico />}/>
    </Routes>
    </BrowserRouter>
    </TokenContext.Provider>
     
     )
     
}