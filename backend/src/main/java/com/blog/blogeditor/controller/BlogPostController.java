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

    // 1. Get All Posts (With Sorting & Filtering)
    @GetMapping
    public List<BlogPost> getAllPosts(
            @RequestParam(required = false, defaultValue = "publishDate") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String filterType,
            @RequestParam(required = false) String filterValue) {

        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        if (filterType != null && filterValue != null) {
            if ("author".equalsIgnoreCase(filterType)) {
                return blogPostRepository.findByAuthorContainingIgnoreCase(filterValue, sort);
            } else if ("status".equalsIgnoreCase(filterType)) {
                return blogPostRepository.findByStatus(filterValue, sort);
            }
        }

        return blogPostRepository.findAll(sort);
    }

    // 2. Get Single Post (THIS WAS MISSING causing the 404 error)
    @GetMapping("/{id}")
    public BlogPost getPostById(@PathVariable Long id) {
        return blogPostRepository.findById(id).orElse(null);
    }

    // 3. Create Post
    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        return blogPostRepository.save(post);
    }

    // 4. Update Post
    @PutMapping("/{id}")
    public BlogPost updatePost(@PathVariable Long id, @RequestBody BlogPost post) {
        post.setId(id);
        return blogPostRepository.save(post);
    }

    // 5. Delete Post
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        blogPostRepository.deleteById(id);
    }
}