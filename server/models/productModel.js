const mongoose=require('mongoose');
const {Schema}=mongoose;

const productModel=new Schema({
    _id:{type:String},
    title:{type:String},
    images:[{type:String, default:''}],
    description:{type:String},
    content:{type:String},
    colors:[{type:String}],
    sizes:[{type:String}],
    price:{type:Number},
    count:{type:Number}
});
module.exports=mongoose.model('Product', productModel, 'product');
//trazi mi kolekciju po prvom argumentu i dodaje u pretragi s, unutar te kolekcije mi trazi product--> products.product
