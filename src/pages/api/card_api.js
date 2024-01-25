const CardController= require ("@/controllers/CardController").default;


export default async function handler (req, res){
    const {method, query, body}= req;

    switch(method){
        case 'GET':
            return CardController.getCar(res);

        case 'POST':
            return CardController.createCard(req,res);

        case 'DELETE':
            return CardController.deleteCard(req, res);
        
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

