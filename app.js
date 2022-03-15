let createError = require('http-errors');
let express = require('express');
const mysql = require('mysql');
const { Server } = require('socket.io');
let path = require('path');
let cookieParser = require('cookie-parser');
let favicon = require('serve-favicon');
let logger = require('morgan');
let app = express();
let game = require('./managers/game').Game;
const http = require('http');
const server = http.createServer(app);
const title = "DummyWar";
const port = 7780;
const io = new Server(server);
// const con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'dummywar'
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// gets

app.post('/joinGame', function (req, res) {
    if (req.body && req.body.nickname) {
        if (/^[a-zA-Z0-9_]*$/.test(req.body.nickname)) {
            res.cookie('gameNickname', req.body.nickname, { maxAge: 900000 });
            res.render('game.ejs', { title: title, result: { success: true, msg: `Joined to the game as ${req.body.nickname}`, nickname: req.body.nickname } })
        } else {
            res.render('index', { title: title, result: { success: false, msg: "Nickname can only contain a-Z, numbers and '_'." } });
        }
    } else {
        res.render('index', { title: title, result: { success: false, msg: false } });
    }
})

app.get('/joinGame', function (req, res) {
    if (req.cookies && req.cookies['gameNickname']) {
        if (/^[a-zA-Z0-9_]*$/.test(req.cookies['gameNickname'])) {
            res.render('game.ejs', { title: title, result: { success: true, msg: false, nickname: req.cookies['gameNickname'] } })
        } else {
            res.render('index', { title: title, result: { success: false, msg: false } })
        }
    } else {
        res.render('index', { title: title, result: { success: false, msg: false } })
    }

})

app.get('/', function (req, res, next) {
    res.render('index', { title: title, result: { success: true, msg: false } });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Sockets

io.on('connection', (socket) => {
    console.log('someone connected.');
    socket.on('disconnect', () => {
        game.removePlayer(socket.id);
        console.log('someone disconnected');
    });
    socket.on('join', (nickname) => {
        game.newPlayer(nickname, socket.id);
    });
    socket.on('occupyCell', (result) => {
        game.occupyCell(game.players[socket.id].color, result.x, result.y);
        io.emit('status', game.getStatus());
    })
    socket.on('getStatus', () => {
       socket.emit('status', game.getStatus());
    });
})

// con.connect((err) => {
//     if (err) {
//         console.error('error connecting:', err.stack);
//         return;
//     }
//     console.log('connected as id: '+con.threadId);
//     server.listen(port, '0.0.0.0', () => {
//         console.log(`Node server running on ${port}`);
//         game.beginGame(10,10);
//     });
// })
server.listen(port, '0.0.0.0', () => {
    console.log(`Node server running on ${port}`);
    game.beginGame(10,10);
});