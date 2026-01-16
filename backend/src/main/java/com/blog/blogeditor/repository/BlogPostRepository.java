package com.blog.blogeditor.repository;

import com.blog.blogeditor.entity.BlogPost;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    // Find posts where the author's name contains the search text (case insensitive)
    List<BlogPost> findByAuthorContainingIgnoreCase(String author, Sort sort);

    // Find posts by their specific status (e.g., "PUBLISHED")
    List<BlogPost> findByStatus(String status, Sort sort);
}