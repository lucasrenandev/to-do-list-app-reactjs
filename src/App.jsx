import iconImg from "./assets/icon.png"
import { useEffect } from "react"
import './App.css'

export default function App() {
  const addTask = () => {
    const inputBox = document.getElementById("input-box")
    if(inputBox.value === "") {
      alert("You must write something!")
    }
    else {
      addElements()
    }
    inputBox.value = ""
    saveData()
  }
  
  const addElements = () => {
    const inputBox = document.getElementById("input-box")
    const listContainer = document.getElementById("list-container")
    let li = document.createElement("li")
    li.innerHTML = inputBox.value
    listContainer.appendChild(li)
    let span = document.createElement("span")
    span.innerHTML = "\u00d7"
    li.appendChild(span)
  }

  useEffect(function() {
    const listContainer = document.getElementById("list-container")
    listContainer.addEventListener("click", function(e) {
      if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData()
      }
      else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove()
        saveData()
      }
    }, false)
  }, [])

  const saveData = () => {
    const listContainer = document.getElementById("list-container")
    localStorage.setItem("data", listContainer.innerHTML)
  }

  useEffect(function() {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = localStorage.getItem("data")
  }, [])
 
  useEffect(function() {
    const inputBox = document.getElementById("input-box")
    inputBox.addEventListener("keypress", function(e) {
      if(e.key === "Enter") {
        if(this.value === "") {
          alert("You must write something!")
        }
        else {
          addTask()
        }
      }
    })
  }, [])

  return (
    <>
      <section className='container'> 
        <main className="todo-app">
          <h2>To-Do List <img src={iconImg} alt="Icon" /></h2>
          <form action="#" className="row">
            <input type="text" id="input-box" placeholder="Add your task" />
            <button type="button" id="button" onClick={addTask}>Add</button>
          </form>
          <ul className="list-container" id="list-container">
            {/* Elements created with JavaScript */}
          </ul>
        </main>
      </section>
    </>
  )
}