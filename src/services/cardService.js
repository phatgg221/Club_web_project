import Service from "./Service";
import ENUM from "../constant/enum";

class CardService extends Service{
    constructor(model){
        super(model);
    }


    async createCard(Card) {
        // if (!Card || !Card.organizer || !Card.logoURL || !Card.competitionName || !Card.location || !Card.imageURL || !Card.linkToWeb) {
        //   return {
        //     error: true,
        //     statusCode: 400,
        //     message: "Invalid request body. Please provide all required fields.",
        //   };
        // }
      
        try {
          return await this.insert({
            organizer: Card.organizer,
            logoURL: Card.logoURL,
            competitionName: Card.competitionName,
            location: Card.location,
            imageURL: Card.imageURL,
            competitionDate: Card.competitionDate,
            linkToWeb: Card.linkToWeb,
            competitionStatus: Card.competitionStatus,
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

    async getCardById(id){
      try{
        let cardData= await this.getById(id);

        let json={
          cardData: cardData,
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
  async updateCompetitionStatus() {
      try {
         const currentDate = new Date();
         currentDate.setHours(0, 0, 0, 0); 
     
         // Find competitions whose competitionDate is in the past
         const competitionsToUpdate = await this.model.find({
           competitionDate: { $lt: currentDate },
           competitionStatus: ENUM.competitionStatus.incoming,
         });
     
         // Update the competitionStatus of these competitions to 'past'
         await this.model.updateMany(
           { _id: { $in: competitionsToUpdate.map(c => c._id) } },
           { competitionStatus: ENUM.competitionStatus.past }
         );
     
         console.log(`Updated ${competitionsToUpdate.length} competitions to 'past'.`);
      } catch (error) {
         console.error("Error updating competition status:", error);
      }
     }
     
    async updateCard(id, Card) {
      try{
        let updateData = await this.update(id, {
          organizer: Card.organizer,
          logoURL: Card.logoURL,
          competitionName: Card.competitionName,
          location: Card.location,
          imageURL: Card.imageURL,
          competitionDate: Card.competitionDate,
          linkToWeb: Card.linkToWeb,
          competitionStatus: Card.competitionStatus
        });
        if(!updateData){
          throw new Error("Card not found");
        }

        return {
          updated_data: updateData,
          error: false,
          statusCode: 200,
        };
      }catch(errors){
        console.log(errors);
        return {
          error: true,
          statusCode: 500,
          errors: "Failed to update card",
        };
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