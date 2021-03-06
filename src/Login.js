import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import TokenContext from './contexts/TokenContext';
import { ThreeDots } from 'react-loader-spinner';




export default function Login(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [disabled, setDisabled] = useState(false)
    const {token, setToken, setUrl} = useContext(TokenContext)
    const [botao, setBotao] = useState("Login")
    const [colorButton, setColorButton] = useState("#52B6FF");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();
   
    function fazerLogin(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#86CBFD")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        
        let body = {
            email:email,
            password:senha
        }
        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        promise.then((response => {
            setToken(response.data.token)
            setUrl(response.data.image)
            navigate("/habitos")
            
          }))

          promise.catch((response => {
          alert(`Falha no login.Verifique seu usario e senha
${response}`)
          setColorButton("#52B6FF")
          setColorInput("black")
          setDisabled(false)
          setBotao("Login")
          }
          ))
          

    }
    
    
    return (
        
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
        <img src="/images/logo.png"></img>
        <h1>TrackIt</h1>
        <Form >
        <form onSubmit={fazerLogin}>
            <input  disabled ={disabled} placeholder = "email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled ={disabled} placeholder = "senha" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        </Form>
        <Link to = "/cadastro">
        <h2>N??o tem uma conta? Cadastre-se! </h2>
        </Link>
        </Container>
        
    )
}

export const Container = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
height: 100vh;
width: 100vw;
padding-bottom: 100px;
img{
    height: auto;
    width: 200px;
}
input{
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
width: 305px;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
::placeholder{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #DBDBDB;
}
}
button{
display: flex;
align-items: center;
justify-content: center;
height: 45px;
width: 310px;
border-radius: 5px;
color: white;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
}

h1{
    font-family: 'Playball', cursive;
    font-size: 70px;
    color: #126BA5;
    margin-bottom: 30px;
}
h2{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    color: #52B6FF;
    margin-top: 30px;
    text-decoration: underline;
}
` 
export const Form = styled.div`
margin-left: 10vw;
`