import service from "../../models/sample";
import SampleService from "../../services/sampleService";

const sampleService = new SampleService(new service().getInstance());

function handleApiRequest(req, res) {
    const { method, query, body } = req;

    switch (method) {
        case 'GET':
            if (query.id) {
                return handleRequest(() => sampleService.getSampleById(query.id), res);
            } else {
                return handleRequest(() => sampleService.getSample(), res);
            }

        case 'POST':
            return handleRequest(() => sampleService.createSample(body), res);

        case 'PUT':
            return handleRequest(() => sampleService.updateSample(query.id, body), res);

        case 'DELETE':
            return handleRequest(() => sampleService.deleteSample(query.id), res);

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