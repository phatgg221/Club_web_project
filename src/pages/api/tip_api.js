import service from "../../models/tip";
import TipsService from "../../services/tipService";

const tipService = new TipsService(new service().getInstance());

async function handleRequest(serviceFunction, res) {
    try {
        const result = await serviceFunction();
        return res.status(result.statusCode).json(result);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: true,
            statusCode: 500,
            message: 'Internal Server Error, operation terminated to prevent timeout',
        });
    }
}
export default handleApiRequest;
