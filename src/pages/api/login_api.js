import MemberService from "../../services/memberService";
import service from "../../models/member";

// Initialize MemberService with a singleton instance
const userService = new MemberService(new service().getInstance());

export default async function handler(req, res) {
  const { method, body } = req;

  try {
    switch (method) {
      case 'POST':
        if (body.action === 'login') {
          const result = await userService.loginMember(body.username, body.password);
          res.status(result.statusCode).json(result);
        } else {
          // Handle other POST actions or return a default message
          res.status(400).json({ error: true, message: "Invalid action specified" });
        }
        break;

      default:
        res.status(405).json({ error: true, message: `Method ${method} Not Allowed` });
        break;
    }
  } catch (error) {
    console.error('Error during request handling:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      details: error.message
    });
  }
}
