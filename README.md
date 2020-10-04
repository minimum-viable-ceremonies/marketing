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

### ✍🏻 **Populating blog content**

This site uses [Ghost](https://ghost.org) as a blogging platform, pulling in articles given in a certain list view.

Our ghost content is hosted at [https://ghost.minimal.cards](https://ghost.minimal.cards)

In order to pull in the articles from Ghost, you'll need to supply a content API token:

```shell
GHOST_API_KEY="<token_id>"
```

Running `gatsby develop` will automatically pull in any new blog content.
Note that in order to update existing articles, you'll need to run `gatsby clean` beforehand ✌️

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

### 💬 **LiveChat**

To view the [Freshchat](https://www.freshworks.com/live-chat-software/) widget, put the following into an `.env.development` file:

```shell
FRESHCHAT_TOKEN=<API_TOKEN>
FRESHCHAT_HOST=https://wchat.au.freshchat.com
```

### 📖 **Translating**

Visit our [translation page](https://translate.minimal.cards) to translate Minimum Viable Ceremonies into your language!

In order to publish or sync translations, you'll need to set an API key for Crowdin:
```shell
CROWDIN_API_KEY=<API_TOKEN>
```
