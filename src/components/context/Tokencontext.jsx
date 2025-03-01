import React, { createContext, useState } from 'react'

export let Tokencontext = createContext()

export default function TokencontextProvider(props) {

    const [Token , setToken] = useState(null)
  return (
    <>
 
<Tokencontext.Provider value={{Token , setToken}}>
    {props.children}
</Tokencontext.Provider>
  
    </>
  )
}
