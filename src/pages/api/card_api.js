import service from "../../models/Card";
import CardService from "../../services/cardService";


const cardService = new CardService(new service().getInstance());

export default async function handler(req, res) {
        const { method, query, body } = req;

        switch (method) {
                case 'GET':
                        if (query.id) {
                                return handleRequest(() => cardService.getCardById(query.id), res);
                        } else {
                                await cardService.updateCompetitionStatus();
                                return handleRequest(() => cardService.getCard(), res);
                        }

                case 'POST':
                        return handleRequest(() => cardService.createCard(body), res);

                case 'PUT':
                        return handleRequest(() => cardService.updateCard(query.id, body), res);
                case 'DELETE':
                        return handleRequest(() => cardService.deleteCard(query.id), res);

        }
}

async function handleRequest(serviceFunction, res) {
        try {
                const result = await serviceFunction();
                return res.status(result.statusCode).json(result);
        } catch (error) {
                console.error('Error:', error);
                return res.status(500).json({
                        error: true,
                        statusCode: 500,
                        message: 'Internal Server Error',
                });
        }
}