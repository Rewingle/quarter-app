'use client'
import React from "react"
import Feed from '../(logged)/(feed)/page.js'
import Home from "./Home";
import { ThemeProvider } from 'theme-ui'
import Theme from '../../theme/theme';
import { useSession } from "next-auth/react";


function Page() {
  /*   const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 400);
  
    }, []);
   */

  const { data: session, status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  //LOAD FIRST TO WAIT SESSION THEN IF NOT SHOW HOME PAGE
  return (

    <ThemeProvider theme={Theme}>
      {

        session?.user ? <Feed />
          :
          <Home />

      }


    </ThemeProvider>


  )

}
export default Page

