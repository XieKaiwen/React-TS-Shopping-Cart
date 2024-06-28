import { useState, useEffect } from "react";

export function useLocalStorage<T>(key:string, initialValue: T|(()=>T)){
    const [value, setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null){
            return JSON.parse(jsonValue)
        }
        if(typeof initialValue === "function"){
            return (initialValue as () => T)() //only if the initialValue passed in is a function
        } else return initialValue
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value), )
    }, [key, value])
    return [value, setValue] as [typeof value, typeof setValue]
}