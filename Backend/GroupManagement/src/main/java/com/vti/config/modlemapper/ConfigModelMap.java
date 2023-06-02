package com.vti.config.modlemapper;

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
