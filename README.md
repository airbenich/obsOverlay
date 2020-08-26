# OBS Overlay Software
A websocket based overlay software for showing lower-thirds in Open Broadcaster Studio via webview.



![Infographic on how to use this app](https://raw.githubusercontent.com/airbenich/obsOverlay/master/gfx/obsOverlay_gfx.png)

## To Use

To clone and run this repository you'll need to run these commands from your command line:

```bash
# Clone this repository
git clone https://github.com/airbenich/multiviewTouchControl
# Go into the repository
cd obsOverlay
# Go into the application like: overlay-server
cd overlay-server
# Install dependencies
npm install
# Run the app
npm start 
```

### Docker Compose

```bash
cp .env.example .env
```

edit settings in .env file

```bash
docker-compose up -d overlay-server
docker-compose up -d overlay-manager

docker-compose up overlay-remote
```
## Add overlay-screen to the OBS as Web View

Simply add `overlay-screen/index.html` as a new Source inside a Scene in OBS inside a Web View / Browser.
Make shure to add the following CSS into the Custom CSS Style of this source to get transparency.

```css
body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; background-image:none;}
```


## License

[GPL 3.0 (General Public Licence)](LICENSE.md)
