const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
      {
        allCountriesJson(limit: 1000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          reject(new Error(result.errors));
        }

        const videos = path.resolve(`src/templates/country-page.js`);
        const stats = path.resolve(`src/templates/country-stats-page.js`);
        _.each(result.data.allCountriesJson.edges, edge => {
          createPage({
            path: `/countries/${edge.node.slug}/videos`,
            component: slash(videos),
            context: {slug: edge.node.slug}
          });

          createPage({
            path: `/countries/${edge.node.slug}/stats/`,
            component: slash(stats),
            context: {slug: edge.node.slug}
          });
        });

        return;
      })
    );
  });
};
