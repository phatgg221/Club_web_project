import service from "@/models/Card";
import CardService from "@/services/cardService";
import Controller from "./Controller";

const cardService= new CardService(new service().getInstance());

class CardController extends Controller{
    constructor(service){
        super(service);
    }

    async createCard(req,res){
        let response = await cardService.createCard(req.body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
    async getCar(res){
        let response = await cardService.getCard();
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async deleteCard(id){
        let response= await cardService.deleteCard(id);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
}
export default new CardController(cardService);