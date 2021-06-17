import React, { useState, useEffect }from 'react';
import { Box, Button, Grid } from '@material-ui/core';


function getSentence () {
    const sentence = [
        'Swim at your own risk was taken as a challenge for the group of Kansas City college students.',
        'It took him a while to realize that everything he decided not to change, he was actually choosing.',
        '25 years later, she still regretted that specific moment.',
    ]

    return sentence[Math.floor(Math.random() * sentence.length)]
}

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
    const time = props.time;
    const characters = props.characters;
    if (time !== 0 && characters !== 0 ) {
        let cps = Math.floor(characters /time);
        return (
            <div>
                <p>{cps} characters per second</p>
            </div>
        )
    }
    return null;
}

function TypingTest () {
    const [state, setState] = useState({
        time: 0,
        timerOn: false,
        sentence: getSentence(),
        userInput: '',
        characters: 0,
    })

    const onUserInputChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            timerOn: true,
            userInput: value,
            characters: countCorrectCharaters(value)
        })
    }

    const countCorrectCharaters = (userInput) => {
        const text = state.sentence.replace(' ', '');
        return userInput.replace(' ', '').split('').filter((s, i) => s === text[i]).length
    }

    useEffect(() => {
        let interval = null;

        if (state.timerOn) {
            interval = setInterval(() => {
                setState(prev => {
                    return {
                        ...prev,
                        time: prev.time + 1,
                    }
                })}, 1000);
        }

        if (state.userInput.length === state.sentence.length) {
            clearInterval(interval);
            setState(prev => {
                return {
                    ...prev,
                   timerOn: false,
                }
            })
        }

        return () => clearInterval(interval);

    }, [state.timerOn, state.userInput, state.sentence])
    
    const reset = () => {
        setState({
            time: 0,
            timerOn: false,
            sentence: getSentence(),
            userInput: '',
            characters: 0,
        })
    }

    return (
        <Box mt={20}> 
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <paper>Curent time: {state.time}</paper>
                </Grid>
                <Grid item xs={12}>
                    <Preview sentence= {state.sentence} userInput ={state.userInput}/>
                </Grid>
                <Grid item xs={12}>
                    <textarea 
                    value= {state.userInput}
                    onChange= {onUserInputChange}
                    rows="5" cols="50"
                    placeholder=" Start Typing"
                    readOnly={state.userInput.length === state.sentence.length}
                    ></textarea>
                </Grid>
                <Grid item xs={12}>
                    <Speed time={state.time} characters={state.characters}/>
                    <Button variant="contained" color="primary" onClick={() => reset()}>Reset Typing test</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TypingTest;