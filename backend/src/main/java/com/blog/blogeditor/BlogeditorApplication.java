package com.blog.blogeditor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // <--- This is the key addition
public class BlogeditorApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogeditorApplication.class, args);
	}

}