//Gestiona las imagenes
import multer, {diskStorage} from "multer";
import {dirname, extname, join} from 'path'
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg","image/png","image/jpg"]
const MAX_SIZE= 1000000000//Bytes(10MB)


const multerConfig = (destinationPath)=>{
    return multer(//obtiene conjunto de opciones
        {
            storage: diskStorage(//conjunto de configuraciones
                {
                    destination: (req,file,cb)=>{
                                            //sive como ruta relativa/
                        const fullPath = join(CURRENT_DIR,destinationPath)
                        req.filePath = fullPath
                        cb(null, fullPath)//Call back
                    },//Hacia donde se guarda
                    filename:(req,file,cb)=>{
                        const fileExtension =extname(file.originalname)
                        const fileName = file.originalname.split(fileExtension)[0]
                        cb(null, `${fileName}-${Date.now()}-${fileExtension}`)//nombre del archivo-fecha en que se subio-.la extencion del archivo
                    }//Como se va  a llamar
                }
            ),
            fileFilter: (req,file, cb)=>{//Validaciones de extension
                if(MIMETYPES.includes(file.mimetype)) cb(null,true)
                else cb(new Error(`Only ${MIMETYPES.join(" ")} are allowed`))//Crear nuevo error
            },//Que cosas se pueden y no se pueden aceptar
            limits:{//Tamano maximo
                fileSize: MAX_SIZE
            }
        }
    )
}

export const uploadProfilePicture = multerConfig('../uploads/img/users')