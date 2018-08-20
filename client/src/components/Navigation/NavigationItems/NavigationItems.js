import React from 'react';

import './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Recipes</NavigationItem>
        <NavigationItem link="/create-recipe">+Recipe</NavigationItem>
    </ul>
);

export default navigationItems;