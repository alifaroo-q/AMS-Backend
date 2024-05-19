// import { diskStorage } from "multer";

// interface User {
//     id: number
// }

// export const defaultConfig = diskStorage({
//     destination: process.env.UPLOAD_LOCATION,
//     filename: (req: Request & { user: User }, file, cb) => {
//       const uid = req.user.id;
//       cb(null, `${uid}${path.extname(file.originalname)}`)
//     }
//   })
