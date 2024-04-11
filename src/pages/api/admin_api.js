import service from "../../models/admin";
import adminService from "../../services/adminService";
import { Admin } from "mongodb";

const AdminService = new adminService(new service().getInstance());

export default async function handler(req, res) {
    const { method, query, body } = req;

    switch (method) {
        case 'GET':
            return handleRequest(() => AdminService.getAdmin(), res);

        case 'POST':
            return handleRequest(() => AdminService.createAdmin(body), res);

        case 'PUT':
            return handleRequest(() => AdminService.updateAdmin(query.id, body), res);
        default:
    }
}


async function handleRequest(serviceFunction, res) {
    try {
        const result = await serviceFunction();
        return res.status(result.statusCode).json(result);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            error: true,
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
}