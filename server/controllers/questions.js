const Question = require('../models/question');

exports.getQuestions = (req, res) => {
  Question.find({}, (err, items) => {
    if (err) res.sendStatus(500);
    else res.send({ items });
  });
}

exports.addQuestion = (req, res, next) => {
  const title = req.body.title;
  const repeat = req.body.repeat;
  const type = req.body.type;
  const value = req.body.value;
  const optionsRange = req.body.optionsRange;
  const optionsReverse = req.body.optionsReverse;
  const optionsBadStartsOn = req.body.optionsBadStartsOn;
  const optionsNormalStartsOn = req.body.optionsNormalStartsOn;
  const optionsValues = req.body.optionsValues;
  
  if (!title || !repeat || !type) {
    return res.status(422).send({ error: 'Some fields are missing' });
  }

  const question = new Question({
    title,
    repeat,
    type,
    value,
    options: {
      range: optionsRange,
      reverse: optionsReverse,
      badStartsOn: optionsBadStartsOn,
      normalStartsOn: optionsNormalStartsOn,
      values: optionsValues
    }
  });

  question.save(err => {
    if (err) return next(err);
    else return res.status(200).json({
      success: true
    });

    // return next();
  });
};
