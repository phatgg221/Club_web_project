import adminService from "../../services/adminService";
import service from "../../models/admin";

// Instantiate the AdminService with the singleton instance from the admin model
const AdminService = new adminService(new service().getInstance());

export default async function handler(req, res) {
    const { method, query, body } = req;

    try {
        switch (method) {
            case 'GET':
                // Retrieve admin data
                const adminData = await AdminService.getAdmin();
                return res.status(200).json(adminData);

            case 'POST':
                // Create a new admin entry
                const newAdmin = await AdminService.createAdmin(body);
                return res.status(201).json(newAdmin);

            case 'PUT':
                // Update an existing admin entry
                const updatedAdmin = await AdminService.updateAdmin(query.id, body);
                if (!updatedAdmin.error) {
                    return res.status(200).json(updatedAdmin);
                } else {
                    return res.status(404).json(updatedAdmin);
                }

            default:
                // Handle unsupported methods
                return res.status(405).json({ error: true, message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
}
