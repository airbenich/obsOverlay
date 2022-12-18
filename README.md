# OBS Overlay Software
A websocket based overlay software for showing lower-thirds in Open Broadcaster Studio via webview.



![Overlay Manager Screenshot](https://raw.githubusercontent.com/airbenich/obsOverlay/master/gfx/obsOverlay_gfx-splash.png)
![Infographic on how to use this app](https://raw.githubusercontent.com/airbenich/obsOverlay/master/gfx/obsOverlay_gfx.png)

## Features

- Instant sync on your network
- Your Library & Favorites
- Quick access on pinned
- Protect and Cleanup
- Search as you type
- Drag'n'Drop sorting
- Export and Import datasets
- Automatic Timer
- Build own Themes with maximum flexibility

More Infos & Graphics on [Project Site](https://overlaymanager.erbenich.eu).

## Setup Instruction

To clone and run this repository you'll need to run these commands from your command line:

```bash
# Clone this repository
git clone https://github.com/airbenich/obsOverlay.git
# Go into the repository
cd obsOverlay
# Go into the application: overlay-manager
cd overlay-manager
# Install dependencies
npm install
# Run the server app
npm start 

# Go into the application: overlay-server
cd overlay-server
# Install dependencies
npm install
# Run the manager gui app
npm start 
```

### Docker Compose

```bash
cp .env-example .env
```

edit settings in .env file


#### Development

```bash
docker-compose -f docker-compose-dev.yml up overlay-server
docker-compose -f docker-compose-dev.yml up overlay-manager
docker-compose -f docker-compose-dev.yml up --build overlay-screen
```

#### Production

build

```bash
docker-compose -f docker-compose-build.yml up
```
run

```bash
docker-compose up -d overlay-server
docker-compose up -d overlay-screen
docker-compose up -d overlay-manager
```
## Add overlay-screen to the OBS as Web View

Simply add `overlay-screen/index.html` as a new Source inside a Scene in OBS inside a Web View / Browser.
Make shure to add the following CSS into the Custom CSS Style of this source to get transparency.

```css
body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; background-image:none;}
```


## License

[GPL 3.0 (General Public Licence)](LICENSE.md)
