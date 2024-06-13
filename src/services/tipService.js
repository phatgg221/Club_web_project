import Service from "./Service";
import NodeCache from "node-cache";
const tipsCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class TipsService extends Service {
    constructor(model) {
        super(model);
    }

    async getTips() {
        try {
            let cacheKey = 'allTips';
            let cachedData = tipsCache.get(cacheKey);
            if (cachedData) {
                return {
                    error: false,
                    statusCode: 200,
                    data: cachedData,
                };
            }
            let mongoData = (await this.getAll({})).data;
            tipsCache.set(cacheKey, mongoData);
            return {
                error: false,
                statusCode: 200,
                data: { mongoData },
            };
        } catch (errors) {
            console.log(errors);
            return {
                error: true,
                statusCode: 500,
                errors,
            };
        }
    }
    async getTipsById(id) {
        try {
            let cacheKey = `tip-${id}`;
            let cachedData = tipsCache.get(cacheKey);
            if (cachedData) {
                return {
                    error: false,
                    statusCode: 200,
                    data: cachedData,
                };
            }
            let sampleData = await this.getById(id);
            tipsCache.set(cacheKey, sampleData);
            return {
                error: false,
                statusCode: 200,
                data: { sampleData },
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
                error,
            };
        }
    }

    async createTips(tips) {
        try {
            let result = await this.insert({
                tipName: tips.tipName,
                tipsLink: tips.tipsLink,
                realContent: tips.realContent,
            });
            return {
                error: false,
                statusCode: 200,
                data: result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
                error,
            };
        }
    }

    async updateTip(id, tips) {
        try {
            let result = await this.update(id, {
                tipName: tips.tipName,
                tipsLink: tips.tipsLink,
                realContent: tips.realContent,
            });
            if (!result) {
                throw new Error("Tip not found");
            }
            return {
                error: false,
                statusCode: 200,
                data: result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
                error,
            };
        }
    }

    async deleteTip(id) {
        try {
            let deleteData = await this.delete(id);
            if (!deleteData) {
                throw new Error("Tip not found");
            }
            return {
                deleted_data: deleteData,
                error: false,
                statusCode: 200,
            };
        } catch (errors) {
            console.log(errors);
            return {
                error: true,
                statusCode: 500,
                errors: "Failed to delete tip",
            };
        }
    }
}

export default TipsService;

