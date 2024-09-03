https://elastic:microservicios@localhost:9200

get /

get _cat/indices

get blogs/_mapping

GET blogs/_search
{
  "query": {
    "match": {
      "content": "Kibana 2018"
    }
  }
}

GET blogs/_doc/cP8-o5EBoBf42sC3miRT
