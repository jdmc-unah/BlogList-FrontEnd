import { useState, useEffect } from 'react'

//Servicios
import blogService from './services/blogs'
import loginService from './services/login'

//Componentes
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Notification from './components/Notification'

import DropDownMenu from './components/DropDownMenu'

//Estilos
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)


   useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogs( blogs) )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      
      blogService.setToken(user.token)
    }
}, [])

  

  const clearMessage = () =>{
    setTimeout(() => {
        setMessage(null)
    }, 3000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
      setMessage('Login successful')
      setErrorMessage(false)
      clearMessage()
    
    } catch (exception) {
      
      setMessage('Wrong credentials')
      setErrorMessage(true)
      clearMessage()
      
    }
  }

  const loginForm = () => (
    
    <>
   
      <Container maxWidth="sm">
      
      <Notification  message={message}  error= {errorMessage}/>

      
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        paddingLeft={2}
        marginTop={10}
      >
        <Typography variant="h4" gutterBottom>
          Hola, <br /> Bienvenido!
        </Typography>
        
        <Typography variant="subtitle1" color='primary' gutterBottom>
          Ingresa tus credenciales para empezar a navegar
        </Typography>
        
        
      </Box>
      <Box
        onSubmit={handleLogin}
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        minHeight="40vh"
        
        
      >
        <TextField value={username} label="Usuario" onChange={({ target }) => setUsername(target.value)}
          name="Username"
          variant="outlined" 
          size='small'
          type="text"
          slotProps={{
            input: {
              startAdornment:(
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
              },
            }} 
        />

      
        <TextField value={password} label="Contraseña" onChange={({ target }) => setPassword(target.value)}
          name="Username"
          variant="outlined" 
          size='small'
          type="password"
          slotProps={{
            input: {
              startAdornment:(
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            },
          }} 
        />
        
        <Button variant="contained" type='submit'>Entrar</Button>
      </Box>
      </Container>
    </>    
  )

  const logout = ()=>{
    window.localStorage.clear()
    setUser(null)
  } 



  const createBlog = async (newBlog)=>{
   
    const blogCreated = await blogService.create(newBlog)
    
    setBlogs( sortBlogs( blogs.concat(blogCreated)) )
    
    setMessage('El blog fue creado con exito')
    setErrorMessage(false)
    clearMessage()

  }
  
  const likeBlog = async(blogID, blogToUpdate) =>{
    await blogService.update(blogID, blogToUpdate)
    const updatedBlogList = blogs.filter(blog => blog.id !== blogID )
    const updatedBlog = await blogService.getBlog(blogID) 
    setBlogs( sortBlogs(updatedBlogList.concat(updatedBlog) ) )
    
  }

  const deleteBlog = async(blogToDelete)=>{
    
    if (window.confirm(`Esta seguro que desea borrar el blog: ${blogToDelete.title}`) ) {
      try {
        const deletedBlog = await blogService.deleteBlog(blogToDelete.id)  
          
        setBlogs( sortBlogs( blogs.filter( blog => blog.id !== deletedBlog.id )) )

        setMessage(`El blog ${deletedBlog.title} fue borrado con exito `)
        setErrorMessage(false)
        clearMessage()
        
      } catch (error) {
        setMessage(`Error: no tiene autorización para borrar el blog`)
        setErrorMessage(true)
        clearMessage()
      }

    } 
  }



  const sortBlogs = (blogs)=>{
    return blogs.sort ( (a, b) => b.likes - a.likes ) 
  }
  

 

  return (
    <>
      

      { user === null ? loginForm() : 
        <div>
          
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant='h5' sx={{ flexGrow: 1 }} >Blog App</Typography>
                      

              <DropDownMenu  handleLogOut={logout} uName={user.name} />
            </Toolbar>
          </AppBar>
          
          <br /><br />

          <Notification  message={message}  error= {errorMessage} />
    
          {/*Muestra el form para crear los blogs nuevos  */}
          <Toggable  buttonLabel={'Agregar Nuevo Blog'}>
            
            <BlogForm  
              createBlog = {createBlog}
            />
                
          </Toggable>

          <br /><br />


         
          {/* Muestra los blogs */}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog ={likeBlog} deleteBlog= {deleteBlog} />    
          )}

          
        
        </div>
      }


     </>
    
  )
}

export default App