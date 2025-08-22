import Box from '@mui/material/Box';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import categories from '../../localdata/categories'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const DrawerFilter= () => {
    const [filter, setFilter] = useState(0); 
    const [orderBy, setOrderBy] = useState(0); 
    const [category, setCat] = useState('');

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleChangeOrderBy = (event) => {
        setOrderBy(event.target.value);
    };

    const handleChangeCat = (event) => {
        setCat(event.target.value);
    };


    const handleRestart =()=>{
        setFilter(0)
        setOrderBy(0)
        setCat('')
    }

    

  return (
   <>
    <Box sx={{ width: 225, height: '100%' , display:'flex' , flexDirection:'column' , alignItems:'center', justifyContent:'space-evenly'  }} role="presentation"   >
         
         
        <FormControl>
            <FormLabel id="filter">Filtrar por</FormLabel>
            <RadioGroup
                aria-labelledby="filter"
                name="filter"
                value={filter}
                onChange={handleChangeFilter}
            >
                <FormControlLabel value={1} control={<Radio />} label="Todos" />
                
                <FormControlLabel value={2} control={<Radio />} label="Mis Blogs" />
            </RadioGroup>
        </FormControl>
        <FormControl>
            <FormLabel id="filter">Ordenar por</FormLabel>
            <RadioGroup
                aria-labelledby="filter"
                name="filter"
                value={orderBy}
                onChange={handleChangeOrderBy}
            >
                <FormControlLabel value={1} control={<Radio />} label="Populares" />
                <FormControlLabel value={2} control={<Radio />} label="Titulo" />
                <FormControlLabel value={3} control={<Radio />} label="Autor" />
            </RadioGroup>
        </FormControl>
        
        <Box width={150}>
            <Typography variant="body1" color="text.secondary">Categoria</Typography>
            <TextField 
                fullWidth
                id="category"
                select
                defaultValue="Arte"
                // label="Categoría" 
                value={category} onChange={handleChangeCat}
                variant="outlined" size='small' type="text" >
                    {categories.map((cat)=> (
                    <MenuItem key={cat.value} value={cat.value} > {cat.label}  </MenuItem>  
                    ) )}
            </TextField>

        </Box>
        

        <Button variant="outlined" size='medium' color="primary" onClick={handleRestart} >
            Reiniciar 
        </Button>


      
    </Box>
   </>
  );
}

export default DrawerFilter