import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Picker from '@emoji-mart/react';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { TextField } from '@mui/material';
import "./Home.css";


//avtar functionality 

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Home = () => {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState({ messae: "" });
  const [messagetime, setMessagetime] = useState({ time: "" })
  const [isPicker, setIspicker] = useState(false);
  const [userName, setUserName] = useState("");

  // handel send click
  const handelClick = () => {

    if (chat.messae !== "") {


      setData([...data, { ...chat, ...messagetime, ...userName }]);
      console.log(data);
      setChat({ messae: "" });

    }
  }

  // get random item
  function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }


  //Handel input change 
  const handelChange = (e) => {
    const array = ["Alan Sons", "Bob Mathis", "Carol Carnol ", "Dean Deshpande", "Elin Mask"];

    const result = getRandomItem(array);



    let newmessagetime = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    setChat({ messae: e.target.value });
    setMessagetime({ time: newmessagetime });
    setUserName({ userName: result });
  }
  const onEmojiClick = (event, emojiObject) => {
    console.log(event.native)
    console.log(chat.messae + event.native);
    setChat({ messae: chat.messae + event.native })
    setIspicker(!isPicker);
  };

  return (
    <>

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" sx={{ padding: '20px' }} >
          <Box sx={{
            backgroundColor: 'rgb(209, 208, 208)'
          }} >

            {/* '&:hover': {
              backgroundColor: 'rgb(209, 208, 208)',
              opacity: [0.9, 0.8, 0.7],
            }, */}

            {/* header */}
            <div className='chatapp-header' >
              <div> This is Chat App</div>
              <div >
                <span> This is Chanel for compoany wide chat App Ketan Kulkarni</span>
                <span style={{ color: 'yellow' }}> #@chat App Ketan Kulkarni</span>

              </div>
            </div>
            {/* header */}

            {/* message  section  start */}
            <div className='message-card-box' >

              {
                data ? (<>
                  {
                    data.map((item, idx) => {

                      console.log(idx + 1);
                      return (
                        <>
                          <div className='messagecard' key={idx + 1} >
                            <Stack direction="row" spacing={2} style={{ marginTop: '15px' }} className='messagecard-header' >
                              <Avatar {...stringAvatar(item.userName)} />

                              <h5>{item.userName}</h5>
                              <span>{item.time}</span>
                            </Stack>


                            <div className='message-box'>

                              <div >


                                <span> {item.messae}</span>


                              </div>
                            </div>

                          </div>


                        </>
                      )
                    })
                  }
                </>) : ("")
              }

              {/* message end section  */}
            </div>


            {/** Input area */}

            <div className="input-box " >
              <TextField id="outlined-basic" label="" variant="outlined" multiline fullWidth sx={{ maxWidth: '400px' }}
                value={chat.messae} onChange={handelChange} />
              <div className='input-btn'> <EmojiEmotionsIcon fontSize="small" color="warning" onClick={() => { setIspicker(!isPicker) }} />
                <SendIcon fontSize="small" onClick={handelClick} color="primary" /></div>

              <div className='emojicard'>
                {isPicker && <Picker
                  pickerStyle={{ width: 'auto' }}
                  onEmojiSelect={onEmojiClick} />}
              </div>
            </div>
    {/** Input area end here*/}

          </Box>
        </Container>
      </React.Fragment>

    </>
  )

}

export default Home;