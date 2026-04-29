import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: import("http").IncomingMessage) {
        return {
          id: (req as any).id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: import("http").ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    // Supports comma-separated origins: FRONTEND_URL="https://prod.com,http://localhost:5173"
    origin: (origin: any, cb: any) => {
      const allowed = (process.env.FRONTEND_URL ?? "http://www.bigbucksinnovation.com")
        .split(",")
        .map((s) => s.trim());
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err }, "[error]");
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
);

export default app;
