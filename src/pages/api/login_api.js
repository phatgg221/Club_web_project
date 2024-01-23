import User from "@/services/memberService";
const userService = new User(new service().getInstance());


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
   