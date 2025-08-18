import { useState } from "react"


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';

import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//Iconos
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const increaseLikes = async ()=>{
    blog.likes = blog.likes + 1
    await likeBlog(blog.id, blog)
  }

  const handleDeleteBlog = async()=>{
    deleteBlog(blog)
  }


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
      })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        variants: [
          {
            props: ({ expand }) => !expand,
            style: {
              transform: 'rotate(0deg)',
            },
          },
          {
            props: ({ expand }) => !!expand,
            style: {
              transform: 'rotate(180deg)',
            },
          },
        ],
      }));


  return (
    <>
    
      <Card sx={{mb:1}} >
         <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {blog.author[0]}
              </Avatar>
            }
            
            title={blog.title}
            subheader={blog.author}
            action={ 
              <>
                <IconButton color="error" size="small" aria-label="add to favorites" onClick={increaseLikes}>
                  <FavoriteIcon />  {blog.likes}
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
              </ExpandMore>
              </>}
        />
         <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardActions>
            <Box sx={{ flexGrow: 1 }} />
            <Button href={blog.url} variant='outlined' size="small">Go to blog</Button>
            <Button onClick={handleDeleteBlog}  variant='outlined' size="small">Delete</Button>
        </CardActions>
        </Collapse>
        
       
      </Card>
    


    

    </>
  )

}

export default Blog