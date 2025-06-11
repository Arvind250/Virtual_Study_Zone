import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//import routes
import userRouter from "./routes/user.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js";
import classRoutes from "./routes/class.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";




//declare routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/assignments", assignmentRoutes);






export {app}