import service from "../../models/member";
import memberService from '../../services/memberService';


const MemberService = new memberService(new service().getInstance());


export default async function handler(req, res) {
    const { method, query, body } = req;

    switch (method) {
        case 'GET':
            return handleRequest(() => MemberService.getMember(), res);

        case 'POST':
            return handleRequest(() => MemberService.createMember(body), res);

        case 'PUT':

            return handleRequest(() => MemberService.updateMember(query.id, body), res);

        case 'DELETE':
            let obj = query;
            return handleRequest(() => MemberService.deleteMember(obj['']), res);

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