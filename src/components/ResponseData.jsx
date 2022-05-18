import React from 'react'
import Divider from "@mui/material/Divider";
import CircularProgress from '@mui/material/CircularProgress';
  

export default function ResponseData({responseHistory, executing}) {

function loadingCircle(executing){
  if(executing == true){
    return( <CircularProgress style={{marginLeft: '50%'}} /> )
  }
}
  return (
    <>
    {loadingCircle(executing)}
    {responseHistory.length > 0 &&
      responseHistory.map((resArr, index) => {
        return (  
            <>
            <div className='Response' key={index}>  <Divider/><b>Prompt: </b>{resArr.prompt}<Divider/><b>Response:</b> {resArr.response} </div><br></br>
            <Divider />
            </>
        );
      })}
    </>
  )
}
