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

GET blogs/_search?size=10
{
  "query": {
    "match": {
      "content": "Kibana 2017"
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
    "match": {
      "content": "Welcome Kibana 2017"
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


GET blogs/_search
{
  "query": {
    "bool": {
        "must": [
            {"match": { "content": "Kibana 2018" }},
            {"wildcard": { "author": "J*" }}
        ]
    }
  }
}


GET blogs/_search
{
  "query": {
    "bool": {
        "should": [
            {"match": { "content": "Kibana 2018" }},
            {"match": { "category": "Kurrently" }},
            {"wildcard": { "author": "J*" }}
        ],
        "minimum_should_match": 2
    }
  }
}

GET blogs/_search
{
  "query": {
    "bool": {
        "filter": {"wildcard": { "author": "J*" }},
        "should": [
            {"match": { "content": "Kibana 2018" }},
            {"match": { "category": "Kurrently" }}         
        ],
        "minimum_should_match": 1
    }
  }
}

GET blogs/_search
{
  "query": {
    "term": {
      "author": "Jim Goodwin"
    }
  }
}

GET blogs/_search
{
  "query": {
    "term": {
      "author": {"value": "jim goodwin", "case_insensitive": true}
    }
  }
}

GET blogs/_search
{
  "query": {
    "fuzzy": {
      "author": {"value": "jimy goodwin", "fuzziness": 2}
    }
  }
}
GET blogs/_search
{
  "query": {
    "term": {
      "author": "Jim Goodwin"
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
    "match": {
      "content": {"query": "Kibana Welcome 2017", "operator": "AND" }
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
    "match_phrase": {
      "content": "Kibana related"
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
   "combined_fields" : {
      "query":      "Welcome",
      "fields":     [ "title", "content"]
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
    "query_string": {
      "query": "\"Kibana project\" && -2018",
      "default_field": "content"
    }
  }
}

GET blogs/_search?size=10
{
  "query": {
    "query_string": {
      "query": "content:(\"Kibana project\" && -2018) OR title:Kibana"
    }
  }
}

GET blogs/_search
{
  "query": {
    "term": {
      "author": "Jim Goodwin"
    }
  },
  "sort": [{"publish_date":{"order":"desc"}}, "url"]
}

GET blogs/_search
{
  "query": {
    "match": {
      "content": {"query": "Kibana 2017", "operator": "or" }
    }
  },
  "sort": [{"publish_date":{"order":"desc"}}, "_score"]
}

GET blogs/_search
{
    "fields": ["author","title","publish_date"],
    "_source": false,
    "query": {
        "match": {
            "content": {"query": "Kibana 2017", "operator": "or" }
        }
    },
    "sort": [{"publish_date":{"order":"desc"}}, "_score"],
    "from": 15,
    "size": 5
}

GET blogs/_search?from=0&size=5
{
    "fields": ["author","title","publish_date"],
    "_source": false,
    "query": {
        "match": {
            "content": {"query": "Kibana 2017", "operator": "or" }
        }
    },
    "sort": [{"publish_date":{"order":"desc"}}, "_score"]
}

GET blogs/_search?size=0
{
    "query": {
        "match": {
            "content": {"query": "Kibana 2017", "operator": "and" }
        }
    },
  "aggs": {
    "idiomas-poco-usados": { "rare_terms": { "field": "locales", "max_doc_count": 3 } },
    "cuenta-documentos-por-autor": { 
      "terms": { "field": "author" },
      "aggs": {
        "url_stats": { "string_stats": { "field": "url" } }
      } 
    } 
  } 
}

GET blogs/_search?size=100
{
    "query": {
        "match": {
            "content": {"query": "Kibana 2017", "operator": "or" }
        }
    },
    "collapse": { "field": "author"  }
}

GET blogs/_search?size=100
{
    "query": {
        "match": {
            "content": {"query": "Kibana 2017", "operator": "or" }
        }
    },
    "highlight": {
    "fields": {
      "title": {
        "pre_tags" : ["<mark>"], "post_tags" : ["</mark>"],
        "require_field_match": false
      },
      "content": {}
    }
  }

}
