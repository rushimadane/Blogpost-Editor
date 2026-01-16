package com.blog.blogeditor.service;

import com.blog.blogeditor.entity.BlogPost;
import com.blog.blogeditor.repository.BlogPostRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostSchedulerService {

    private final BlogPostRepository blogPostRepository;

    public PostSchedulerService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    // Runs every minute to check for posts that need publishing
    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void publishScheduledPosts() {
        LocalDateTime now = LocalDateTime.now();

        // Fetch all posts and filter for those that are SCHEDULED and past their due date
        List<BlogPost> postsToPublish = blogPostRepository.findAll().stream()
                .filter(p -> "SCHEDULED".equals(p.getStatus()))
                .filter(p -> p.getPublishDate() != null && p.getPublishDate().isBefore(now))
                .collect(Collectors.toList());

        if (!postsToPublish.isEmpty()) {
            postsToPublish.forEach(post -> {
                post.setStatus("PUBLISHED");
                System.out.println("Auto-publishing post: " + post.getTitle());
            });
            
            blogPostRepository.saveAll(postsToPublish);
        }
    }
}