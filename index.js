import app from './app'
import { defaultPort, listeningMsg } from './config/config.json'

const port = process.env.PORT || defaultPort

app.listen(port, () => console.log(`${listeningMsg} ${port}!`))
