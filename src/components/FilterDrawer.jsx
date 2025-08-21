import Box from '@mui/material/Box';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const DrawerFilter= () => {
    const [filter, setFilter] = useState(0); 
    const [orderBy, setOrderBy] = useState(0); 

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);

    };

    const handleChangeOrderBy = (event) => {
        setOrderBy(event.target.value);
    };


    

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
                <FormControlLabel value={1} control={<Radio />} label="Más gustados" />
                <FormControlLabel value={2} control={<Radio />} label="Titulo" />
                <FormControlLabel value={3} control={<Radio />} label="Autor" />
            </RadioGroup>
        </FormControl>

        <FormControl>
            <FormLabel id="filter">Categoría</FormLabel>
            <RadioGroup
                aria-labelledby="filter"
                name="filter"
                value={orderBy}
                onChange={handleChangeOrderBy}
            >
                <FormControlLabel value={1} control={<Radio />} label="Más gustados" />
                <FormControlLabel value={2} control={<Radio />} label="Titulo" />
                <FormControlLabel value={3} control={<Radio />} label="Autor" />
            </RadioGroup>
        </FormControl>
     
      
    </Box>
   </>
  );
}

export default DrawerFilter