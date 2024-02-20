import Service from "./Service";

class TipsService extends Service{
    constructor(model){
        super(model);
    }

    async createTips(tips){
        return await this.insert({
            tipName: tips.tipName,
            tipsLink: tips.tipsLink,
            realContent: tips.realContent,
        });
    }

    async getSearchTips(query){
        try{
            let result = await this.getAllSearch(query);

            return{
                error: false,
                statusCode: 200,
                data: result,
            };
        }catch(errors){
            console.log(errors);
            return{
                error: true,
                statusCode:500,
                errors
            };
        }
    }


    async getTips(){
        try{
            let mongoData= (await this.getAll({})).data;

            let json={
                mongoData : mongoData,
            };

            return {
                error: false,
                statusCode: 200,
                data: json,
            };
        }catch(errors){
            console.log(errors);
            return{
                error: true,
                statusCode:500,
                errors,
            }
        }
    }

    async getTipsById(id){
        try{
            let sampleData = await this.getById(id);

            let json={
                sampleData : sampleData,
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


    async updateTip(id, tips){
        try{
            let reuslt = await this.update(id, {
                tipName: tips.tipName,
                tipsLink : tips.tipsLink,
                realContent: tips.realContent
            });


            if(!reuslt){
                throw new Error("Tips not found");
            }
            return {
                error: false,
                statusCode: 200,
                data: reuslt,
            }
        }catch(error){
            console.log(error);
            return{
                error:true,
                statusCode:500,
                error
            }
        }
    }

    async deleteTip(id){
        console.log(id);
        try{
            let deleteData= await this.delete(id);

            if(!deleteData){
                throw new Error ("Tip not found");
            }

            return {
                deleted_data: deleteData,
                error:false,
                statusCode: 200,
            };
        }catch(errors){
            console.log(errors);
            return{
                error: true,
                statusCode: 500,
                errors: "Falied to delete tip"
            };
        }
    }
}

export default TipsService;