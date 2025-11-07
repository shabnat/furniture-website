

export const productValidation= (req)=>{

  const{name,description,category,price,stock,images,sku}=req.body

 if(!name || !description || !category || !price || !stock || !images ||sku){
  throw new Error ('All fields are required')
 }
 
 if(typeof price !== "number" || price <= 0 ){
  throw new Error ('Price must be a positive  number')
 }

 if(stock < 0 ){
  throw new Error('Stock cannot be negative ')
 }
 
 if (!Array.isArray(images) || images.length === 0) {
  throw new Error("At least one product image is required");
}

}