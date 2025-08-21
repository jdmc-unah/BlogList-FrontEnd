import { useState } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const BlogForm = ({createBlog})=>{
    const [newTitle, setNewTitle ] = useState([])
    const [newAuthor, setNewAuthor ] = useState([])
    const [newUrl, setNewUrl ] = useState([])

    const [picUrl, setPicUrl ] = useState([])
    const [description, setDesc ] = useState([])

        

     //Actualiza los hooks 
    const onChangeTitle= (event) => setNewTitle(event.target.value)
    const onChangeAuthor= (event) => setNewAuthor(event.target.value)
    const onChangeUrl= (event) => setNewUrl(event.target.value)

    const onChangePicUrl= (event) => setPicUrl(event.target.value)
    const onChangeDesc= (event) => setDesc(event.target.value)
    
    const addBlog = async (event)  =>  { 
        event.preventDefault()

        await createBlog ( {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            picUrl: picUrl,
            description: description
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
        <TextField label="Titulo" onChange={onChangeTitle}  variant="outlined" size='small' type="text" multiline maxRows={2}/>
        <TextField label="Autor" onChange={onChangeAuthor} variant="outlined" size='small' type="text"/>
        <TextField label="Enlace" onChange={onChangeUrl} variant="outlined" size='small' type="text"  />
        <TextField label="Url de Imagen" onChange={onChangePicUrl} variant="outlined" size='small' type="text"/>
        <TextField label="Descripción" onChange={onChangeDesc} variant="outlined" size='small' type="text" multiline maxRows={4}/>
       
        <Button variant="contained" type='submit' color="success">Guardar</Button>
      </Box>

    </>
  )
}


export default BlogForm
