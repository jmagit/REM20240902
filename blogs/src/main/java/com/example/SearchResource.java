package com.example;

import java.util.List;
import java.util.Map;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.SearchTemplateQuery;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("blogs")
@Tag(name = "blog-search-controller")
public class SearchResource {

	private final ElasticsearchOperations operations;

	public SearchResource(ElasticsearchOperations operations) {
		this.operations = operations;
	}

	@GetMapping("/_doc/{id}")
	public Blog doc(@PathVariable String id) {
		return operations.get(id, Blog.class);
	}


	@GetMapping("/_search/{terms}")
	public List<SearchHit<Blog>> search(@PathVariable String terms, @ParameterObject Pageable pageable) {
		var query = NativeQuery.builder()
				.withQuery(q -> q
					.match(m -> m
						.field("content")
						.query(terms)
					)
				)
				.build();
		SearchHits<Blog> searchHits = operations.search(query, Blog.class);
		return searchHits.getSearchHits();
//		return SearchHitSupport.searchPageFor(searchHits, pageable);
	}

	@GetMapping("/_template/{terms}")
	public List<SearchHit<Blog>> _template(@PathVariable String terms, @ParameterObject Pageable pageable) {
		var query = SearchTemplateQuery.builder().withId("search-in-content-template")
				.withParams(Map.of("query_string", terms, "from", pageable.getOffset(), "size", pageable.getPageSize()))
				.build();
		SearchHits<Blog> searchHits = operations.search(query, Blog.class);
		return searchHits.getSearchHits();
//		return SearchHitSupport.searchPageFor(searchHits, pageable);
	}
}
