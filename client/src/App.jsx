import { Route, Routes } from 'react-router-dom'

import TasksPage from './pages/TasksPage'
import TasksForm from './pages/TaskForm'
import NotFound from './pages/NotFound'
import { TaskContextProvider } from './context/TaskProvider'

import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='bg-zinc-900 h-screen'>
      <TaskContextProvider>
        <NavBar />

        <Routes>
          <Route path='/' element={<TasksPage />} />
          <Route path='/new' element={<TasksForm />} />
          <Route path='/edit/:id' element={<TasksForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </div>
  )
}

export default App
