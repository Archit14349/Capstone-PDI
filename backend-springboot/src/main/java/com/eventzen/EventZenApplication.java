package com.eventzen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventZenApplication {
	public static void main(String[] args) {
		SpringApplication.run(EventZenApplication.class, args);
		System.out.println("✅ Spring Boot Server is Running!");
	}
}
