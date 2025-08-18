import { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  //Usa estilos css para ocultar o mostrar los componentes que retorna
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  
  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
         <Box  
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          >
            <Button  startIcon={<AddCircleOutlineIcon/>} variant='contained' size='small' color='warning' onClick={toggleVisibility}>{props.buttonLabel}</Button>

          </Box>
      </div>
      <div style={showWhenVisible}>
        <Box  
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          >
            {props.children}  {/*muestra los elementos del child component */}
            <Button variant='contained' size='small' color='error'  onClick={toggleVisibility}>cancel</Button>
        </Box>
      </div>
    </div>
  )

}

export default Toggable