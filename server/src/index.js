import  express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import  { userRouter}  from "./routes/users.js";
import  { etudiantRouter}  from "./routes/etudiants.js";
import { salleRouter } from './routes/salles.js'
import{equipeRouter} from './routes/equipes.js';
import { tuteurRouter }from './routes/tuteurs.js';
import multer from "multer";


const app = express();
app.use(express.json());
app.use(cors());
// Welcome Page
app.use( "/auth" , userRouter);
// Dashboard
app.use( "/etudiants" , etudiantRouter);
app.use( "/salles" , salleRouter);
app.use("/equipes" , equipeRouter);
app.use("/tuteurs" , tuteurRouter);

/* // Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
); */
// Upload from EXCEL
/* const storage = multer.memoryStorage();
const upload = multer({ storage : storage});
router.post('upload' ,upload.single('file'), (res, req) =>{}) */

mongoose.connect("mongodb+srv://acilzaidi:1exWec3iLKjYZ9Xs@cluster0.ocz8iyj.mongodb.net/stage?retryWrites=true&w=majority")    

app.listen(6001, ()=> console.log("SERVER STARTED!!") );

