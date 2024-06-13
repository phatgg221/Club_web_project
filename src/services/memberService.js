
import Service from "./Service";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');

class MemberService extends Service {
    constructor(model) {
        super(model);
    }

    async loginMember(username, password) {
        try {
            // Optimize database query with projection to fetch only necessary fields
            const user = await this.getOne({ username }, { projection: { password: 1, id: 1, isAdmin: 1 } });

            if (!user) {
                return { error: true, statusCode: 404, message: "User not found" };
            }

            // Password comparison to verify login credentials
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { error: true, statusCode: 401, message: "Invalid credentials" };
            }

            // Generate JWT token for authenticated user
            const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {
                error: false,
                statusCode: 200,
                data: { token, user: { id: user.id, isAdmin: user.isAdmin } }
            };
        } catch (error) {
            console.error('Login error:', error);
            return { error: true, statusCode: 500, message: 'Internal Server Error', details: error.message };
        }
    }
}

export default MemberService;
