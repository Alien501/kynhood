import express, { Express, Request, Response } from "express";
import router from "./router/router";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});