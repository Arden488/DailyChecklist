const Question = require('../models/question');

exports.getQuestions = (req, res) => {
  Question.find({}, (err, items) => {
    if (err) res.sendStatus(500);
    else res.status(200).send({ items });
  });
}

exports.deleteQuestion = (req, res) => {
  Question.remove({ _id: req.params.id }, (err, items) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(200)
  });
}

exports.updateQuestion = (req, res) => {
  const data = {
    title: req.body.title,
    repeat: req.body.repeat,
    type: req.body.type,
    value: req.body.value,
    options: {
      range: req.body.optionsRange,
      reverse: req.body.optionsReverse,
      badStartsOn: req.body.optionsBadStartsOn,
      goodStartsOn: req.body.optionsGoodStartsOn,
      values: req.body.optionsValues
    }
  }

  Question.findById(req.params.id, (err, item) => {
    Object.keys(data).forEach(el => {
      if (item[el] !== data[el])
        item[el] = data[el];
    });

    item.save(err => {
      if (err) res.sendStatus(500);
      else res.sendStatus(200)
    })
  });
}

exports.addQuestion = (req, res, next) => {
  const data = {
    title: req.body.title,
    repeat: req.body.repeat,
    type: req.body.type,
    value: req.body.value,
    options: {
      range: req.body.optionsRange,
      reverse: req.body.optionsReverse,
      badStartsOn: req.body.optionsBadStartsOn,
      goodStartsOn: req.body.optionsGoodStartsOn,
      values: req.body.optionsValues
    }
  }
  
  if (!data.title || !data.repeat || !data.type) {
    return res.status(422).send({ error: 'Some fields are missing' });
  }

  const question = new Question(data);

  question.save(err => {
    if (err) return next(err);
    else return res.status(200).json({
      success: true
    });

    // return next();
  });
};
