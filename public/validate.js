const validate = (req, res) => {
    if(!req.body.lesson || req.body.lesson.length < 3){
        res
            .status(404)
            .send('ERROR');
        return;
    }
};
module.exports = validate;