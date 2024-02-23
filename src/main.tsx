import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="light">
      <App />
    </NextThemesProvider>
  </NextUIProvider>
)
