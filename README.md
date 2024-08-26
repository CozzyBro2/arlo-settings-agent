# arlo-settings-agent
A barebones solution which compliments (and depends on) [arlo-cam-api](https://github.com/brianschrameck/arlo-cam-api).

It works by making a post request to the `/arm` and `/quality` endpoints of the device API and changing them to a certain setting, every 30 seconds. This is helpful because `arlo-cam-api` currently (08/24) does not implement setting storage. Meaning, if a camera must reconnect to the API, it will be reprovisioned with the default settings.

# Install
You must set the `ASA_BASE_URL` environment variable for this to work. It will look something like: `http://192.168.1.30:5000`.
Currently, no other configurability options exist; you must edit the index.ts file with the appropriate device names. (`const devices`) You can also configure the `_config` variables with your desired settings.

------------------------

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```