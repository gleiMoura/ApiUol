import app from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT || "5000", () => {
    console.log("Server is running!");
})
