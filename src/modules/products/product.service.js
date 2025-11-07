import Product from "./product.model.js"


export const createProductService = async(productData)=>{
  try {
    const product= new Product(productData)
    await product.save()
    return product
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAllProductService =async ()=>{
  try {
    const products = await Product.find()
    return products
  } catch (error) {
    
    throw new Error(error.message);
    
  }
}