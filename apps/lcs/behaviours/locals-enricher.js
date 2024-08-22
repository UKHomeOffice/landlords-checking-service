module.exports = superclass => class extends superclass {
    getErrorMessage(error, req, res) {
        const locals = {};
        const valuesEnriched = req.sessionModel.get('valuesEnriched');
        
        if (valuesEnriched && Object.keys(valuesEnriched).length > 0) {
            locals.valuesEnriched = valuesEnriched;

            Object.assign(res.locals, locals);
        }
        return super.getErrorMessage(error, req, res);
    }
};