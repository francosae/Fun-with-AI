import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ResponseData from './components/ResponseData';

//Material UI
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Vector from './Vector.png'

function App() {

const [prompt, setPrompt] = useState('');
const [responseHistory, setresponseHistory] = useState([]);
const [executing, setExecuting] = useState(false);
const [empty, setEmpty] = useState(false)

const submitPrompt = (e) => {
  setExecuting(true)
  if(prompt === ""){
    setExecuting(false)
    setEmpty(true)
    return;
  }
  axios.get("https://fun-with-openai.herokuapp.com:443/sendPrompt", { params: {prompt: prompt}})
    .then((response) => {
      const currentResponse = {
        prompt: response.data.sentPrompt,
        response: response.data.apiResponse.text,
      };
      const responses = [currentResponse, ...responseHistory];
      setresponseHistory(responses);
      setExecuting(false);
      setPrompt('');
    })
    .catch((error) => {
      console.log(error);
    });
}

//Preventing sending no prompt

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const closeAlert = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setEmpty(false);
  setCleared(false);
};

//Clear responses

const [Cleared, setCleared] = useState(false)
function clearResponses(){
  setresponseHistory([])
  setCleared(true)
}


  return ( 
    <>
      <div className='Heading'>Fun with AI!</div>
      <div className='Subheading'>Enter and submit a prompt to receive a response!</div>
      <img className='Logo' width='100' height='100' src={Vector}></img>
      <div className='Boxes'>
        <TextField
          id="outlined-basic"
          label="Enter a prompt to submit"
          value={prompt}
          variant="outlined"
          multiline
          rowsMax="12"
          inputProps={{ style: { 
            fontFamily: 'Charter', 
            color: 'white', 
            width: '400px', 
            height: '350px', 
            padding: "18px 30px" , 
            fontSize: "32px"  },
            }}
          onChange={(e) => setPrompt(e.target.value)}
          className='InputBox'/>

      <LoadingButton
        className="ClearBtn"
        loading={executing}
        loadingIndicator="Loading"
        variant="outlined"
        onClick={submitPrompt}
        disabled={executing} 
        style={{
          borderRadius: 35,
          backgroundColor: "#FFFFFF",
          fontSize: "15px",
        }}>
        Submit
      </LoadingButton>

      <LoadingButton
        className="SubmitBtn"
        loading={executing}
        loadingIndicator="Loading"
        variant="outlined"
        onClick={clearResponses}
        disabled={executing} 
        style={{
          borderRadius: 35,
          backgroundColor: "#FFFFFF",
          fontSize: "15px",
        }}>
        Delete Responses
      </LoadingButton>

      </div>

        <Snackbar open={empty} autoHideDuration={6000} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
            Please enter a prompt first!
          </Alert>
        </Snackbar>

        <Snackbar open={Cleared} autoHideDuration={6000} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
            Responses successfully deleted!
          </Alert>
        </Snackbar>

        <div className='ResponsesBox'>
          <ResponseData
            responseHistory={responseHistory}
            executing={executing} /> 
        </div>
    </>
  );
}
export default App;
