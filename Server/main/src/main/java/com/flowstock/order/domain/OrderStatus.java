package com.flowstock.order.domain;

public enum OrderStatus {
    CREATED, // 생성
    ALLOCATED, // 할당
    SHIPPED, // 출고
    CANCELED // 취소
}
