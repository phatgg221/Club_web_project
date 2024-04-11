import service from "../../models/tip";
import TipsService from "../../services/tipService";

const tipService = new TipsService(new service().getInstance());


function handleApiRequest(req, res) {
    const { method, query, body } = req;

    switch (method) {
        case 'GET':
            if (query.id) {
                return handleRequest(() => tipService.getTipsById(query.id), res);
            } else {
                return handleRequest(() => tipService.getTips(), res);
            }

        case 'POST':
            return handleRequest(() => tipService.createTips(body), res);
        case 'PUT':
            return handleRequest(() => tipService.updateTip(query.id, body), res);
        case 'DELETE':
            return handleRequest(() => tipService.deleteTip(query.id), res);

        default:
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
export default handleApiRequest;
