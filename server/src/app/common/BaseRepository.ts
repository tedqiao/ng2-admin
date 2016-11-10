
import * as mongoose from "mongoose";


class BaseRepository<T extends mongoose.Document> {

    public _model: mongoose.Model<mongoose.Document>;

    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
}

export = BaseRepository;
