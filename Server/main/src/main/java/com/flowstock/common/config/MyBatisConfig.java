package com.flowstock.common.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.flowstock.admin.mapper")
public class MyBatisConfig {
}
