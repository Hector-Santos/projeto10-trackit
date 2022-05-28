import { Container, Form } from './Login';
import {Link} from 'react-router-dom'
import { useState } from "react";
import React from 'react'
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';


export default function Cadastro(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [url, setUrl] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [botao, setBotao] = useState("Cadastrar")
    const [colorButton, setColorButton] = useState("#52B6FF");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();

    function fazerCadastro(event) {
        setDisabled(true)
        setColorButton("#86CBFD")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        event.preventDefault()
        let body = 
            {
                email: email,
                name: nome,
                image: url,
                password: senha
            }

        let promise = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        ,body)
        promise.then((response => {    
            console.log(response)
            navigate("/")
          }))
        
          promise.catch((response => {
            alert(`Algo de errado não está certo
  ${response}`)
            setColorButton("#52B6FF")
            setColorInput("black")
            setDisabled(false)
            setBotao("Login")
            }
            ))
          
        
        }
    return (
        <Container disabled={disabled} colorButton={colorButton} colorInput = {colorInput}>
        <img src="/images/logo.png"></img>
        <h1>TrackIt</h1>
        <Form>
        <form onSubmit={fazerCadastro}>
            <input disabled={disabled} placeholder = "email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled={disabled} placeholder = "senha" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <input disabled={disabled} placeholder = "nome" type="text"value={nome} onChange={e => setNome(e.target.value)}/>
            <input disabled={disabled} placeholder = "foto" type="url" value={url} onChange={e => setUrl(e.target.value)}/>
            <button type="submit">{botao}</button>
        </form>
        </Form>
        <Link to = "/">
        <h2>Já tem uma conta? Faça login!</h2>
        </Link>
        </Container>
    )
}