import React from "react";

export default function Cell(props) {
    let style={
         backgroundColor: props.visited === 0 ? "white" : props.visited === 1 ? "blue" : "black",
          
          
    }
    if(props.row===props.curx&&props.col===props.cury){
        style={...style,backgroundColor:"green"};
    }
    return (
        <div onClick={() =>props.handleCellClick(props.row,props.col)} style={style} className="cell">
            <p >{props.cnt}</p>
        </div>
    )
}