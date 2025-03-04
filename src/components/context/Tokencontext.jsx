import React, { createContext, useState } from 'react'

export let Tokencontext = createContext()

export default function TokencontextProvider(props) {

    const [token , setToken] = useState(null)
  return (
    <>
 
<Tokencontext.Provider value={{token , setToken}}>
    {props.children}
</Tokencontext.Provider>
  
    </>
  )
}
