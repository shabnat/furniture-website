import { createProductService, getAllProductService } from "./product.service.js";
import { productValidation } from "./product.validation.js"


export const createProductController = async(req, res)=>{
try {
    //product validation
    productValidation(req)

    const product = await createProductService(req.body)
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });


} catch (error) {
  res.status(400).json({ success: false, message: error.message });
}


}

export const getAllProductController = async(req,res)=>{

 try {
  const products= await getAllProductService()

  res.status(200).json({
    success: true,
    results: products.length,
    data: products,
  });


 } catch (error) {
  res.status(400).json({
    success: false,
    message: error.message,
  });
 }

}