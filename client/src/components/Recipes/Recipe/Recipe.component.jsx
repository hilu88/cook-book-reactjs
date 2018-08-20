import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

import './Recipe.css';

const recipe = (props) => {
    return (
        <Card className='card'>
            <CardMedia
                className='media'
                image="https://i2.wp.com/www.orchidsandsweettea.com/wp-content/uploads/2018/06/shrimp-1209744_1280.jpg?resize=1024%2C694&ssl=1"
                title="Recipe"
            />
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {props.recipe.title}
                </Typography>
                <Typography component='p'>
                    {props.recipe.description}
                </Typography>
            </CardContent>
            <CardActions className='actions' disableActionSpacing>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => props.fullRecipe( props.id )}>
                    Open
                </Button>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => props.editRecipe( props.id )}>
                    Edit
                </Button>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => props.deleteRecipe( props.id )}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
};

export default recipe;