
                   _ _          
                  (_) |         
     ___  ___ _ __ _| |__   ___ 
    / __|/ __| '__| | '_ \ / _ \
    \__ \ (__| |  | | |_) |  __/
    |___/\___|_|  |_|_.__/ \___|
                            
                            

[![NPM Version](https://nodei.co/npm/scribe.png?downloads=true)](https://npmjs.org/package/scribe)
[![Build Status](https://secure.travis-ci.org/belbis/scribe.png?branch=master)](http://travis-ci.org/belbis/scribe)
[![Coverage Status](https://coveralls.io/repos/belbis/scribe/badge.svg)](https://coveralls.io/r/belbis/scribe)
[![Dependency Status](https://gemnasium.com/belbis/scribe.svg)](https://gemnasium.com/belbis/scribe)

## Installing

To install the latest release with npm run:

```npm install scribe```

to install the development version from github run:

```npm install "git+https://github.com/belbis/multi-cache"```

## Introduction


## usage

stdout example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scriptura.Console();
logger.add(scr);
logger.log("shaken, not stirred.");
```

file example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scriptura.File();
logger.add(scr);
logger.log("shaken, not stirred.");
```

Amazon AWS SQS example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scriptura.SQS();
logger.add(scr);
logger.log("shaken, not stirred.");
```

## disclaimer

this project is currently in development

## future

expand scriptura, extend testing