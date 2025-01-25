import React, { useState, useEffect } from "react";
import Cell from './cell.jsx';
import './App.css';
export default function DelayedDFS() {
  const gridSize = 20; // 20x20 grid
  const [vis, setVis] = useState(Array(gridSize).fill(0).map(() => Array(gridSize).fill(0)));
  const [stack, setStack] = useState([]); // Stack for DFS
  const [running, setRunning] = useState(false); // Control DFS execution
  const [par,setPar]=React.useState(Array(gridSize).fill(0).map(() => Array(gridSize).fill(0)));
  const [count,setCount]=React.useState(0);
  

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  // Helper function to check if a cell is within bounds and not visited
  const include = (i, j) => i >= 0 && i < gridSize && j >= 0 && j < gridSize;
  const [curx,setCurx]=React.useState(0);
  const [cury,setCury]=React.useState(0);

  // Start DFS from a specific cell
  const startDFS = (startI, startJ) => {
    setPar((prev) =>
      prev.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === 0 && colIndex === 0 ? [0,0] : cell
        )
      )
    )
    setVis((prev) =>
      prev.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === startI && colIndex === startJ ? 1 : cell
  )
      )
    );
    setStack([[startI, startJ]]); // Initialize the stack
    setRunning(true); // Start DFS
  };
  
  useEffect(() => {
    if (!running || stack.length === 0) return;
    
    const timer = setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const [i, j] = newStack.pop(); // Get the current cell
        // Visit the neighbors one at a time
        for (const [dx, dy] of directions) {
          const newI = i + dx;
          const newJ = j + dy;
          
          
          if (include(newI, newJ) && vis[newI][newJ] === 0) {
            
            setCurx(newI);setCury(newJ);  
            setPar((prev) =>
              prev.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                  rowIndex === newI && colIndex === newJ ? [i,j] : cell
                )
              )
            )
            setVis((prev) =>
              prev.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                  rowIndex === newI && colIndex === newJ ? 1 : cell
                )
              )
            )
            newStack.push([newI, newJ]); // Add only one neighbor to the stack
            break; // Ensure only one move per step
          }
          else if(dx===-1){
            setCurx(par[i][i][0]);setCury(par[i][j][1]);  
            
            if(!(i==0&&j==0))newStack.push(par[i][j]);
          }
        }

        return newStack;
      });

      if (stack.length === 0) {
        setRunning(false); // Stop DFS when the stack is empty
      }
      setCount(count=> count+1)
    },10); // 100ms delay

    return () => clearTimeout(timer); // Cleanup the timeout
  }, [stack, running, vis]);

  function handleCellClick(row,col){
      if(running)return;
      setVis( prevState => 
        prevState.map((rowArr, rowIndex) => 
          rowArr.map((cell, colIndex) => {
            if (rowIndex === row && colIndex === col) {
              return cell === 2 ? 0 : 2;
            }
            return cell;
          })
        ))
  }
  
  const space = vis.flat().reduce((sum, value) => sum + (value === 1 ? 1 : 0), 0);
  console.log(count);
  return (
    <div className="container">
      <h1>DFS with Delay (One Step at a Time)</h1>
      <div>
        <button onClick={() => startDFS(0, 0)} disabled={running}>
          Start DFS
        </button>
        <main>
          {vis.map((rowArr, rowIndex) => 
            rowArr.map((cell, colIndex)=> (
              <Cell 
              handleCellClick={handleCellClick}
              key={[rowIndex,colIndex]}
              row={rowIndex}
              col={colIndex}
              visited={cell}
              curx={curx}
              cury={cury}
              
              />
            )))}
        </main>
        <h4>Space :{space}</h4>
      </div>
    </div>
  );
}
