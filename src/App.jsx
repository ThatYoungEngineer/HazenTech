import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TaskManagement from './components/TaskManagement'
import CreateTask from './components/CreateTask'
import AbsentResources from './components/AbsentResources'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Dashboard />}>
            <Route path='/absent-resources' element={<AbsentResources />} />
            <Route path='/task-management' element={<TaskManagement />} />
            <Route path='/create-task' element={<CreateTask/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App