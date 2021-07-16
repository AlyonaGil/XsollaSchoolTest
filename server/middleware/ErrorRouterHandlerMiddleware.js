module.exports = function (req, res) {
    res.status(404);
    res.send({ error: 'Page was not found' });
};