import '../styles/globals.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer draggable={false} limit={1} autoClose={1500} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
