import React, { useState, useEffect}from 'react';


// how to build a box for you to type in with words in it?
// how to put a underline for each charcter
// how to check if the character is clicked
// check if the sentence length is reached
//check if the key is being macthed with the charcter



function TypingTest () {
    // we separte the states to make it easier to work with
    const [time, setTime] = useState(0)
    const [timerOn, setTimeOn] = useState(false)
    const [sentence, setSentence] = useState([]); // maybe have array of sentence
    
    useEffect(() => {
        console.log(timerOn)
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1) 
            }, 1000)
        } else {
            clearInterval(interval)
        }
        
        return () => clearInterval(interval)
    }, [timerOn])  
    // set new state for end time
    // logic 
    // get the character in numbers and divided by the difference
    
    const reset = () => {
        setTime(0);
        setTimeOn(false)
        // setSentence() /// set to a random number for the index
    }
    //  A reset button
    return (
        <div> 
            {/* Display Timer  */}
            <h2>{time}</h2>

            {/* Have a display of current cahrarchter
            get a underline under current  character*/}

            {/* display character per second */}

            {/* need to add a start and stop timer to onChange */}
            <button onClick={() => setTimeOn(!timerOn)}>Press Me</button> 
            <button onClick={() => reset()}>Reset Typing test</button>
        </div>
    )
}

export default TypingTest;