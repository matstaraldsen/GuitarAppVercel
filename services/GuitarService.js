class GuitarService {
	constructor(db) {
		this.client = db.sequelize;
		this.Guitar = db.Guitar;
		this.Color = db.Color;
		this.Make = db.Make;
		this.Model = db.Model;
	}

	async create(year, price, brandId, modelId, colorId) {
		return this.Guitar.create({
			Year: year,
			Price: price,
			BrandId: brandId,
			ModelId: modelId,
			ColorId: colorId,
		});
	}

	async get() {
		return this.Guitar.findAll({
			where: {},
		});
	}

	async getGuitarDetails(guitarId) {
		const guitar = await this.Guitar.findOne({
			where: {
				id: guitarId,
			},
		});
		return guitar;
	}

	async deleteGuitar(guitarId) {
		try {
		  const result = await this.Guitar.destroy({
			where: { id: guitarId }
		  });
		  return result > 0; // Returns true if a record was deleted, false otherwise
		} catch (error) {
		  console.error("Error deleting guitar:", error);
		  throw new Error("Could not delete the guitar");
		}
	}

}
module.exports = GuitarService;
