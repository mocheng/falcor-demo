//var falcor = require('falcor');

var $ref = falcor.Model.ref;

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/model.json'),
  cache: {

    locationsById: {
      1: {
        city: "Salt Lake City",
        state: "Utah"
      },
      2: {
        city: "Las Vegas",
        state: "Nevada"
      },
      3: {
        city: "Minneapolis",
        state: "Minnesota"
      },
      4: {
        city: "Walker Creek Ranch",
        state: "California"
      }
    },

    events: [
      {
        name: "ng-conf",
        description: "The worlds best Angular Conference",
        location: $ref('locationsById[1]')
      },
      {
        name: "React Rally",
        description: "Conference focusing on Facebook's React",
        location: $ref('locationsById[1]')
      },
      {
        name: "ng-Vegas",
        description: "Two days jam-packed with Angular goodness with a focus on Angular 2",
        location: $ref('locationsById[2]')
      },
      {
        name: "Midwest JS",
        description: "Midwest JS is a premier technology conference focused on the JavaScript ecosystem.",
        location: $ref('locationsById[3]')
      },
      {
        name: "NodeConf",
        description: "NodeConf is the longest running community driven conference for the Node community.",
        location: $ref('locationsById[4]')
      }
    ]
  }
});

model.set(falcor.pathValue(['events', 0, 'location', 'state'], 'CA'))
.then(function(res) {
  //document.getElementById('event-data').innerHTML = JSON.stringify(res, null, 2);
  //return;

  model.get([
    'events',
    {from: 0, to: 2},
    ['name', 'description'],
  ], [
    'events',
    {from: 0, to: 2},
    'location',
    ['city', 'state']
  ])
  .then(function(res) {
    document.getElementById('event-data').innerHTML = JSON.stringify(res, null, 2);
  });
})


