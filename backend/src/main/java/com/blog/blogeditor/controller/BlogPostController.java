package com.blog.blogeditor.controller;

import com.blog.blogeditor.entity.BlogPost;
import com.blog.blogeditor.repository.BlogPostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    public BlogPostController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    // --- Updated Get Method with Sorting & Filtering ---
    @GetMapping
    public List<BlogPost> getAllPosts(
            @RequestParam(required = false, defaultValue = "publishDate") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String filterType,
            @RequestParam(required = false) String filterValue) {

        // 1. Create Sort Object
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // 2. Apply Filter if Requested
        if (filterType != null && filterValue != null) {
            if ("author".equalsIgnoreCase(filterType)) {
                return blogPostRepository.findByAuthorContainingIgnoreCase(filterValue, sort);
            } else if ("status".equalsIgnoreCase(filterType)) {
                return blogPostRepository.findByStatus(filterValue, sort);
            }
        }

        // 3. Default: Return All with Sorting
        return blogPostRepository.findAll(sort);
    }

    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        return blogPostRepository.save(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        blogPostRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public BlogPost updatePost(@PathVariable Long id, @RequestBody BlogPost updatedPost) {

        BlogPost existingPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        existingPost.setAuthor(updatedPost.getAuthor());
        existingPost.setPublishDate(updatedPost.getPublishDate());
        existingPost.setStatus(updatedPost.getStatus());

        return blogPostRepository.save(existingPost);
    }
}