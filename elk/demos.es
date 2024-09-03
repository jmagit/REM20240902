https://elastic:microservicios@localhost:9200

get /

get _cat/indices

get blogs/_mapping

put mi-blogs
{
        "mappings": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "author": {
                    "type": "keyword"
                },
                "category": {
                    "type": "keyword"
                },
                "content": {
                    "type": "text"
                },
                "locales": {
                    "type": "keyword"
                },
                "publish_date": {
                    "type": "date",
                    "format": "iso8601"
                },
                "seo_title": {
                    "type": "keyword"
                },
                "title": {
                    "type": "text"
                },
                "url": {
                    "type": "keyword"
                }
            }
        }
    }

put mi-blogs/_mapping
{
    "properties": {
        "tipo": {
            "type": "keyword"
        }
    }
}

get mi-blogs

GET blogs/_search?size=3
{
  "query": {
    "match": {
      "content": "Kibana 2018"
    }
  }
}

GET blogs/_doc/cP8-o5EBoBf42sC3miRT

post kk/_doc
{
    "id": 1,
    "nombre": "pepito"
}

get kk

post kk/_doc
{
    "id": 2,
    "apellidos": "Grillo"
}

post kk/_doc
{
    "id": 3,
    "nombre": "pepito grillo"
}

get kk/_search

get kk/_doc/1

get blogs/_mapping

GET blogs/_search

GET blogs/_search
{
  "query": {
    "wildcard": {
      "author": "*Ela*ic*"
    }
  }
}

