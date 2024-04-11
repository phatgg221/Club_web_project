import MemberService from "../../services/memberService";
import service from "../../models/member";
const userService = new MemberService(new service().getInstance());


export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      // Handle GET request
      break;

    case 'POST':
      if (body.action === 'login') {
        return handleRequest(() => userService.loginMember(body.username, body.password), res);
      } else {
        // Handle other POST requests
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
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