import service from "../../models/asset";
import AssetService from "../../services/assetService";
import multer from "multer";
import fs from "fs";
import path from "path";

const assetService = new AssetService(new service().getInstance());

try {
  const folderName = "public/uploads";
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

const uploadFolder = path.resolve(__dirname, "../../public/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle multipart form data manually
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      upload.array("files")(req, res, function (err) {
        if (err) {
          return res.status(400).json({
            error: true,
            statusCode: 400,
            message: 'Bad Request',
          });
        } else {
          handleRequest(() => assetService.createAsset(req), res);
        }
      });
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleRequest(serviceFunction, res) {
  try {
    const result = await serviceFunction();
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: true,
      statusCode: 500,
      message: 'Internal Server Error',
    });
  } finally {

    if (!res.headersSent) {
      return res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}

