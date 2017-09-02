#!/usr/bin/env node

var fs = require('fs');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/worldvid_dev';
var parameterize = require('parameterize');
var client = new pg.Client(connectionString);
const Promise = require(`bluebird`);

client.connect();

var countries = [];

client.query('SELECT * FROM countries ORDER BY name', (err, res) => {
  countries = res.rows.map(r => {
    return {
      id: r.id.toString(),
      name: r.name,
      regionCode: r.region_code,
      slug: parameterize(r.name)
    };
  });

  var countriesArr = [];

  var p = new Promise((resolve, reject) => {
    countries.forEach((c, index) => {
      var id = c.id;

      client.query(
        'SELECT * FROM videos INNER JOIN countries_videos ON videos.id = countries_videos.video_id AND countries_videos.country_id = ' + id, (err, res) => {
          countriesArr.push(
            {
              id: c.id.toString(),
              name: c.name,
              regionCode: c.regionCode,
              slug: c.slug,
              videos: res.rows.map(r => {
                return {
                  id: r.id.toString(),
                  title: r.title,
                  thumbUrl: r.thumb_url,
                  description: r.description,
                  youtubeId: r.youtube_id,
                  viewCount: r.view_count,
                  category: r.category
                };
              })
            }
          );

          if (index === countries.length - 1) {
            resolve(countriesArr);
          }
        });
    });
  });

  p.then(res => {
    fs.writeFile('./data/countries.json', JSON.stringify(res), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('File created successfully.');
    });

    var data = `const countries = ${JSON.stringify(countries)}\nexport default countries;`;

    fs.writeFile('./data/countries-for-select.js', data, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('File created successfully.');

      client.end();
    });
  });
});
