const ChampionController = require("@/controllers/ChampionController").default;

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      return ChampionController.getChamp(res);

    case 'POST':
      return ChampionController.createChampion(req, res);

    case 'DELETE':

      return handleRequest(() => ChampionController.deleteChamp(query.id), res);
    case 'PUT':
      if (query.teamOrder) {
        // Handle the teamOrder update
        return handleRequest(() => ChampionController.changeTeamOrder(query.id, query.teamOrder), res);
      } else {
        // Handle the regular update
        return handleRequest(() => ChampionController.updateChamp(query.id, body), res);
      }

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
