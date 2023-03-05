import app from "./app.js";
import chalk from "chalk"

app.listen(5000, () => {
    console.log(chalk.green.bold("Server is running!"));
})
