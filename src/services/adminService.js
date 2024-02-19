import Service from "./Service";


class AdminService extends Service{
    constructor(model){
        super(model);
    }


    async createAdmin(Admin){
        try{
            return await this.insert({
                adminUsername: Admin.adminUsername,
                adminPassword: Admin.adminPassword
            });
        }catch (error){
            console.log(error);
            return{
                error:true, 
                statusCode: 500,
                message: "Interal Server Error",
            };
        }
    }

    async getAdmin(){
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

    async updateAdmin(id, Admin){
        try{
            let updateData= await this.update(id, {
                adminUsername: Admin.adminUsername,
                adminPassword: Admin.adminPassword
            });
            if(!updateData){
                throw new Error("Admin not found");
            }

            return{
                updated_data: updateData,
                error: false,
                statusCode: 200,
            };
        }catch(errors){
            console.log(errors);
            return {
                error:true,
                statusCode: 500,
                errors: "Failed to update admin"
            };
        }
    }
}

export default AdminService;