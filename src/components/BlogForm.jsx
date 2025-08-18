import { useState } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

const BlogForm = ({createBlog})=>{
    const [newTitle, setNewTitle ] = useState([])
    const [newAuthor, setNewAuthor ] = useState([])
    const [newUrl, setNewUrl ] = useState([])
    

     //Actualiza los hooks 
    const onChangeTitle= (event) => setNewTitle(event.target.value)
    const onChangeAuthor= (event) => setNewAuthor(event.target.value)
    const onChangeUrl= (event) => setNewUrl(event.target.value)
    
    const addBlog = (event) => { 
        event.preventDefault()

        createBlog ( {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
    
    }
    

  return(
    <>
      <Box
        onSubmit={addBlog}
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
        
        marginTop={3}        
      >       
        <Typography variant="h6" textAlign='center' >Create New</Typography>

        <TextField label="Title" onChange={onChangeTitle}  variant="outlined" size='small' type="text"/>

        <TextField label="Author" onChange={onChangeAuthor} variant="outlined" size='small' type="text"/>
        <TextField label="Url" onChange={onChangeUrl} variant="outlined" size='small' type="text"/>
       
        <Button variant="contained" type='submit' color="success">Create</Button>
      </Box>

    </>
  )
}


export default BlogForm
