var _ = require('underscore');

module.exports.list = function (mModel, req, res, next) {

    var searchQuery = !_.isUndefined(req.header('API-QUERY')) ? JSON.parse(req.header('API-QUERY')) : null;
    var limit = !_.isUndefined(req.header('API-LIMIT')) ? req.header('API-LIMIT') : null;
    var skip = !_.isUndefined(req.header('API-SKIP')) ? req.header('API-SKIP') : null;
    var sort = !_.isUndefined(req.header('API-SORT')) ? req.header('API-SORT') : null;

    limit = !_.isUndefined(req.param('API-LIMIT')) ? req.param('API-LIMIT') : null;
    skip = !_.isUndefined(req.param('API-SKIP')) ? req.param('API-SKIP') : null;
    sort = !_.isUndefined(req.param('API-SORT')) ? req.param('API-SORT') : null;
    var page = !_.isUndefined(req.param('API-PAGE')) ? req.param('API-PAGE') : null;


    if(mModel.loadQuery){
        var query =  mModel.loadQuery(searchQuery);
    }else{
        var query = mModel.find(searchQuery);
    }

    if (!_.isNull(limit)) query.limit(limit);
    if (!_.isNull(sort)) query.sort(sort);
    if(!_.isNull(page) && _.isNull(skip) && !_.isNull(limit)){
        skip = (page - 1) * limit;
    }
    if (!_.isNull(skip)) query.skip(skip);

    query.exec(function (err, records) {
        if (err) {
            res.send({
                result: 'error',
                message: err.toString()
            });
        } else {
            query.count(function (err, cnt) {
                res.send({
                    result: 'ok',
                    pagination: {
                        count: cnt,
                        limit: limit,
                        skip: skip,
                        sort: sort,
                        query: searchQuery
                    },
                    data: records
                });
            });
        }
    });

    return next;
};

module.exports.get = function (mModel, req, res, next) {
    var id = !_.isUndefined(req.params.id) ? req.params.id : null;

    if (mModel.load) {
        mModel.load(id, function (err, records) {

            if (err) {
                res.send({
                    result: 'error',
                    message: err.toString()
                });
            } else {
                res.send({
                    result: 'ok',
                    data: records
                });
            }
        });
    } else {
        mModel.findById(id, function (err, records) {

            if (err) {
                res.send({
                    result: 'error',
                    message: err.toString()
                });
            } else {
                res.send({
                    result: 'ok',
                    data: records
                });
            }
        });
    }

    return next;
};

/**
 * Do not provide the id property in the data. Only supply the id value at the end of the URL.
 *
 * @param mModel
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.put = function (mModel, req, res, next) {
    var id = !_.isUndefined(req.params.id) ? req.params.id : null;
    // Update only.
    if (id) {
        var data = req.body;
        delete data._id;

        if(mModel.updateMiddleWare){
            mModel.updateMiddleWare(data);
        }

        mModel.findByIdAndUpdate(id, {$set: data}, function (err, record) {
            if (err) {
                res.send({
                    result: 'error',
                    message: err.toString()
                });
            } else {
                res.send({
                    result: 'ok',
                    data: record,
                    message: 'Update complete'
                });
            }
        });
    }

    return next;
};
/**
 * Do not provide the id property in the data. Only supply the id value at the end of the URL.
 * @param mModel
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.post = function (mModel, req, res, next) {
    var id = !_.isUndefined(req.params.id) ? req.params.id : null;

    var data = req.body;
    if (id) {
        delete data._id;

        // Update
        mModel.findByIdAndUpdate(id, {$set: data}, function (err, record) {

            if (err) {
                res.send({
                    result: 'error',
                    message: err.toString()
                });
            } else {
                res.send({
                    result: 'ok',
                    data: record,
                    message: 'Update complete'
                });
            }
        });

    } else {
        // Create

        var newModel = new mModel(data);
        newModel.save(function (err, m) {

            if (err) {
                res.send({
                    result: 'error',
                    message: err.toString()
                });
            } else {
                res.send({
                    result: 'ok',
                    data: m,
                    message: 'Create',
                    err: err
                });
            }
        });
    }

    return next;
};

module.exports.del = function (mModel, req, res, next) {
    var id = !_.isUndefined(req.params.id) ? req.params.id : null;

    if (id) {
        // Delete
        mModel.findByIdAndRemove(id, function (err, record) {

            res.send({
                result: 'ok',
                message: 'Deleted.'
            });
        });
    }

    return next;
};

module.exports.setUpServer = function (server, routeURI, route) {
    server.get(routeURI, route.list);
    server.get(routeURI + '/:id', route.get);

    server.put(routeURI + '/:id', route.put);
    server.post(routeURI, route.post);
    server.post(routeURI + '/:id', route.post);
    server.del(routeURI + '/:id', route.del);
};