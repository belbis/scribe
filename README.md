
a stream logging module for node.js
                   _ _          
                  (_) |         
     ___  ___ _ __ _| |__   ___ 
    / __|/ __| '__| | '_ \ / _ \
    \__ \ (__| |  | | |_) |  __/
    |___/\___|_|  |_|_.__/ \___|
                            
                            

[![NPM Version](https://nodei.co/npm/node-scribe.png?downloads=true)](https://npmjs.org/package/node-scribe)
[![Build Status](https://secure.travis-ci.org/belbis/scribe.png?branch=master)](http://travis-ci.org/belbis/scribe)
[![Coverage Status](https://coveralls.io/repos/belbis/scribe/badge.svg)](https://coveralls.io/r/belbis/scribe)
[![Dependency Status](https://gemnasium.com/belbis/scribe.svg)](https://gemnasium.com/belbis/scribe)

## Installing

To install the latest release with npm run:

```npm install scribe```

to install the development version from github run:

```npm install "git+https://github.com/belbis/scribe"```

## Introduction

Scribe is a logging library for node.js that utilizes writeStreams. 

## Scripta

Scripta is just plural of Scriptum which are the writeStreams implemented for Scribe. Currently these scripta are supported:

* SQS - AWS SQS scriptum write stream
* Stream - generic write scriptum stream scripta
* File - stream scriptum that writes to file
* STDOut - stream scriptum that writes to stdout

## usage

stdout example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scripta.STDOut({addNewLine: true});
logger.open();
logger.add(scr);
logger.log("shaken, not stirred.");
logger.close();
```

file example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scripta.File({addNewLine: true});
logger.open();
logger.add(scr);
logger.log("shaken, not stirred.");
logger.close();
```

AWS SQS example:
```javascript
var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scripta.SQS();
logger.open();
logger.add(scr);
logger.log("shaken, not stirred.");
```

## disclaimer

this project is currently in development

## future

allow for read as duplex stream?