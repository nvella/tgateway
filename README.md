# tgateway
tgateway is a reverse proxy for telnet servers, connecting a user from a 'front-end' (telnet server, dial-in modem, possibly SSH) to a back-end (telnet server, possibly SSH). In between all of this, tgateway will be able to provide menu systems, authentication, load balancing and more.

It is currently able to accept connections from telnet clients, display menus, and direct them to telnet servers. Dial-in clients and authentication are planned for the future.

## Possible uses

- Expose multiple telnet servers behind one address/port combination
- Provide authentication in front of telnet servers which don't provide it
- Expose telnet-only services (some BBSes) over a modem dial-in (PSTN)

## To-do

- [x] Basic framework
- [x] Telnet front-end (users will be able to connect via telnet)
- [x] Telnet back-end (users will be able to be directed to telnet servers running behind the proxy)
- [x] Simple menuing
- [ ] Dial-in front-end (users will be able to connect via dial-in modem)

## Glossary

- **end driver*: A library which allows tgateway to connect to an endpoint (backend) or receive connections from clients (frontend). Drivers can be initialized as many times as necessary (eg. multiple modems/telelphone lines)
