var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var app = express();
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-marsen.me-spiritlog
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = process.cwd() + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-marsen.me-spiritlog.json';
var SECRET_PATH = TOKEN_DIR + '.secret/client_secret.json';
/* GET index page. */
router.get('/', function (req, res, next) {
    var _this = this;
    try {
        var credentials = getCredentials();
        var clientSecret = credentials.web.client_secret;
        var clientId = credentials.web.client_id;
        var redirectUrl = credentials.web.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
        if (hasAuth()) {
            oauth2Client.credentials = getToken();
            getSpiritLog(oauth2Client)
                .then(function (result) {
                var data = [];
                result.values.forEach(function (e) {
                    data.push({
                        timestamp: new Date(e[0]),
                        date: new Date(e[0]).getHours() * 3600 + new Date(e[0]).getMinutes() * 60 + new Date(e[0]).getSeconds(),
                        close: e[1]
                    });
                }, _this);
                //console.log('data:'+data);
                res.render('spiritlog/index', { title: 'Spirit Log!!!!', data: JSON.stringify(data) });
            });
        }
        else {
            var authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            console.warn('Get new token from ' + authUrl);
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.writeHead(302, { Location: authUrl });
            res.end();
        }
    }
    catch (err) {
        console.log(err);
        res.render('spiritlog/index', { title: 'ERROR!!!' });
    }
});
router.get('/auth', function (req, res, next) {
    var code = req.query.code;
    console.log('Auth code:' + code);
    var credentials = getCredentials();
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = credentials.web.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.getToken(code, function (err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
    });
    res.render('spiritlog/auth', { title: 'auth' });
});
/** new functions **/
function getSpiritLog(auth) {
    //console.log(auth);
    var sheets = google.sheets('v4');
    var promise = new Promise(function (resolve, reject) {
        sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: '1i3b7sd1vFKGVtkyDnWZomBwbmuWIABGxreZv2anVzmQ',
            range: '\'Class Data\'!A2:100'
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            //console.log(response.values[0][0]);
            resolve(response);
        });
    });
    return promise;
}
function getCredentials() {
    try {
        var content = fs.readFileSync(SECRET_PATH);
        //console.log(content);
        var credentials = JSON.parse(content);
        return credentials;
    }
    catch (err) {
        throw 'Error loading client secret file: ' + err;
    }
}
function getToken() {
    var data = fs.readFileSync(TOKEN_PATH);
    return JSON.parse(data);
}
function hasAuth() {
    // Check Token And Expiry
    try {
        var data = fs.readFileSync(TOKEN_PATH);
        var token = JSON.parse(data);
        if (token.expiry_date > Date.now()) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}
/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    }
    catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}
/** functions **/
/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1i3b7sd1vFKGVtkyDnWZomBwbmuWIABGxreZv2anVzmQ/edit
 */
function listMajors(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: '1i3b7sd1vFKGVtkyDnWZomBwbmuWIABGxreZv2anVzmQ',
        range: '\'Class Data\'!A2:52'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var rows = response.values;
        if (rows.length == 0) {
            console.log('No data found.');
        }
        else {
            console.log('Name, Major:');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                // Print columns A and E, which correspond to indices 0 and 4.
                console.log('%s, %s', row[0], row[1]);
            }
        }
    });
}
/**/
module.exports = router;
