import express from "express";
import cors from "cors";
import helmet from "helmet";
import {config} from "@config/config";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
