import app from "./app";
import dotenv from "dotenv";

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: '.env.development' })
}

app.listen(process.env.PORT || "5000", () => {
    console.log("Server is running!");
})
