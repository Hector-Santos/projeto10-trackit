import { useContext, useState } from 'react';
import TokenContext from './contexts/TokenContext';
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 



 function Dia({name, index, selected, setSelected}){
    const [isSelected, setIsSelected] = useState(false)
    const selectedBackground = "#CFCFCF"
    const selectedText = "white"
    const text= "#DBDBDB"
    const background= "white"

    function select(){
       if(!isSelected ){
        setIsSelected(true)
        let aux = selected
        aux.push(index)
        setSelected(aux)
        console.log(selected)
       }else{
        setIsSelected(false)
        let aux = selected
        const i = aux.indexOf(index)
        aux.splice(i, 1)
        setSelected(aux)
        console.log(selected)   
       } 
         
    }

    return(
        <StyledDia selectedBackground ={selectedBackground}
        selectedText = {selectedText}
        text = {text}
        background = {background}
        isSelected = {isSelected}
        >
         <button onClick={()=>select()}>{name}</button>
         
         </StyledDia>
    )
}


export default function Habitos(){
    const {token, percentage, setPercentage, url} = useContext(TokenContext)
    const dias = ["D","S","T","Q","Q","S","S"]
    const [selected , setSelected] = useState([])
    const [criaHabito, setCriaHabito] = useState(false)

    console.log(token)
    setPercentage(60)
    function criahabito(){
    setCriaHabito(true)
    }
    function cancelar(){
    setCriaHabito(false)  
    }
    function salvar(){
     
        }

    return (
        <>
        <TopBar>
        <h1>TrackIt</h1>
        <img src={url}/>
        </TopBar>
        <Container>
        <ButtonText>
        <h1>Meus Habitos</h1>
        <button onClick={()=> criahabito()}>+</button>
        </ButtonText>
        <CriaHabito criaHabito= {criaHabito}>
        <input placeholder='nome do hábito'></input>
        <Dias>
            {dias.map((dia, index) => 
            <Dia index={index} 
            name={dia} 
            selected={selected} 
            setSelected={setSelected}></Dia>)}
        </Dias>
        <Cancelar onClick={()=>cancelar()}>Cancelar</Cancelar>
        <Salvar onClick={()=>salvar()}>Salvar</Salvar>
        </CriaHabito>
        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        <Progressbar>
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
        <h1>Hábitos</h1>
        <h1>Histórico</h1>
       </BottomBar>
       
       </>
        
    )
}

const Progressbar = styled.div`
height: 90px;
width: 90px;
position: fixed;
bottom : 10px;
left: center;
z-index: 1;
`

const Container = styled.div`
display: flex;
box-sizing: border-box;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
height: 100vh;
width: 100vw;
background-Color: #f2f2f2;
padding-top: 70px;
p{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    line-height: 20px;
    margin-top: 20px;
}

`
const BottomBar = styled.div`
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
const TopBar = styled.div`
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
const ButtonText = styled.div`
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
color : ${props => props.disabled? props.colorDisabled : props.colorEnabled };
border: 1px solid #D4D4D4;
font-size: 20px;
::placeholder{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #DBDBDB;
}
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
color: ${props => !props.isSelected? props.text : props.selectedText };
border: 1px solid #D4D4D4;
background-color:${props => !props.isSelected? props.background : props.selectedBackground };
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
font-size: 20px;
border: none;

`
const Salvar = styled.button`
background-color:#52B6FF;
color: white;
height: 35px;
width: 85px;
border-radius: 5px;
position: absolute;
right: 15px;
bottom: 15px;
font-family: 'Lexend Deca', sans-serif;
font-size: 20px;
border: none;

` 
    