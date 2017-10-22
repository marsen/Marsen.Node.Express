//nightwatch.conf.js
var seleniumServer = require('selenium-server')
//var phantomjs = require('phantomjs-prebuilt')
var chromedriver = require('chromedriver')
var nightwatchCucumber = require('nightwatch-cucumber')

var nightwatchCucumberConf = {
  runner: 'nightwatch',
  featureFiles: 'features',
  stepDefinitions: 'features',
  closeSession: 'afterFeature'
}

module.exports = {
    "src_folders": [nightwatchCucumber(nightwatchCucumberConf)],
    "output_folder": "reports",
    "custom_commands_path": "",
    "custom_assertions_path": "",
    "page_objects_path": "",
    "globals_path": "",

    "selenium": {
        "start_process": true,
        "server_path": seleniumServer.path,
        "log_path": "",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": "",
            "webdriver.ie.driver": ""
        }
    },

    "test_settings": {
        "default": {
            "launch_url": "http://localhost",
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "silent": true,
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "desiredCapabilities": {
                "browserName": "firefox",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },

        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        }
    }
}
