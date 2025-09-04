import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const url = "http://localhost:3001"

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])



  useEffect(() => {
    axios.get(url)
    .then(response => {
      setTasks(response.data)
    })
    .catch(error => {
      alert(error.response.data ? error.response.data.message : error)
    }) 
  },[])


  const addTask = () => {
    const newTask = { description: task }

    axios.post(url + "/create", {task: newTask})
     .then(response => {
      setTasks([...tasks,response.data])
      setTask('')
    })
    .catch(error => {
      alert(error.response ? error.response.data.error.message : error)
    })
  }


  const deleteTask = (deleted) => {
    axios.delete(url + "/delete/" + deleted)
    .then(response => {
      setTasks(tasks.filter(item => item.id !== deleted))
    })
    .catch(error => {
      alert(error.response ? error.response.data.error.message : error)
    })
  }


  return (
    <div id="container">
      <h3>ToDos</h3>
      <form>
        <input 
          placeholder='Add new task'
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}     
        />
      </form>
      <ul>
        {
          tasks.map(item => (
            <li key={item.id}>
              {item.description}
              <button className='delete-button' onClick={() => 
                deleteTask(item.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
