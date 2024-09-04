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

delete mi-blogs

get mi-blogs/_mapping

put mi-blogs/_mapping
{
    "properties": {
        "tipo": {
            "type": "keyword"
        }
    }
}

get mi-blogs/_mapping/field/tipo

get mi-blogs

put mi-blogs/_mapping
{
    "runtime": {
      "day_of_week": {
        "type": "keyword",
        "script": {
          "source": "emit(doc['publish_date'].value.dayOfWeekEnum.getDisplayName(TextStyle.FULL, Locale.ROOT))"
        }
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

GET blogs/_search?size=3
{
  "query": {
    "match": {
      "content": "Kibana 2018"
    }
  }
}

GET blogs/_search
{
  "query": {
    "wildcard": {
      "author": "*Ela*ic*"
    }
  }
}

GET blogs/_search
{
  "runtime_mappings": {
    "day_of_week": {
      "type": "keyword",
      "script": {
        "source": "emit(doc['@timestamp'].value.dayOfWeekEnum.getDisplayName(TextStyle.FULL, Locale.ROOT))"
      }
    }
  },
    "fields": ["author","title","day_of_week"]
}




