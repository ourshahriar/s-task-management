import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/routes";
import httpStatus from "http-status";

const app: Application = express();

//Middleware Package
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router Calling

app.use("/api/v1", router);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: res.statusCode,
    success: true,
    message: "Route is working",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
export default app;
