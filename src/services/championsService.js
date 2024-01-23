
import Service from "./Service";



class ChampionsService extends Service{
    constructor(model) {
        super(model);
      }

      
      async createChampion(Champions){
            return await this.insert({
                teamName: Champions.teamName,
                competitionDescription: Champions.competitionDescription,
                awardDes: Champions.awardDes,
                image: Champions.image
            });
      }

      async getSearchChampion(query){
        try{
            let result= await this.getAllSearch(query);

            return {
                error: false,
                statusCode: 200,
                data: result,
            };
        }catch( errors){
            console.log(errors);
            return {
                error: true,
                statusCode: 500,
                errors,
      };
        }
      }

      async getChampions(){
        try {
            let mongoData = (await this.getAll({})).data;
      
            let json = {
              mongoData: mongoData,
            };
            return {
              error: false,
              statusCode: 200,
              data: json,
            };
          } catch (errors) {
            console.log(errors);
            return {
              error: true,
              statusCode: 500,
              errors,
            };
          }
      }

      async deleteChampion(id) {
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
            errors: "Failed to delete event",
          };
        }
      }
}

export default ChampionsService;

