module.exports = {
  siteMetadata: {
    title: `Minimum Viable Ceremonies`,
    description: `An agile process planning tool to keep you out of meetings and into getting stuff done`,
    author: `@gdpelican`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://ghost.minimal.cards`,
        contentApiKey: process.env.GHOST_API_KEY,
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: { postCssPlugins: [require('tailwindcss')()] },
    },
  ],
}
