import Service from "./Service";


class CardService extends Service{
    constructor(model){
        super(model);
    }


    async createCard(Card) {
        if (!Card || !Card.organizer || !Card.logoURL || !Card.competitionName || !Card.location || !Card.imageURL || !Card.linkToWeb) {
          return {
            error: true,
            statusCode: 400,
            message: "Invalid request body. Please provide all required fields.",
          };
        }
      
        try {
          return await this.insert({
            organizer: Card.organizer,
            logoURL: Card.logoURL,
            competitionName: Card.competitionName,
            location: Card.location,
            imageURL: Card.imageURL,
            linkToWeb: Card.linkToWeb
          });
        } catch (error) {
          console.error(error);
          return {
            error: true,
            statusCode: 500,
            message: "Internal Server Error",
          };
        }
      }
      

    async getSearchCard(query){
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

    async getCard(){
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

    async deleteCard(id) {
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

export default CardService;