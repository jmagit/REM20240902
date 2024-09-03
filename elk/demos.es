
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