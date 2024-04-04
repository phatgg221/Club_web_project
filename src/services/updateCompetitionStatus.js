const cron = require('node-cron');
const CardService = require('./cardService'); // Adjust the path to your CardService
const model= require('../models/Card');

cron.schedule('0 0 * * *', () => {
 const cardService = new CardService(model);
 cardService.updateCompetitionStatus();
});
