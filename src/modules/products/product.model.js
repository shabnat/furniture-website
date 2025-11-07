
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
   

    name:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    category:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    stock:{
      type:Number,
      default:0
    },
  //  stores image urls
    images:[{type:String}] ,  
    tags: [{ type: String }],
    isFeatured:{
    type:Boolean,default:false
  },
  sku:{
    type:String,
    unique:true
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },

  material: { type: String },
  color: { type: String },

  },
  {timestamps:true}
)

// 🔹 Auto-generate unique SKU before saving
productSchema.pre("save", async function (next) {
  if (!this.sku) {
    // Example: generate code like PROD-CHAIR-0001
    const prefix = "PROD";
    const category = this.category
      ? this.category.toUpperCase().substring(0, 3)
      : "GEN"; // default if category missing

    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    this.sku = `${prefix}-${category}-${randomNum}`;
  }
  next();
});




const Product = mongoose.model("Product", productSchema);

export default Product;