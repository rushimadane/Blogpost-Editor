package com.blog.blogeditor.controller;

import com.blog.blogeditor.entity.BlogPost;
import com.blog.blogeditor.repository.BlogPostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    public BlogPostController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
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

    return blogPostRepository.save(existingPost);
}

}
