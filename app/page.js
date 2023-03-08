'use client'
import React from "react"
import Feed from './Feed'
import Home from "./Home";
//import { ThemeProvider } from 'theme-ui'
import Theme from '../theme/theme';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Page() {
  /*   const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 400);
  
    }, []);
   */

  const { data: session } = useSession();

  //const feedData = await getFeed();
  if (session) {
    redirect('/feed')
  }
  else {
    return (
      
        <Home />
      
    )
  }


}


