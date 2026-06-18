import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './adapters/presentation/context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
