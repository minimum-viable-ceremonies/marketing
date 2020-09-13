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

This site uses [Notion](https://notion.so) as a blogging platform, pulling in articles given in a certain list view.

In order to pull in the articles from Notion, you'll need to find the collection id and the collection view id for a table via the Notion API, and populate the following environment variables:

```shell
NOTION_COLLECTION_ID="<collection_id>"
NOTION_COLLECTION_VIEW="<collection_view_id>"
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
