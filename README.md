# Minimum Viable Marketing

The marketing site for the [Minimum Viable Ceremonies](https://github.com/minimum-viable-ceremonies/app) app.

It's written on the excellent [Gatsby](https://www.gatsbyjs.org/) framework.

###  🔧 **Developing.**

```shell
gatsby develop
```

###  🚀 **Building for production.**

```shell
gatsby build
```

### 💫 **Deploying.**

Pushing to the master branch of this repo will automatically publish to firebase:

```
https://minimal.cards/
```

### 👀 **Analytics**

In order to enable [Matomo](https://matomo.org/home/) for analytics in development (for example to test out some new analytics functionality), create an `.env.development` file, with the following values:

```shell
MATOMO_URL=https://stats.minimal.cards/piwik/
MATOMO_SITE_ID=3
```

To view the analytics coming through, visit [the analytics dashboard](https://stats.minimal.cards/piwik/index.php?module=CoreHome&action=index&idSite=1&period=day&date=yesterday#?idSite=3&period=day&date=yesterday&segment=&category=Dashboard_Dashboard&subcategory=1) and ensure you're viewing the `Minimum Viable Marketing (dev)` site.

### 📖 **Translating**

Visit our [Transifex page](https://www.transifex.com/babble/minimum-viable-ceremonies) to translate Minimum Viable Ceremonies into your language!
