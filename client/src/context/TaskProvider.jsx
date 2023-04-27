import { createContext, useContext, useState } from 'react'
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from '../api/tasks.api'
import { TaskContext } from './TaskContext'

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider')
  }
  return context
}

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  async function loadTasks() {
    const response = await getTasksRequest()
    setTasks(response.data)
    // setTasks([...tasks, response.data])
  }

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id)
      setTasks(tasks.filter((task) => task.id !== id))
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields)
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id)
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false)
      tasks.map((task) =>
        task.id === id ? (task.done = task.done === 0 ? 1 : 0) : task.done
      )
      setTasks([...tasks])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        getTask,
        createTask,
        deleteTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
