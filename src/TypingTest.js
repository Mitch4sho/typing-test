import React, { useState }from 'react';



// how to build a box for you to type in with words in it?
// how to put a underline for each charcter
// how to check if the character is clicked
// check if the sentence length is reached
//check if the key is being macthed with the charcter


function Preview (props) {
    const sentence = props.sentence.split(''); // split the text into a array so you have control of each charcter
    const userInput = props.userInput
    return (
        <div>
            {/* a way to color each character in a word */}
            {sentence.map((c, i) => {
                let color;
                if (i < userInput.length) {
                    color = c === userInput[i] ? '#dfffa0' : '#fcbea4';
                }
                return (
                    <span key={i} style={{backgroundColor: color}}>{c}</span>
                )
            })}
        </div>
    );
}

function Speed (props) {
    return (
        <div>
            speed
        </div>
    )
}


function TypingTest () {
    const [state, setState] = useState({
        time: 0,
        timerOn: false,
        sentence: 'Test',
        userInput: '',
    })

    const onUserInputChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            userInput: value,
        })
        console.log(state.userInput)
    }
    // set new state for end time
    // logic 
    // get the character in numbers and divided by the difference
    
    const reset = () => {
        setState({
            time: 0,
            timerOn: false,
            sentence: 'Test',
            userInput: ' ',
        })
    }
    //  A reset button
    return (
        <div> 
            {/* Display Timer  */}
            <h2>{state.time}</h2>

            {/* Have a display of current cahrarchter
            get a underline under current  character*/}
            <Preview sentence= {state.sentence} userInput ={state.userInput}/>
            <textarea 
            value= {state.userInput}
            onChange= {onUserInputChange}
            rows="5" cols="50"
            placeholder=" Start Typing"
            ></textarea>
            {/* display character per second */}
            <Speed />

            {/* need to add a start and stop timer to onChange */}
            <button onClick={() => setState({
                ...state, 
                timerOn: !state.timerOn
                })}>Press Me</button> 
            <button onClick={() => reset()}>Reset Typing test</button>
        </div>
    )
}

export default TypingTest;