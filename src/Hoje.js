import { useContext, useState, useEffect } from 'react';
import TokenContext from './contexts/TokenContext';
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import { useNavigate } from 'react-router-dom';
import { Container, TopBar, BottomBar, Progressbar } from './Habitos';

function Habito({name, currentSequence, highestSequence, habitosHoje, concluidos, setConcluidos, id}){
    const {percentage, setPercentage, token} = useContext(TokenContext)
    const [colorButton, setColorButton] = useState("#EBEBEB")
    let body={ }
    let config = {
        headers: {
            "Authorization":`Bearer ${token}`
        }
       }

    function checkhabbit(){
        
        if(colorButton == "#EBEBEB"){
        setColorButton("#8FC549")
        let aux = concluidos
        aux++
        let aux1 = habitosHoje.length
       
        setPercentage((aux/aux1)*100)
        setConcluidos(aux)

      const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,body,config)
      promisse.then(() => console.log("sucesso"))
      promisse.catch((error) => console.log(error))
        }else{
        setColorButton("#EBEBEB")
        let aux = concluidos
        aux--
        let aux1 = habitosHoje.length
        
        setPercentage((aux/aux1)*100)
        setConcluidos(aux)
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,body,config)
       promisse.then(() => console.log("sucesso"))
       promisse.catch((error) => console.log(error))
        }

        
    }
    return( <StyledHabito highestSequence={highestSequence} currentSequence = {currentSequence} colorButton = {colorButton}>
                <h1>{name}</h1>
                <h2>Sequência atual: <strong>{currentSequence} dias</strong></h2>
                <h2>Seu recorde: <strong>{highestSequence} dias</strong></h2>
                <button onClick={()=> checkhabbit()}><ion-icon name="checkmark-outline"></ion-icon></button>
            </StyledHabito>
        )
}
export default function Hoje(){
  const [habitosHoje, setHabitosHoje] = useState([])
  const {token, percentage, setPercentage, url} = useContext(TokenContext)
  const [concluidos , setConcluidos] = useState(0)
  const navigate = useNavigate()
  let string = dayjs().locale("pt-br").format("dddd, DD/MM")
  string = string.charAt(0).toUpperCase() + string.slice(1);
  
  useEffect(()=> {pegaHabitos()}, [])
   function pegaHabitos(){
    const config = {
        headers: {
            "Authorization":`Bearer ${token}`
        }
       }
       const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config)
       promise.then(promise => setHabitosHoje(promise.data))
   }
   
    return (
        <>
        <TopBar>
            <h1>TrackIt</h1>
            <img src={url}/>
        </TopBar>
        
        <Container>
        <HeaderText concluidos = {concluidos}>
           <h1>{string}</h1>
           {concluidos < 1 ?<h2>Nenhum hábito concluído ainda</h2>:<h2>{percentage.toFixed()}% dos hábitos concluídos</h2>}
        </HeaderText>
            {habitosHoje?.map(habito => 
            <Habito name = {habito.name}
             currentSequence = {habito.currentSequence}
             highestSequence = {habito.highestSequence}
             id = {habito.id}
             concluidos = {concluidos}
             setConcluidos = {setConcluidos}
             habitosHoje = {habitosHoje}>
             
             </Habito>)}
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

const StyledHabito = styled.div`
background-color: white;
height: 94px;
width: 90vw;
border-radius: 5px;
margin-top: 10px;
position: relative;
padding-left: 5vw;
h1{
margin-top:10px;
margin-bottom: 10px;
color : black;
font-size: 20px;
}
h2{
margin-top:5px;
color: black;
font-size: 12px;
strong{
color:${props =>  props.currentSequence == props.highestSequence? "#8FC549" : "black"};   
}
}
button{
background-color: ${props => props.colorButton};
font-size: 60px;
font-weight: 600;
color: white ;
height: 70px;
width: 70px;
border-radius: 5px;
position: absolute;
top: 10px;
right: 15px;
border: none;
padding-top: 5px;
}

`
const HeaderText = styled.div`
margin-top: 20px;
background-color: none;
font-family: 'Lexend Deca', sans-serif; 
padding-right:${props => props.concluidos > 0 ? "140px" : "100px" };
box-sizing: border-box;
h1{
font-size: 20px;
}
h2{
font-size: 15px;
color: ${props => props.concluidos > 0 ? "#8FC549" : "black"}
}
`
