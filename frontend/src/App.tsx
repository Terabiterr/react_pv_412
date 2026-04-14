import './App.css'
import { AuthProvider } from '../src/context/AuthContext'
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

//Додати component "ProfilePage.tsx"
//Реалізувати карточку користувача, якщо він авторизований
