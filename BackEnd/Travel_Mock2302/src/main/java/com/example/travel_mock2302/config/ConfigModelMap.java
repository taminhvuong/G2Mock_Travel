package com.example.travel_mock2302.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigModelMap {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
