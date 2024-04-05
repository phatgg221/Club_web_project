
import service from "../../models/Champions";
// const connectDB = require('@/lib/mongodb');
import ChampionsService from '../../services/championsService';

// connectDB();
const championsService = new ChampionsService(new service().getInstance());

export default async function handler(req, res) {
        const { method, body, query } = req;

        switch (method) {
                case 'GET':
                        return handleRequest(() => championsService.getChampions(), res);

                case 'POST':
                        return handleRequest(() => championsService.createChampion(body), res);

                case 'DELETE':
                        return handleRequest(() => championsService.deleteChampion(query.id), res);
                case 'PUT':
                        if (query.teamOrder) {
                                // Handle the teamOrder update
                                return handleRequest(() => championsService.changeTeamOrder(query.id, query.teamOrder), res);
                        } else {
                                // Handle the regular update
                                return handleRequest(() => championsService.updateChampion(query.id, body), res);
                        }
                default:
                        res.status(405).end(`Method ${method} Not Allowed`);
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
