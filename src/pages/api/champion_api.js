const ChampionController = require("@/controllers/ChampionController").default;

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      return ChampionController.getChamp(res);

    case 'POST':
      return ChampionController.createChampion(req, res);

    case 'DELETE':
      return ChampionController.deleteChamp(req, res);

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
