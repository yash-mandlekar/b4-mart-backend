const ProductData = require("../models/productModel");

exports.product_add = async (req, res) => {
  try {
    const product = await ProductData.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login= async (req,res)=>{
  
  try{
      const {email,password}=req.body;
      const user= await UserdataSchema.findOne({email:email});
      console.log(user)
      if(!user){
          return res.status(404).send("user not register");
      }
      const passwordCheck= await bcrypt.compare(password, user.hash);
      if(!passwordCheck){
         return res.status(401).send("massege: password not match");
      }
      return res.status(201).send("massege: login sucessful")

      
  }catch(error){
      console.log(error);
      res.status(500).json("massege: internal error")
  }
};
