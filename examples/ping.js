var th = require('../index.js'),
    fs = require('fs');

var sleep = require('system-sleep')

th.load({id:"echo.json"}, function (e,mesh) {
  if (e) throw e;

  console.log("Mesh hashname : ", mesh.hashname);
  mesh.discover(true); // Allow discovery

  mesh.accept = function (from) { // When a machine tries to connect...
    console.log("Connection incoming :", from.hashname);
    var link = mesh.link(from); // Open a link with the machine

    link.on('status',function(up){ // If link is up...
      console.log("PING --", from.hashname);
      while(true) {
        sleep(1000);
        link.ping(function(err, latency){ // Ping the distant marchine
          // error if it failed
          if (err) return console.log(err);
          // latency is number of milliseconds if it succeeded (may be 0)
          console.log("PONG -- in", latency, "ms");
        });
      }

    });
  };

});
