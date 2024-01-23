
import Service from "./Service";
const bcrypt = require('bcryptjs');

class MemberService extends Service{
    constructor(model){
        super(model);
    }

    async loginMember(username, password){
        try{
            const user= await this.getOne({username});

            if(!user){
                throw new Error ("User not found");
            }

            const isMatch= await bcrypt.compare(password, user.password);

            if(!isMatch){
                throw new Error("Invalid credentials");
            }

            const payload= {
                user:{
                    id: user.id
                }
            };
            const token= jwt.sign (payload, process.env.JWT_SECRET, {expiresIn: 3600});

            return{
                error: false,
                statusCode: 200,
                data: {
                    token
            }
        };
        }catch(error){
            console.log(error);
            return {
                error: true,
                statusCode: 500,
                errors: error.message,
        };
    }

    }
    async createMember(Member){
        return await this.insert({
            username: Member.username,
            password: Member.password,
        })
    }
    async getSearchMember(query){
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

    async getMember(){
        try{
            let mongoData= (await this.getAll({})).data;

            let json={
                mongoData: mongoData,
            };
            return{
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

    async deleteMember(id){
        console.log(id);
        try{
            let deleteData= await this.delete(id);

            if(!deleteData){
                throw new Error("Event not found");
            }
            return {
                delete_data : deleteData,
                error: false,
                statusCode: 200,
            };
        }catch(errors){
            console.log(errors);
            return{
                error: true,
                statusCode: 500,
                errors: "Failed to delete member",
            }
        }
    }
}

export default MemberService;