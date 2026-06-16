import React , {useEffect, useState, useRef} from 'react';

const GuessNumGame = () => {
    const [num, setNum] = useState(null);
        const [round, setRound] = useState(null);
        const inputref = useRef(null);
        const [out, setOut] = useState("Guess a number!")
        const [history, setHistory] = useState([])
    
        useEffect(() => {
            setRound(1);
            setNum(Math.floor(Math.random() * 100) + 1)
        }, [])
    
        function Check(){
            const joe = inputref.current.value.trim();
            setRound((prev) => prev + 1)
            if (joe > num){
                setOut(`The anwser is less than ${joe}`)
            }
            else if (joe < num) {
                setOut(`The anwser is greater than ${joe}`)
            }
            else if(joe == num) {
                setOut(`YOU WIN the number is: ${num} With ${round} attempt`)
                setNum(Math.floor(Math.random() * 100) + 1)
                setRound(1)
                setHistory((prev) => [...prev, round].sort((a, b) => a - b))
                console.log(num);
            }
            else {
                setOut("Please type the number between 0 - 100")
            }
            inputref.current.value = ""
            console.log(num);
        }
    
            
        return (
            <>
            <h1>{out}</h1>
            <div className='flex gap-10'>
                    <input type="text" className='border' ref={inputref} onKeyDown={(e) => {if (e.key === "Enter"){Check();}}}/>
             </div>
             <button className='w-fit h-7 p-2 bg-gray-300 m-4' onClick={Check}>
                Submit
             </button>
             <h1>Round: {round}</h1>
             <p>{history.join(",")}</p>
             </>
        );
}

export default GuessNumGame;
