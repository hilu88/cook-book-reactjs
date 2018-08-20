import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

import './FullRecipeInfo.css';

const fullRecipeInfo = ( props ) => {
    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={4} className='recipe-image'>
                    <img alt='recipe'
                         className='image'
                         src="https://i2.wp.com/www.orchidsandsweettea.com/wp-content/uploads/2018/06/shrimp-1209744_1280.jpg?resize=1024%2C694&ssl=1"/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="title">
                        {props.info.title}
                    </Typography>
                    <p>description: {props.info.description}</p>
                    <p>directions: {props.info.directions}</p>
                    <p>ingredients: {props.info.ingredients}</p>
                    <p>cook time: {props.info.cookTime}</p>
                    <p>number of servings: {props.info.numberOfServings}</p>
                    <Button
                        color='primary'
                        onClick={props.editRecipe}>Edit</Button>
                    <Button
                        color='secondary'
                        onClick={() => props.deleteRecipe(props.info._id)}>Delete</Button>
                </Grid>
            </Grid>
        </div>

    )
};


export default fullRecipeInfo;