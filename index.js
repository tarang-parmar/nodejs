import connectDB from "./config/database.js";
import app from "./app.js";

export const PORT = 3000;
// IMAGE URL
// http://localhost:3000/uploads/images/1718028509411-tarang_resume.PNG

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
