import reactDom from "react-dom";
import React from "react";
import Tela from "./Tela";
import "./styles/reset.css";


function App(){
    
    return ( 
        
        <Tela/>
        
    )
}

const app = App();
reactDom.render(app, document.querySelector(".root"));