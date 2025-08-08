import {isValidObjectId} from "mongoose";

function checkId(req, res, next) {
    if(!isValidObjectId(req.params.id)) {
        const error = new Error(`Invalid id "${req.params.id}"`);
        res.status(404)
        return next(error);
    }
    next();
}
export default checkId;