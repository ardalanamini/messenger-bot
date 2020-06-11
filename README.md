# messenger-bot

<img alt="demo" src="./demo.gif" width="270" height="480">

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic](#basic)
    - [Docker](#docker)
    - [Tunneling](#tunneling)
- [Documents](#documents)
- [Tests](#tests)
    - [Coverage](#coverage)

### Installation

First install the dependencies:

```shell script
npm i
```

Then build the project:

```shell script
npm run build
```

In the end, specify the required environment variables from the Facebook developer panel:

```shell script
cp .env.example .env
```

- `BOT_ID`: The `App ID` from `Settings`->`Basic`
- `BOT_SECRET`: The `App Secret` from `Settings`->`Basic`
- `BOT_PAGE_ID`: The `Page ID` from `Messenger`->`Settings`->`Access Tokens`
- `BOT_PAGE_TOKEN`: The `Page Token` from `Messenger`->`Settings`->`Access Tokens`
- `BOT_VERIFY_TOKEN`: The `Verify Token` from `Messenger`->`Settings`->`Webhooks`

### Usage

#### Basic

```shell script
npm run start
```

#### Docker

```shell script
docker-compose up -d
```

Then use the following commands to be able to connect using application webhooks

```shell script
npm run tunnel
```

or using [ngrok](https://ngrok.com)

```shell script
ngrok http 3000
```

### Documents

```shell script
npm run document
```

After running the command, go to [http://localhost:8080](http://localhost:8080) on your preferred browser

### Tests

```shell script
npm test
```

#### Coverage

```shell script
npm run coverage
```
