package com.flowstock.inbound.domain;

public enum InboundStatus {
    CREATED, // 생성
    RECEIVING, // 입고 진행
    COMPLETED, // 완료
    CANCELED // 취소
}
