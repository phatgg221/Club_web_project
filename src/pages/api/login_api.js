import MemberService from "../../services/memberService";
import service from "../../models/member";

// Initialize MemberService with a singleton instance
const userService = new MemberService(new service().getInstance());

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: true, message: `Method ${method} Not Allowed` });
  }

  if (!body || body.action !== 'login') {
    return res.status(400).json({ error: true, message: "Invalid action specified or missing data" });
  }

  try {
    const result = await userService.loginMember(body.username, body.password);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error('Error during request handling:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      details: error.message
    });
  }
}
