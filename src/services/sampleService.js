import Service from "./Service";

class SampleService extends Service {
    constructor(model){
        super(model);
    }

    async createSample(Sample){
        return await this.insert({
            sampleName: Sample.sampleName,
            sampleContents: Sample.sampleContents,
            sampleAuthor: Sample.sampleAuthor,
            sampleLink: Sample.sampleLink
        });
    }

    async getSearchSample(query){
        try{
            let result= await this.getAllSearch(query);

            return{
                error: false,
                statusCode: 200,
                data: result,
            };
        }catch(errors){
            console.log(errors);
            return {
                error: true, 
                statusCode:500,
                errors
            };
        }
    }

    async getSample(){
        try{
            let mongoData= (await this.getAll({})).data;

            let json={
                mongoData: mongoData,
            };
            return {
                error: false,
                statusCode: 200,
                data: json,
            };
        }catch(errors){
            console.log(errors);
            return {
                error:true,
                statusCode: 500,
                errors,
            }
        }
    }

    async getSampleById(id){
      try{
        let sampleData= await this.getById(id);

        let json={
          sampleData: sampleData,
        };
        return {
          error: false,
          statusCode: 200,
          data: json,
        };
      }catch(error){
        console.log(error);
        return {
          error: true,
          statusCode: 500,
          error,
        }
      }
    }

    async updateSample(id, sample){
        try{
            let result= await this.update(id, {
                sampleName: sample.sampleName,
                sampleContents: sample.sampleContents,
                sampleAuthor: sample.sampleAuthor,
                sampleLink: sample.sampleLink
            });

            if(!result){
                throw new Error("Card not found");
              }
            return{
                error: false,
                statusCode: 200,
                data: result,
            };
        }catch(errors){
            console.log(errors);
            return {
                error: true, 
                statusCode:500,
                errors
            };
        }
    }

    async deleteSample(id){
        console.log(id);
        try {
          let deleteData = await this.delete(id);
          if (!deleteData) {
            throw new Error("Event not found");
          }
          return {
            deleted_data: deleteData,
            error: false,
            statusCode: 200,
          };
        } catch (errors) {
          console.log(errors);
          return {
            error: true,
            statusCode: 500,
            errors: "Failed to delete card",
          };
        }
      }
    
}
export default SampleService;