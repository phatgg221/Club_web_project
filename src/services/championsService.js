
import Service from "./Service";



class ChampionsService extends Service {
  constructor(model) {
    super(model);
  }


  async createChampion(Champions) {
    return await this.insert({
      teamName: Champions.teamName,
      competitionDescription: Champions.competitionDescription,
      awardDes: Champions.awardDes,
      images: Champions.images,
      teamOrder: Champions.teamOrder,
    });
  }

  async getSearchChampion(query) {
    try {
      let result = await this.getAllSearch(query);

      return {
        error: false,
        statusCode: 200,
        data: result,
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

  async getChampions() {
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

  async updateChampion(id, Champions) {
    try {
      let updateData = await this.update(id, {
        teamName: Champions.teamName,
        competitionDescription: Champions.competitionDescription,
        awardDes: Champions.awardDes,
        images: Champions.images,
        teamOrder: Champions.teamOrder,
      });
      if (!updateData) {
        throw new Error("Champion not found");
      }
      return {
        updated_data: updateData,
        error: false,
        statusCode: 200,
      };
    } catch (errors) {
      console.log(errors);
      return {
        error: true,
        statusCode: 500,
        errors: "Failed to update champion",
      };
    }
  }

  async changeTeamOrder(id, newOrder) {
    try {
      // Fetch the champion by ID
      const champion = await this.getById(id);

      if (!champion) {
        throw new Error('Champion not found');
      }

      // Update the teamOrder
      champion.teamOrder = newOrder;
      const updatedChampion = await this.update(id, champion);

      return {
        updated_data: updatedChampion,
        error: false,
        statusCode: 200,
      };
    } catch (errors) {
      console.log(errors);
      return {
        error: true,
        statusCode: 500,
        errors: "Failed to change team order",
      };
    }
  }

}



export default ChampionsService;

