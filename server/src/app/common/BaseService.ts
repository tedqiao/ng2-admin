import Read = require("./interface/Read");
import Write = require("./interface/Write");

interface BaseService<T> extends Read<T>,Write<T> {
}

export = BaseService;
