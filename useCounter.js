import {useState} from 'react'
// este es un custom hook para un counter
export const useCounter = (initialCounter = 10) => {
    const [counter,setCounter] = useState(initialCounter);

    const increment = (factor = 1) => {
        setCounter(counter + factor)
    }
    
    const decrement = (factor = 1) => {
        setCounter(counter - factor)
    }

    const reset = () => { setCounter(initialCounter) } 

    //  se retorna para poder utilizarlo cuando desestructuremos el hook en nuesto componente
    return {
        counter, 
        increment,
        decrement,
        reset
    }

}
