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


const DrawerFilter= ({setFilter}) => {
    
    const [filterBy, setFilterBy] = useState('all'); 
    const [orderBy, setOrderBy] = useState('popular'); 
    const [category, setCat] = useState('');

    const handleChangeFilter = (event) => {
        setFilterBy(event.target.value)
        updateFilter()
    };

    const handleChangeOrderBy = (event) => {
        setOrderBy(event.target.value)
        updateFilter()
    };

    const handleChangeCat = (event) => {
        setCat(event.target.value)
        updateFilter()
    };

    const updateFilter= ()=>{
        const newFilter = {
            filter: filterBy, 
            order: orderBy , 
            cat: category 

        }

        console.log(newFilter);
        
        setFilter(newFilter)
    }


    const handleRestart =()=>{
        setFilter('all')
        setOrderBy('popular')
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
                value={filterBy}
                onChange={handleChangeFilter}
            >
                <FormControlLabel value={'all'} control={<Radio />} label="Todos" />
                
                <FormControlLabel value={'my blogs'} control={<Radio />} label="Mis Blogs" />
            </RadioGroup>
        </FormControl>
        <FormControl>
            <FormLabel id="orderby">Ordenar por</FormLabel>
            <RadioGroup
                aria-labelledby="orderby"
                name="orderby"
                value={orderBy}
                onChange={handleChangeOrderBy}
            >
                <FormControlLabel value={'popular'} control={<Radio />} label="Populares" />
                <FormControlLabel value={'title'} control={<Radio />} label="Titulo" />
                <FormControlLabel value={'author'} control={<Radio />} label="Autor" />
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
                     <MenuItem key={''} value= {''} >  </MenuItem>  
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