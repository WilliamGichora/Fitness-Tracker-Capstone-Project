import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LogWorkout from './pages/LogWorkout'
import Layout from './components/Layout/Layout'
import Progress from './pages/Progress'
import ErrorNotFound from './pages/ErrorNotFound'
import WorkoutHistory from './pages/WorkoutHistory'
import Exercises from './pages/Exercises'

function App() {

  return (
    <Routes>   
      <Route path='/' element={<Layout />}>
        <Route path='*' element={<ErrorNotFound />} />
        <Route index element={<Home/>}/>
        <Route path='/LogWorkout' element={<LogWorkout />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/workouts' element={<WorkoutHistory />} />
        <Route path='/exercises' element={ <Exercises/>} />
      </Route>
    </Routes>

  )
}

export default App
