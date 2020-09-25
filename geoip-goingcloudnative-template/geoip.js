'use strict';
const maxmind = require('maxmind')

const cityDB = maxmind.open("dbs/GeoLite2-City.mmdb")
const ASNDB = maxmind.open("dbs/GeoLite2-ASN.mmdb")
const countryDB = maxmind.open("dbs/GeoLite2-Country.mmdb")

module.exports.get = async event => {
  const ip = event.requestContext.identity.sourceIp
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        city: await cityDB.then(lookup => lookup.get(ip)),
        asn: await ASNDB.then(lookup => lookup.get(ip)),
        country: await countryDB.then(lookup => lookup.get(ip)),
      }
    ),
  };
}