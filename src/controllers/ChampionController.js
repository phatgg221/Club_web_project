import service from "@/models/Champions";
// const connectDB = require('@/lib/mongodb');
import ChampionsService from '@/services/championsService';
import Controller from "./Controller";

const championsService = new ChampionsService(new service().getInstance());

class ChampionController extends Controller{
    constructor(service){
        super(service);
    }

    async createChampion(req,res){
        let response= await championsService.createChampion(req.body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async getChamp(res){
        let response= await championsService.getChampions();
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async changeTeamOrder(id,body){
        let response = await championsService.changeTeamOrder(id,body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
    async updateChamp(id, body){
        let response = await championsService.updateChampion(id,body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
    async deleteChamp(id){
        let response= await championsService.deleteChampion(id);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
}

export default new ChampionController(championsService);