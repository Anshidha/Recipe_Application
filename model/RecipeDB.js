const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://Anshidha:Anshidha@cluster0.eh9k7sv.mongodb.net/?retryWrites=true&w=majority");

const Schema = mongoose.Schema;

var RecipeScehema = new Schema ({
    // r_image : {
    //     data:Buffer,
    //     contentType:String
    // },
          
    r_title : String,
    r_duration : String,
    r_servings : Number
    

});

var RecipeInfo = mongoose.model("recipes",RecipeScehema)

module.exports = RecipeInfo;


