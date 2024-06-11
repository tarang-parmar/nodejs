import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  quantity: yup.number().required("Product quantity is required").default(0),
  price: yup.number().required("Product price is required").default(0),
  image: yup.array().of(yup.string()),
});

const validateProductInput = (req, res, next) => {
  console.log("validateProductInput  req--->", req.body, typeof req.body);
  try {
    productSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log("validateProductInput  error--->", error);
    res.status(400).json({ errors: error.errors });
  }
};

export { productSchema, validateProductInput };
