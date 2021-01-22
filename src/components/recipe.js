import React, { handleClick, useState } from "react";
import style from './recipe.module.css'
import ReactCardFlip from 'react-card-flip';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';




class RecipeCard extends React.Component {
    constructor({ title, calories, image, ingredients, dietLabels,totalNutrients,totalPercentage }) {
        super();

var nutrients = [];
for(var NutrientsKey in totalNutrients){
    if(totalNutrients.hasOwnProperty(NutrientsKey)){
        nutrients.push(totalNutrients[NutrientsKey]);
    }
}

        this.state = {
            isFlipped: false,
            title: title,
            calories: calories,
            image: image,
            ingredients: ingredients,
            dietLabels: dietLabels,
            rowData: nutrients
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <div className={style.recipe} onClick={this.handleClick} >
                    <h1>{this.state.title}</h1>
                    {this.state.dietLabels.map(label => (
                        <h2 className={style.dietLabels}>{label}</h2>
                    ))}

                    <ol>
                        {this.state.ingredients.map(ingredient => (
                            <li className={style.ingredients}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <p>{this.state.calories}</p>
                    <img className={style.image} src={this.state.image} alt="" />


                </div>


                <div className={style.caloriesCard} onClick={this.handleClick}>
                    <h1>{this.state.title}</h1>
                    <h1>Nutrients Facts</h1>
                    <div className="ag-theme-alpine" style={ { height: 400, width: 600 } }>
            <AgGridReact
                rowData={this.state.rowData}>
                <AgGridColumn field="label"></AgGridColumn>
                <AgGridColumn field="quantity"></AgGridColumn>
                <AgGridColumn field="unit"></AgGridColumn>
            </AgGridReact>
        </div>

                </div>

            </ReactCardFlip>
        )
    }
}


export default RecipeCard;