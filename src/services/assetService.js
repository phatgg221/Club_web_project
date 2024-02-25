require("dotenv").config();
const fs= require("fs");
const cloudinary= require("cloudinary");
const Service = require("./Service");


const cloudName= process.env.CLOUD_NAME;
const apiKey= process.env.API_KEY;
const apiSecret= process.env.API_SECRET;


class Asset extends Service{
    constructor(model){
        super(model);
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });
    }

    processFile(filePath) {
        // Delete the uploaded file once it has been processed
        fs.unlinkSync(filePath);
      }


      async createAsset(req) {
        console.log(req.files); 
        console.log(req.query.assetType); 
        console.log(req);
        let files = req.files;
        let assetType = req.query.assetType;
        if (files.length ===  0){
          return {
            error: true,
            statusCode:  500,
            error: "Not found files in form",
          };
        }
        try {
          let datas = [];
          for (let f =  0; f < files.length; f +=  1) {
            let result;
            const file = files[f];
            
            // Check the file type and upload accordingly
            if (file.mimetype === 'application/pdf') {
              // Upload the PDF file as a raw file
              result = await cloudinary.v2.uploader.upload(file.path, {
                resource_type: 'raw'
              });
            } else {
              // Upload other file types normally
              result = await cloudinary.v2.uploader.upload(file.path);
            }
      
            this.processFile(file.path);
      
            const data = {
              url: result.url,
              name: result.original_filename,
              assetType: assetType,
            };
      
            // Insert the document one by one
            await this.model.collection.insertOne(data);
      
            datas.push(data);
          }
      
          return {
            error: false,
            data: datas,
          };
        } catch (errors) {
          console.log(errors);
          return {
            error: true,
            statusCode:  500,
            errors,
          };
        }
      }
      
}


module.exports = Asset;