#!/bin/bash
ps -ef |grep 'server.js' |awk '{print $2}'|xargs kill -9
~/chat/node_modules/forever/bin/forever stopall
~/chat/node_modules/forever/bin/forever start -a ~/chat/server.js
