const Report = require('../models/report');

exports.getReports = (req, res) => {
  Report.find({}, (err, items) => {
    if (err) res.sendStatus(500);
    else res.status(200).send({ items });
  });
}

exports.getReport = (req, res) => {
  Report.findById(req.params.id, (err, item) => {
    if (err) res.sendStatus(500);
    else res.status(200).send(item);
  });
}

exports.deleteReport = (req, res) => {
  Report.remove({ _id: req.params.delete }, (err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(200)
  });
}

exports.updateReport = (req, res) => {
  const data = {
    // title: req.body.title,
  }

  Report.findById(req.params.id, (err, item) => {
    // Object.keys(data).forEach(el => {
    //   if (item[el] !== data[el])
    //     item[el] = data[el];
    // });

    item.save(err => {
      if (err) res.sendStatus(500);
      else res.sendStatus(200)
    })
  });
}

exports.createReport = (req, res, next) => {
  const data = {
    date: req.body.date,
    answers: []
  }

  req.body.answers.forEach(answer => {
    const answerData = {
      label: answer.label,
      fieldType: answer.type,
      value: answer.value,
      options: {}
    };

    if (answer.range)
      answerData.options.range = answer.range;

    if (answer.badEndsOn)
      answerData.options.badEndsOn = answer.badEndsOn;

    if (answer.goodStartsOn)
      answerData.options.goodStartsOn = answer.goodStartsOn;

    if (answer.values) {
      answerData.options.values = [];

      answer.values.forEach(value => {
        answerData.options.values.push({
          key: value.key,
          label: value.label,
          value: value.value
        })
      });
    }

    data.answers.push(answerData);
  });
  
  if (!data.date || (data.answers.length === 0)) {
    return res.status(422).send({ error: 'Some fields are missing' });
  }

  const report = new Report(data);

  report.save(err => {
    if (err) return next(err);
    else return res.sendStatus(200);

    // return next();
  });
};
