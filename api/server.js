const Hapi = require('hapi');
const server = new Hapi.Server();
const printers = require('./printer-data.js');
const docs = require('./docs-data.js');
const corsHeaders = require('hapi-cors-headers');

server.connection({
  host: '0.0.0.0',
  port: +process.env.PORT || 8080,
});

server.route({
  method: 'GET',
  path: '/printers',
  handler: function(request, reply) {
    return reply(printers);
  }
});

server.route({
  method: 'GET',
  path: '/printers/active',
  handler: function(request, reply) {
    return reply(printers.filter(function(printer) {
      return printer.active;
    }));
  }
});

server.route({
  method: 'GET',
  path: '/printers/{id}',
  handler: function(request, reply) {
    return reply(printers.filter(function(printer) {
      return printer.id === parseInt(request.params.id);
    }));
  }
});

server.route({
  method: 'GET',
  path: '/docs',
  handler: function(request, reply) {
    return reply(docs);
  }
});

server.route({
  method: 'GET',
  path: '/docs/{name}/print',
  handler: function(request, reply) {
    const data = request.payload;
    docs.map(function(doc) {
      if (doc.filename === request.params.name) {
        doc.printed = true;
      }
    });
    reply(docs);
  }
});

server.start(function(error) {
  if (error) throw error;
  console.log('API server is running at: ', server.info.uri);
});

server.ext('onPreResponse', corsHeaders);
