import { useContext, useState, useEffect } from 'react';
import TokenContext from './contexts/TokenContext';
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import react from 'react';
import { useNavigate } from 'react-router-dom';


function Habito ({days, name, id, setHabitos, setNohabits}){
const {token} = useContext(TokenContext)
  const [dias, setDias] = useState([
        {nome: "D", selected: false},
        {nome: "S", selected: false},
        {nome: "T", selected: false},
        {nome: "Q", selected: false},
        {nome: "Q", selected: false},
        {nome: "S", selected: false},
        {nome: "S", selected: false}
    ])
    const config = {
        headers: {
            "Authorization":`Bearer ${token}`
        }
       }
       function listaHabitos(){
        let aux = []
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise.then(promise => {
        aux = promise.data
        setHabitos(aux)
        if(aux.length >0){
            setNohabits(false)   
           } else{
            setNohabits(true) 
           } 
        })
    }
  const [selected , setSelected] = useState(days)
  function deletaHabito(id){
     const promise =  axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
     promise.then(listaHabitos)
  }





    return(
        <StyledHabito>
        <ion-icon onClick={()=>deletaHabito(id)} name="trash-outline"></ion-icon>
        <h1>{name}</h1>
                 <Dias>
                    {dias.map((dia, index) => 
                    <Dia dias= {dias}
                    setDias = {setDias}
                    index={index} 
                    name={dia.nome} 
                    selected={selected}
                    setSelected={setSelected}></Dia>)}
                </Dias>
        </StyledHabito>
    )
}



 function Dia({name, index, selected, setSelected, dias, setDias, disabled, newHabbit = false}){
    
    const [background, setBackground] = useState("white")
    const [text, setText]= useState("#DBDBDB")
    react.useEffect(() => {
        if(!newHabbit){
            select2()
        }else{
        setDias([
            {nome: "D", selected: false},
            {nome: "S", selected: false},
            {nome: "T", selected: false},
            {nome: "Q", selected: false},
            {nome: "Q", selected: false},
            {nome: "S", selected: false},
            {nome: "S", selected: false}
        ])
        }
    },[])
   
    function select2(){
        let aux = ''    
        for(let i = 0; i<7 ;i++){
           for(let j = 0; j < selected.length ;j++){
               if(selected[j] == i ){
               aux= dias[i]
               aux.selected = true
               
               setDias([
                ...dias.slice(0, i),
                aux, 
                ...dias.slice(i+1, dias.length)
     
            ])
                  
             }
           }
            
        }
        
            if(dias[index].selected){
            setBackground("#cfcfcf")
            setText("white") 
            }
        }
    

    
    function select(){
       if(!dias[index].selected){
        let aux1 = dias[index]
        aux1.selected = true
        setDias([
            ...dias.slice(0, index),
            aux1, 
            ...dias.slice(index+1, dias.length)

        ])
        let aux = selected
        aux.push(index)
        setSelected(aux)
        setBackground("#cfcfcf")
        setText("white")

       }else{
        let aux1 = dias[index]
        aux1.selected = false
        setDias([
            ...dias.slice(0, index),
            aux1, 
            ...dias.slice(index+1, dias.length)
        ])
        let aux = selected
        const i = aux.indexOf(index)
        aux.splice(i, 1)
        setSelected(aux) 
        setBackground("white")
        setText("#DBDBDB")
        
       } 
         
    }
    
    return(
        <StyledDia  background = {background} text = {text}
        isSelected = {dias[index].selected}
        >
         <button onClick={()=>!disabled?select():null}>{name}</button>
         
         </StyledDia>
    )
}


export default function Habitos(){
    const {token, percentage, setPercentage, url} = useContext(TokenContext)
    const [dias, setDias] = useState([
        {nome: "D", selected: false},
        {nome: "S", selected: false},
        {nome: "T", selected: false},
        {nome: "Q", selected: false},
        {nome: "Q", selected: false},
        {nome: "S", selected: false},
        {nome: "S", selected: false}
    ])
    const [back, setBack]= useState(false)
    const [selected , setSelected] = useState([])
    const [criaHabito, setCriaHabito] = useState(false)
    const [nomeHabito, setNomeHabito] = useState("")
    const [colorButton, setColorButton] = useState("#52B6FF");
    const [disabled, setDisabled] = useState(false)
    const [colorInput, setColorInput] = useState("black");
    const [botao, setBotao] = useState("salvar")
    const [habitos, setHabitos ] = useState([])
    const [nohabits, setNohabits] = useState(true)
    const [mostraHabito, setMostraHabito] = useState(true)
    const navigate = useNavigate()
    const config = {
        headers: {
            "Authorization":`Bearer ${token}`
        }
       }
       react.useEffect(() => {
           listaHabitos() 
    },[])

       
    function listaHabitos(){
        let aux = []
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise.then(promise => {aux = promise.data
        if(aux.length >0){
          setNohabits(false)   
         }else{
            setNohabits(true)
        } 
        setHabitos(aux)
        setCriaHabito(false)
        setDisabled(false)
        setSelected([])
        setNomeHabito("")
        setColorButton("#52B6FF")
        setColorInput("black")
        setBotao("salvar")
        setMostraHabito(false)
        })
        promise.catch((error)=> console.log(error.message))
        
    }
    function save(){
        
        setColorButton("#86CBFD")
        setColorInput("#AFAFAF")
        setDisabled(true)
        setBotao(<ThreeDots color="white" height={35} width={85} />)
        let body={
            name: nomeHabito,
            days: selected
        }
        setSelected([])
        setBack(true)
       
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        promise.then(()=>listaHabitos())
        promise.catch(()=> console.log("falha"))
    }
    function criahabito(){
    setMostraHabito(true)
    setCriaHabito(true)
    
    }
    function cancelar(){
    setCriaHabito(false)  
    }
    
    return (
        <>
        <TopBar>
            <h1>TrackIt</h1>
            <img src={url}/>
        </TopBar>
        <Container nohabits= {nohabits}>
            <ButtonText>
                <h1>Meus Habitos</h1>
                <button onClick={()=> criahabito()}>+</button>
            </ButtonText>
            {mostraHabito && <CriaHabito colorInput= {colorInput} criaHabito= {criaHabito}>
                <input disabled={disabled} value={nomeHabito} onChange={(e) => setNomeHabito(e.target.value)} placeholder='nome do hábito'></input>
                <Dias>
                    {dias.map((dia, index) => 
                    <Dia  dias= {dias}
                    setDias = {setDias}
                    index={index} 
                    name={dia.nome} 
                    selected={selected} 
                    setSelected={setSelected}
                    newHabbit= {true}
                    disabled = {disabled}
                    back={back}></Dia>)}
                </Dias>
                <Cancelar onClick={()=>cancelar()}>Cancelar</Cancelar>
                <Salvar disabled={disabled} colorButton = {colorButton}  
                 onClick={()=>save()}>{botao}</Salvar>
            </CriaHabito>}
             {habitos?.map((habito) =>  
                 < Habito  setHabitos={setHabitos} setNohabits={setNohabits}  days={habito.days} name= {habito.name} id={habito.id}>
                 </Habito> )}
             
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            <Progressbar onClick={()=>navigate("/hoje")}>
                <CircularProgressbar
                    value={percentage}
                    text={"Hoje"}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                    })}/>
            </Progressbar>
        </Container>
        <BottomBar>
        <h1 onClick={()=>navigate("/habitos")}>Hábitos</h1>
        <h1 onClick={()=>navigate("/historico")}>Histórico</h1>
       </BottomBar>
       
       </>
        
    )
}

export const Progressbar = styled.div`
height: 90px;
width: 90px;
position: fixed;
bottom : 10px;
left: center;
z-index: 1;
`

export const Container = styled.div`
display: flex;
box-sizing: border-box;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
height: auto;
width: 100vw;
min-height: 100vh;
background-Color: #f2f2f2;
padding-top: 70px;
padding-bottom: 70px;
p{
    display: ${props => props.nohabits? "block" : "none"};
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    line-height: 20px;
}

`
export const BottomBar = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-Color: white;
position: fixed;
bottom: 0px;
left:0px;
font-size: 20px;
height: 70px;
width: 100%;
h1{
    color: #52B6FF;
    font-family: 'Lexend Deca', sans-serif;
    
}
padding-left: 5vw;
padding-right: 5vw;
`
export const TopBar = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-Color: #126BA5;
position: fixed;
top: 0px;
left:0px;
font-size: 20px;
height: 70px;
width: 100%;
h1{
    color: white;
    font-family: 'Playball', cursive;
    font-size: 30px;
}
img{
    width: 51px;
    height: 51px;
    border-radius: 100px;
}
padding-left: 5vw;
padding-right: 5vw;
`
export const ButtonText = styled.div`
width: 100%;
height: 80px;
box-sizing:border-box;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-left: 20px;
padding-right: 20px;
button{
display: flex;
align-items: center;
justify-content: center;
font-size: 30px;
font-family: 'Lexend Deca', sans-serif;
height: 40px;
width: 40px;
border-radius: 5px;
background-color: #52B6FF;
border: none;
color: white;
text-align: center;
padding-bottom: 5px;
}
h1{
color: #126BA5;
font-size: 20px;
font-family: 'Lexend Deca', sans-serif;
}
`
const CriaHabito = styled.div`
display: ${props => !props.criaHabito? "none" : "flex"};
height: 180px;
flex-direction: column;
align-items: center;
background-color: white;
width: 90vw;
border-radius: 5px;
position: relative;
input{
margin-top:20px;
height: 45px;
width: 303px;
border-radius: 5px;
margin-bottom: 10px;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
::placeholder{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #DBDBDB;
}
}
`
const StyledHabito = styled.div`
position: relative;
padding-left: 10px;
margin-top: 10px;
display:"flex";
height: 91px;
border-radius: 5px;
flex-direction: column;
align-items: center;
background-color: white;
width: 90vw;
border-radius: 5px;
position: relative;
h1{
margin-top:10px;
height: 30px;
margin-bottom: 10px;
color : ${props => props.colorInput };
font-size: 20px;
}
ion-icon{
    position: absolute;
    right: 10px;
    top: 10px;
}
`
const Dias = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
width: 85vw;


`
const StyledDia = styled.div`
button{
width: 30px;
height: 30px;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
color: ${props => props.text };
border: 1px solid #D4D4D4;
background-color:${props => props.background };
border-radius:5px;
margin-left: 5px;
}
`
const Cancelar = styled.button`
background-color: white;
color: #52B6FF;
height: 35px;
width: 85px;
border-radius: 5px;
position: absolute;
right: 115px;
bottom: 15px;
font-family: 'Lexend Deca', sans-serif;
font-size: 18px;
border: none;
`
const Salvar = styled.button`
background-color:${props => props.colorButton};
color: white;
height: 35px;
width: 85px;
border-radius: 5px;
position: absolute;
right: 15px;
bottom: 15px;
font-family: 'Lexend Deca', sans-serif;
font-size: 18px;
border: none;

` 
    