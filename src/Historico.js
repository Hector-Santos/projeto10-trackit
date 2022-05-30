import { useContext } from 'react';
import TokenContext from './contexts/TokenContext';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 
import { useNavigate } from 'react-router-dom';
import { Container, TopBar, BottomBar, Progressbar, ButtonText } from './Habitos';

export default function Historico(){
    const {percentage, url} = useContext(TokenContext)
    let nohabits = true
    const navigate = useNavigate()
    return (
        <>
        <TopBar>
            <h1>TrackIt</h1>
            <img src={url}/>
        </TopBar>
        <Container nohabits = {nohabits}>
        <ButtonText  >
                <h1>Historico</h1>
            </ButtonText>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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