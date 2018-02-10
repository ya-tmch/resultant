const request = require('request')

const buffer = {
    time: null,
    data: null
}

const getFromBuffer = () => {
    if (buffer.time && (Date.now() - buffer.time) < 5000) {
        return buffer.data
    }

    return false
}

const putToBuffer = (data) => {
    buffer.time = Date.now()
    buffer.data = data

    return data
}

module.exports.getMiddleware = () => (req, res, err) => {

    if (getFromBuffer()) {
        return res.send(getFromBuffer())
    }

    request.get('http://phisix-api3.appspot.com/stocks.json', (e, response, body) => {
        if (e) {
            return err(e)
        }

        if (response.statusCode !== 200) {
            return err(response.statusMessage)
        }

        try {
            res.send(putToBuffer(JSON.parse(body).stock))
        } catch (e) {
            return err(e)
        }
    })
}