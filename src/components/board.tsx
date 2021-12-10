import { useEffect, useState } from "react";
import Square from "./square";
import axios from "axios"; 

const baseUrl = window.location.href.replace("3000", "8080")

export default function Board() {
  let [fields, setFields] = useState<string[]>(Array<string>(9).fill(" "));
  let [message, setMessage] = useState("")
  let [acceptInput, setAcceptInput] = useState(true)

  useEffect(() => {
    async function effect(){
      setInterval(async() => {
        await GetFieldsAndApply()
      }, 100)
    }

    effect()
  }, [])

  function SetFieldsBasedOnData(data : any[]) {
    data = data.map((entry) => {
      return entry == -1 ? " " : entry == 0 ? "X" : "O"
    })
    
    setFields(data)
  }

  async function GetFieldsAndApply(){
    let board = await GetFields()
    SetFieldsBasedOnData(board)
  }

  async function CreateGame(){
    setAcceptInput(true)

    let result = await axios.post(`${baseUrl}CreateGame`).catch((err) => alert(`${baseUrl}CreateGame: ${err}`))
    console.log(result)
    await GetFieldsAndApply();
  }

  async function GetFields(){
    let result = await axios.get(`${baseUrl}GetField`)
    console.log(result.data)
    return result.data;
  }

  async function OnClickSquare(id : Number){
    if(!acceptInput) return;

    let result = await axios.post(`${baseUrl}MakeTurn?playerId=0&selectedField=${id}`) 
    let gameState = result.data;
    
    await GetFieldsAndApply();

    // 0 = InProgress, 1 = Draw, 2 = PlayerXWon, 3 = PlayerOWon
    if(gameState != 0){
      setMessage(gameState == 1 ? "Draw" : gameState == 2 ? "Player X Won!" : "Player O Won!")
      setAcceptInput(false)

      setTimeout(async() => {
        await CreateGame();
        setMessage("")
      }, 1500)
    }
  }

  return (
    <div>
      <div className="board-row">
        <Square value={fields[0]} onClick={() => {OnClickSquare(0)}} />
        <Square value={fields[1]} onClick={() => {OnClickSquare(1)}} />
        <Square value={fields[2]} onClick={() => {OnClickSquare(2)}} />
      </div>
      <div className="board-row">
        <Square value={fields[3]} onClick={() => {OnClickSquare(3)}} />
        <Square value={fields[4]} onClick={() => {OnClickSquare(4)}} />
        <Square value={fields[5]} onClick={() => {OnClickSquare(5)}} />
      </div>
      <div className="board-row">
        <Square value={fields[6]} onClick={() => {OnClickSquare(6)}} />
        <Square value={fields[7]} onClick={() => {OnClickSquare(7)}} />
        <Square value={fields[8]} onClick={() => {OnClickSquare(8)}} />
      </div>
      <button onClick={()=>CreateGame()}>Create new Game</button>
      <h2>{message}</h2>
    </div>
  );
}
